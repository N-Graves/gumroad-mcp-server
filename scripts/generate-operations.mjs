/**
 * Generate src/generated/operations.ts from vendor/gumroad-operations.json.
 *
 *   npm run generate
 *
 * ── Why this one is different ──────────────────────────────────────────────
 * Every other server in this family generates its catalogue from the
 * provider's own OpenAPI document. Gumroad publishes none, so the vendored
 * JSON IS the spec: each entry was read off Gumroad's `config/routes.rb` and,
 * where the parameters mattered, the controller behind it.
 *
 * That is a deliberate choice rather than laziness. This project has been
 * burned repeatedly by documentation advertising endpoints that do not exist,
 * so the routing table - the thing the server actually dispatches on - is the
 * only source treated as authoritative.
 *
 * Deliberately NOT catalogued: the `/v2/walks/*` namespace. Those endpoints
 * belong to Gumroad's own iOS app (device attestation, realtime tokens) and
 * are not a seller API at all. They are named here rather than listed as
 * excluded operations because inventing their exact routes would be worse
 * than saying plainly that they were left out.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { renderCatalogue, reportBuild } from "@nasdigital/mcp-server-core/generate";

const ROOT = new URL("..", import.meta.url).pathname;
const spec = JSON.parse(readFileSync(join(ROOT, "vendor/gumroad-operations.json"), "utf8"));

/** Consequence, not HTTP verb. `financial` reads money; it does not move it. */
const ACTION = { read: "read", financial: "read", write: "write", destructive: "destructive" };

const operations = spec.operations
  .map((op) => ({
    id: op.name,
    method: op.method,
    // The vendored paths are relative to /v2, the way routes.rb writes them.
    path: `${spec.basePath}${op.path}`,
    tags: [op.path.split("/").filter(Boolean)[0] ?? "root"],
    summary: op.summary,
    pathParams: op.pathParams ?? [],
    // On a GET the named parameters are query string. On a write they are body
    // fields, and the dispatcher would otherwise put them in the URL.
    queryParams: op.method === "GET" ? (op.params ?? []) : [],
    /**
     * Only claim a body is required where the parameters were actually
     * enumerated. The vendored table says outright that `params` is not
     * exhaustive, so deriving this from the verb alone would refuse calls that
     * genuinely take no body - PUT /products/{id}/enable among them - while
     * still missing bodies nobody wrote down. A missing body we do not catch
     * reaches Gumroad and comes back with Gumroad's own clear message; a body
     * we wrongly demand is a tool that cannot be called at all.
     */
    hasBody: (op.method === "POST" || op.method === "PUT") && (op.params?.length ?? 0) > 0,
    action: ACTION[op.tier],
    tier: op.tier,
    status: "covered",
    tool: "gumroad_call",
  }))
  .sort((a, b) => (a.path === b.path ? a.method.localeCompare(b.method) : a.path.localeCompare(b.path)));

const counts = operations.reduce((a, o) => ({ ...a, [o.action]: (a[o.action] ?? 0) + 1 }), {});
const tiers = operations.reduce((a, o) => ({ ...a, [o.tier]: (a[o.tier] ?? 0) + 1 }), {});

const header = `/**
 * GENERATED FILE - do not edit by hand.
 *
 * Produced by scripts/generate-operations.mjs from vendor/gumroad-operations.json,
 * which is itself read off Gumroad's own config/routes.rb - Gumroad publishes no
 * OpenAPI document, so there is nothing else authoritative to generate from.
 *
 * ${operations.length} operations: ${counts.read ?? 0} read, ${counts.write ?? 0} write, ${counts.destructive ?? 0} destructive.
 * This is the complete seller surface, not the slice somebody happened to wrap.
 * A handful of the common ones also have a dedicated tool; those tools name the
 * operation id they correspond to, so there is still one place to look.
 *
 * Not catalogued: the /v2/walks/* namespace, which belongs to Gumroad's own iOS
 * app rather than to sellers.
 */`;

const extraFields = `  /** Gumroad's own grouping. \`financial\` reads money without moving it. */
  tier: "read" | "financial" | "write" | "destructive";
`;

mkdirSync(join(ROOT, "src/generated"), { recursive: true });
const rendered = renderCatalogue(
  { operations, covered: operations.length, excluded: 0, ruleHits: [], undeclaredPathParams: [] },
  header,
)
  // The shared renderer emits the common shape; tier is Gumroad specific.
  .replace(/  \/\*\* OAuth scopes required[\s\S]*?scopes: string\[\];\n/, extraFields);

writeFileSync(join(ROOT, "src/generated/operations.ts"), rendered, "utf8");
reportBuild({ operations, covered: operations.length, excluded: 0, ruleHits: [], undeclaredPathParams: [] });
console.log(`  by consequence: ${JSON.stringify(counts)}`);
console.log(`  by tier:        ${JSON.stringify(tiers)}`);
