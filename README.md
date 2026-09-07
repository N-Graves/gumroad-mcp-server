# gumroad-mcp-server

A [Model Context Protocol](https://modelcontextprotocol.io) server for the **Gumroad v2 API**.

**All 105 seller operations** — products, variants and price tiers, custom checkout fields, offer codes, sales, payouts, subscribers, storefront pages and media, upsells, UTM links, email broadcasts and workflows, licence keys, and webhooks.

MIT licensed.

## Install

```bash
npm install -g @nasdigital/gumroad-mcp
```

## Configuration

```json
{ "env": { "GUMROAD_ACCESS_TOKEN": "your-access-token" } }
```

Gumroad access tokens do not expire, so there is no refresh machinery here and no credentials file. `GUMROAD_BASE_URL` overrides the API host if you need it to.

## ⚠️ What is deliberately absent

The server this was rebuilt from did this, inherited from its upstream fork:

```js
if (url !== GumroadClient.BASE_URL) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
```

That disables TLS certificate verification **for the entire Node process** — every request anything in it makes, not just Gumroad's — and it triggers on *any* difference from the exact production string, **including a trailing slash**. A typo in a base URL silently turned off certificate checking.

There is no such escape hatch here. A non-production base URL is just a base URL, and there is a test asserting that pointing the client somewhere else leaves `NODE_TLS_REJECT_UNAUTHORIZED` untouched.

## Where the catalogue comes from

Gumroad publishes no OpenAPI document. Every other server in this family generates its catalogue from the provider's own spec; this one cannot, so `vendor/gumroad-operations.json` **is** the spec.

Each entry was read off Gumroad's own [`config/routes.rb`](https://github.com/antiwork/gumroad/blob/main/config/routes.rb) and, where the parameters mattered, the controller behind it — not from a documentation page. That is deliberate: the routing table is the thing the server actually dispatches against, and documentation that advertises endpoints which do not exist is a recurring way to waste an afternoon.

**Not catalogued:** the `/v2/walks/*` namespace, which belongs to Gumroad's own iOS app (device attestation, realtime tokens) rather than to sellers. It is named here rather than listed as an excluded operation because inventing its exact routes would be worse than saying plainly that it was left out.

To refresh, re-read the routes, update the vendored JSON, then:

```bash
npm run generate && npm test
```

The coverage test fails if the generated catalogue and the vendored table drift apart.

## Two traps worth knowing before you call anything

**Creating a product does not put it on sale.** Gumroad's controller sets `draft: true`, so a created product has purchases disabled until `enableProduct` publishes it. Useful, and not obvious.

**`createProduct` takes a price in CENTS; `updateProduct` takes dollars.** That asymmetry is Gumroad's, not this server's. It is stated in the tool description rather than silently normalised, because a hidden conversion is a worse trap than a documented one.

Two more, both encoded in the catalogue so they arrive as an explanation rather than a mystery:

- `getEarnings`, `listTaxForms` and `downloadTaxForm` need **"Tax center" enabled on the account** and otherwise return *"Tax center is not enabled for this account."* That is an account setting, not a fault — use `getSalesSummary` and do not retry.
- `listWebhooks` **requires** `resource_name`. Without it Gumroad answers *"Valid resource_name parameter required"*, which reads exactly like a broken tool.

## Tools

Eight tools for 105 operations. Every tool name and description is paid for in the model's context window on every turn, used or not.

| Tool | |
|---|---|
| `gumroad_list_operations` | Browse the catalogue. Start here. |
| `gumroad_call` | Call any operation by id. |
| `gumroad_get_user` | The seller account. |
| `gumroad_list_products` | Every product. |
| `gumroad_get_product` | One product, with variants. |
| `gumroad_create_product` | Create a draft. Price in cents. |
| `gumroad_get_sales` | Sales, one row each. |
| `gumroad_get_sales_summary` | Gross / net / unit totals. |

Each dedicated tool names the operation id it corresponds to, so there is still one place to look.

Of 105 operations: **46 read, 43 write, 16 destructive**. Gumroad's own `financial` grouping covers 12 of the reads — those read money without moving it, so they stay available in read-only mode. Moving money (`refundSale`) and reaching real customers (`sendEmail`, `scheduleEmail`) are destructive.

## Read-only and no-destructive modes

```
MCP_READ_ONLY=1       refuse anything that changes state
MCP_NO_DESTRUCTIVE=1  allow writes, refuse refunds, deletes and sends
```

⚠️ `gumroad_call` is one door onto all 105 operations, sixteen of which are destructive, so it is classified destructive and `MCP_READ_ONLY=1` refuses it outright. The dedicated read tools stay usable in that mode.

## Testing

```bash
npm test                                          # 15 tests
SMOKE_ENV='{"GUMROAD_ACCESS_TOKEN":"x"}' npm run smoke   # real MCP over stdio
```

## Built on

[`@nasdigital/mcp-server-core`](https://github.com/N-Graves/mcp-server-core).

## Licence

MIT.
