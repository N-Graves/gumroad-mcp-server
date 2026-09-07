import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { HttpClient } from "@nasdigitaluk/mcp-server-core";
import { OPERATIONS } from "../src/generated/operations.js";
import { buildTools, createDispatcher, COVERED, FINANCIAL } from "../src/tools.js";

const vendored = JSON.parse(
  readFileSync(join(import.meta.dirname, "../vendor/gumroad-operations.json"), "utf8"),
) as { basePath: string; operations: { name: string; path: string; tier: string }[] };

function client() {
  const calls: { url: string; method: string; body?: string }[] = [];
  const http = new HttpClient({
    baseUrl: "https://api.gumroad.com",
    fetchImpl: (async (url: string, opts: RequestInit = {}) => {
      calls.push({ url, method: opts.method ?? "GET", body: opts.body as string | undefined });
      return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
    }) as unknown as typeof fetch,
  });
  return { http, calls };
}

const toolNamed = (http: HttpClient, name: string) => buildTools(http).find((t) => t.name === name)!;

describe("coverage", () => {
  it("carries every operation the vendored routing table names", () => {
    // Gumroad publishes no OpenAPI document, so the vendored table is the spec.
    // This is the check that fails when the two drift.
    const generated = new Set(OPERATIONS.map((o) => o.id));
    const missing = vendored.operations.map((o) => o.name).filter((n) => !generated.has(n));
    expect(missing, `missing from the generated catalogue: ${missing.join(", ")}`).toEqual([]);
    expect(OPERATIONS).toHaveLength(vendored.operations.length);
  });

  it("prefixes every path with the API version", () => {
    // routes.rb writes them relative to /v2. Shipping them that way would send
    // every request to the wrong URL - and Gumroad's 404 would not say why.
    expect(OPERATIONS.every((o) => o.path.startsWith("/v2/"))).toBe(true);
  });

  it("excludes nothing, so the catalogue is the whole seller surface", () => {
    expect(COVERED).toHaveLength(OPERATIONS.length);
  });

  it("treats reading money as a read and moving it as destructive", () => {
    // The tier is Gumroad's own grouping; the action is the consequence. A
    // financial READ must not be refused by MCP_READ_ONLY, and a refund must.
    expect(FINANCIAL.length).toBeGreaterThan(0);
    expect(FINANCIAL.every((o) => o.action === "read")).toBe(true);

    const refund = OPERATIONS.find((o) => o.id === "refundSale")!;
    expect(refund.action).toBe("destructive");
    // Sending a broadcast cannot be recalled either, and neither can scheduling one.
    for (const id of ["sendEmail", "scheduleEmail"]) {
      expect(OPERATIONS.find((o) => o.id === id)!.action).toBe("destructive");
    }
  });

  it("does not demand a body from operations that take none", () => {
    // PUT /v2/products/{id}/enable is a real, bodyless write. Deriving hasBody
    // from the verb would make it uncallable.
    expect(OPERATIONS.find((o) => o.id === "enableProduct")!.hasBody).toBe(false);
    expect(OPERATIONS.find((o) => o.id === "createProduct")!.hasBody).toBe(true);
  });

  it("keeps write parameters out of the query string", () => {
    // On a write the named parameters are body fields. Left in queryParams the
    // dispatcher would put a product's description in the URL.
    const create = OPERATIONS.find((o) => o.id === "createProduct")!;
    expect(create.queryParams).toEqual([]);
    expect(OPERATIONS.find((o) => o.id === "listSales")!.queryParams).toContain("product_id");
  });
});

describe("tools", () => {
  it("advertises a small surface for a large API", () => {
    const names = buildTools(client().http).map((t) => t.name);
    expect(names).toHaveLength(8);
    expect(new Set(names).size).toBe(8);
  });

  it("dispatches a catalogued operation to its real route", async () => {
    const { http, calls } = client();
    await createDispatcher(http).call("getProduct", { id: "abc" });
    expect(calls[0]!.url).toContain("/v2/products/abc");
  });

  it("names a missing path parameter instead of sending a literal brace", async () => {
    const { http, calls } = client();
    await expect(createDispatcher(http).call("getProduct", {})).rejects.toThrow(/\bid\b/);
    expect(calls).toHaveLength(0);
  });

  it("sends create-product prices in cents, as Gumroad's create endpoint wants", async () => {
    // Gumroad's own asymmetry: create takes cents, update takes dollars. The
    // trap is documented rather than silently normalised, so this pins that
    // the value is passed through untouched.
    const { http, calls } = client();
    await toolNamed(http, "gumroad_create_product").handler({ name: "Print", price_cents: 999 });
    expect(JSON.parse(calls[0]!.body!)).toMatchObject({ price_cents: 999 });
  });

  it("says in the description that a new product is a draft", () => {
    // Creating cannot put anything on sale. Somebody has to be able to know
    // that without reading Gumroad's controller.
    const tool = toolNamed(client().http, "gumroad_create_product");
    expect(tool.description).toMatch(/draft/i);
    expect(tool.action).toBe("write");
  });

  it("classifies the generic caller as destructive, because it can reach a refund", () => {
    const tools = buildTools(client().http);
    expect(tools.find((t) => t.name === "gumroad_call")!.action).toBe("destructive");
    expect(tools.find((t) => t.name === "gumroad_get_sales")!.action).toBe("read");
  });

  it("points at getSalesSummary rather than the tax-gated earnings endpoint", async () => {
    // getEarnings and the tax forms need 'Tax center' enabled on the account.
    // Without that note the failure reads like a broken tool and gets retried.
    const tool = toolNamed(client().http, "gumroad_get_sales_summary");
    expect(tool.description).toMatch(/Tax center/);
    expect(OPERATIONS.find((o) => o.id === "getEarnings")!.summary).toMatch(/do not retry/i);
  });

  it("warns that listWebhooks needs resource_name, which reads like a bug otherwise", () => {
    const op = OPERATIONS.find((o) => o.id === "listWebhooks")!;
    expect(op.queryParams).toContain("resource_name");
    expect(op.summary).toMatch(/REQUIRED/);
  });
});

describe("TLS", () => {
  it("never disables certificate verification for a non-production base URL", async () => {
    // The server this replaces set NODE_TLS_REJECT_UNAUTHORIZED="0" - process
    // wide, affecting every other request the process made - whenever the base
    // URL differed from the exact production string, a trailing slash included.
    const before = process.env.NODE_TLS_REJECT_UNAUTHORIZED;
    const http = new HttpClient({
      baseUrl: "https://gumroad.dev/",
      fetchImpl: (async () =>
        new Response("{}", {
          status: 200,
          headers: { "content-type": "application/json" },
        })) as unknown as typeof fetch,
    });
    await http.get("/v2/user");
    expect(process.env.NODE_TLS_REJECT_UNAUTHORIZED).toBe(before);
  });
});
