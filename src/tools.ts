import { z } from "zod";
import {
  Dispatcher,
  HttpClient,
  boundedText,
  type ToolDefinition,
} from "@nasdigitaluk/mcp-server-core";
import { OPERATIONS, type CataloguedOperation } from "./generated/operations.js";

export const COVERED = OPERATIONS.filter((o) => o.status === "covered");

/** Operations that read money without moving it. Worth being able to name. */
export const FINANCIAL = OPERATIONS.filter((o) => o.tier === "financial");

export function createDispatcher(http: HttpClient) {
  return new Dispatcher<CataloguedOperation>(http, OPERATIONS, "gumroad_list_operations");
}

export function buildTools(http: HttpClient): ToolDefinition<any>[] {
  const d = createDispatcher(http);

  return [
    {
      name: "gumroad_list_operations",
      description:
        `Browse all ${OPERATIONS.length} operations in the Gumroad v2 API — products, variants, ` +
        `sales, payouts, storefront pages, email broadcasts, licences and webhooks. ` +
        `Use this to find an operation id for gumroad_call. The few most common ones ` +
        `also have a dedicated tool below.`,
      action: "read",
      input: z.object({
        search: z
          .string()
          .optional()
          .describe("Filter by id, path, tag or summary — try 'sales', 'variant', 'license'."),
      }),
      handler: async ({ search }) => d.browse(search),
    },

    {
      name: "gumroad_call",
      description:
        "Call any Gumroad operation by id. Some of these move real money or reach real " +
        "customers — refundSale, sendEmail, scheduleEmail — so this is classified " +
        "destructive as a whole. Check the operation's summary before calling it.",
      action: "destructive",
      input: z.object({
        operation_id: z.string().min(1),
        params: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
        body: z.unknown().optional(),
      }),
      handler: ({ operation_id, params, body }) => d.call(operation_id, params ?? {}, body),
    },

    {
      name: "gumroad_get_user",
      description: "The authenticated seller account. Operation id: getUser.",
      action: "read",
      input: z.object({}),
      handler: () => http.get("/v2/user"),
    },

    {
      name: "gumroad_list_products",
      description: "Every product on the account. Operation id: listProducts.",
      action: "read",
      input: z.object({
        page_key: z.string().optional().describe("From a previous response, to page on."),
      }),
      handler: ({ page_key }) => http.get("/v2/products", { page_key }),
    },

    {
      name: "gumroad_get_product",
      description: "One product in full, including its variants. Operation id: getProduct.",
      action: "read",
      input: z.object({ product_id: z.string().min(1) }),
      handler: ({ product_id }) => http.get(`/v2/products/${encodeURIComponent(product_id)}`),
    },

    {
      name: "gumroad_create_product",
      description:
        "Create a product. It is created as a DRAFT with purchases disabled — Gumroad's own " +
        "controller sets draft=true — so this cannot put anything on sale. Publishing is a " +
        "separate call (enableProduct). Operation id: createProduct.\n\n" +
        "⚠️ price_cents is in CENTS here, while Gumroad's UPDATE endpoint takes dollars. " +
        "That asymmetry is upstream's, not this server's, and it is stated rather than " +
        "silently normalised because a silent conversion is worse than a documented trap.",
      action: "write",
      input: z.object({
        name: boundedText(200).describe("Product name."),
        price_cents: z
          .number()
          .int()
          .min(0)
          .describe("Price in CENTS. 999 is $9.99. Zero means pay-what-you-want."),
        description: boundedText(20_000).optional(),
        native_type: z
          .string()
          .optional()
          .describe("e.g. digital, course, ebook, membership, physical."),
        tags: z.array(z.string()).max(20).optional(),
        taxonomy_id: z.string().optional().describe("From listCategories."),
      }),
      handler: (body) => http.post("/v2/products", body),
    },

    {
      name: "gumroad_get_sales",
      description:
        "Sales, one row each. Reads money without moving it. Operation id: listSales.",
      action: "read",
      input: z.object({
        after: z.string().optional().describe("YYYY-MM-DD, inclusive."),
        before: z.string().optional().describe("YYYY-MM-DD, inclusive."),
        product_id: z.string().optional(),
        email: z.string().optional().describe("Filter to one buyer."),
        page_key: z.string().optional(),
      }),
      handler: (q) => http.get("/v2/sales", q as Record<string, string>),
    },

    {
      name: "gumroad_get_sales_summary",
      description:
        "Gross, net and unit totals over a date range. Operation id: getSalesSummary.\n\n" +
        "Use this rather than getEarnings: earnings and the tax-form endpoints need " +
        "'Tax center' enabled on the account and otherwise return 'Tax center is not " +
        "enabled for this account.' That is an account setting, not a fault — do not retry it.",
      action: "read",
      input: z.object({
        after: z.string().optional().describe("YYYY-MM-DD, inclusive."),
        before: z.string().optional().describe("YYYY-MM-DD, inclusive."),
      }),
      handler: (q) => http.get("/v2/sales/summary", q as Record<string, string>),
    },
  ];
}
