/**
 * GENERATED FILE - do not edit by hand.
 *
 * Produced by scripts/generate-operations.mjs from vendor/gumroad-operations.json,
 * which is itself read off Gumroad's own config/routes.rb - Gumroad publishes no
 * OpenAPI document, so there is nothing else authoritative to generate from.
 *
 * 105 operations: 46 read, 43 write, 16 destructive.
 * This is the complete seller surface, not the slice somebody happened to wrap.
 * A handful of the common ones also have a dedicated tool; those tools name the
 * operation id they correspond to, so there is still one place to look.
 *
 * Not catalogued: the /v2/walks/* namespace, which belongs to Gumroad's own iOS
 * app rather than to sellers.
 */
import type { Operation } from "@nasdigital/mcp-server-core";

export interface CataloguedOperation extends Operation {
  tags: string[];
  summary: string;
  pathParams: string[];
  queryParams: string[];
  hasBody: boolean;
  /** Consequence, not HTTP verb: destructive means irreversible OR chargeable. */
  action: "read" | "write" | "destructive";
  /** Gumroad's own grouping. `financial` reads money without moving it. */
  tier: "read" | "financial" | "write" | "destructive";
}

export const OPERATIONS: CataloguedOperation[] = [
  {
    "id": "listCategories",
    "method": "GET",
    "path": "/v2/categories",
    "tags": [
      "categories"
    ],
    "summary": "Taxonomy categories and their ids",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getEarnings",
    "method": "GET",
    "path": "/v2/earnings",
    "tags": [
      "earnings"
    ],
    "summary": "Earnings overview. NEEDS 'Tax center' enabled on the Gumroad account - it is not on this one, and returns 'Tax center is not enabled for this account.' That is an account setting, not a fault: do not retry it, use getSalesSummary instead.",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "financial",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listEmails",
    "method": "GET",
    "path": "/v2/emails",
    "tags": [
      "emails"
    ],
    "summary": "Email broadcasts",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "createEmail",
    "method": "POST",
    "path": "/v2/emails",
    "tags": [
      "emails"
    ],
    "summary": "Draft an email broadcast (drafting is not sending)",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "deleteEmail",
    "method": "DELETE",
    "path": "/v2/emails/{id}",
    "tags": [
      "emails"
    ],
    "summary": "Delete an email",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getEmail",
    "method": "GET",
    "path": "/v2/emails/{id}",
    "tags": [
      "emails"
    ],
    "summary": "One email",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "previewEmail",
    "method": "POST",
    "path": "/v2/emails/{id}/preview",
    "tags": [
      "emails"
    ],
    "summary": "Send a preview to yourself",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "scheduleEmail",
    "method": "POST",
    "path": "/v2/emails/{id}/schedule",
    "tags": [
      "emails"
    ],
    "summary": "Schedule a broadcast to real customers",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "sendEmail",
    "method": "POST",
    "path": "/v2/emails/{id}/send",
    "tags": [
      "emails"
    ],
    "summary": "SEND an email broadcast to real customers - cannot be recalled",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "unscheduleEmail",
    "method": "POST",
    "path": "/v2/emails/{id}/unschedule",
    "tags": [
      "emails"
    ],
    "summary": "Cancel a scheduled broadcast",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listHelpArticles",
    "method": "GET",
    "path": "/v2/help/articles",
    "tags": [
      "help"
    ],
    "summary": "Gumroad's own help centre, as plain text - check how a feature really works",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getHelpArticle",
    "method": "GET",
    "path": "/v2/help/articles/{slug}",
    "tags": [
      "help"
    ],
    "summary": "One help article",
    "pathParams": [
      "slug"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "decrementLicenseUses",
    "method": "PUT",
    "path": "/v2/licenses/decrement_uses_count",
    "tags": [
      "licenses"
    ],
    "summary": "Give a seat back",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "disableLicense",
    "method": "PUT",
    "path": "/v2/licenses/disable",
    "tags": [
      "licenses"
    ],
    "summary": "Disable a licence key",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "enableLicense",
    "method": "PUT",
    "path": "/v2/licenses/enable",
    "tags": [
      "licenses"
    ],
    "summary": "Enable a licence key",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "rotateLicense",
    "method": "PUT",
    "path": "/v2/licenses/rotate",
    "tags": [
      "licenses"
    ],
    "summary": "Issue a new key in place of one",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "verifyLicense",
    "method": "POST",
    "path": "/v2/licenses/verify",
    "tags": [
      "licenses"
    ],
    "summary": "Verify a licence key",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listMedia",
    "method": "GET",
    "path": "/v2/media",
    "tags": [
      "media"
    ],
    "summary": "Public media library (images usable on custom pages)",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "createMedia",
    "method": "POST",
    "path": "/v2/media",
    "tags": [
      "media"
    ],
    "summary": "Add an image to the media library",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "deleteMedia",
    "method": "DELETE",
    "path": "/v2/media/{id}",
    "tags": [
      "media"
    ],
    "summary": "Remove an image from the media library",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listPages",
    "method": "GET",
    "path": "/v2/pages",
    "tags": [
      "pages"
    ],
    "summary": "Storefront pages",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "createPage",
    "method": "POST",
    "path": "/v2/pages",
    "tags": [
      "pages"
    ],
    "summary": "Create a storefront page",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "deletePage",
    "method": "DELETE",
    "path": "/v2/pages/{id}",
    "tags": [
      "pages"
    ],
    "summary": "Delete a storefront page",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getPage",
    "method": "GET",
    "path": "/v2/pages/{id}",
    "tags": [
      "pages"
    ],
    "summary": "One storefront page",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "updatePage",
    "method": "PUT",
    "path": "/v2/pages/{id}",
    "tags": [
      "pages"
    ],
    "summary": "Update a storefront page",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listPayouts",
    "method": "GET",
    "path": "/v2/payouts",
    "tags": [
      "payouts"
    ],
    "summary": "Past payouts",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "financial",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getPayout",
    "method": "GET",
    "path": "/v2/payouts/{id}",
    "tags": [
      "payouts"
    ],
    "summary": "One payout in full",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "financial",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getUpcomingPayout",
    "method": "GET",
    "path": "/v2/payouts/upcoming",
    "tags": [
      "payouts"
    ],
    "summary": "The next scheduled payout",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "financial",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listProducts",
    "method": "GET",
    "path": "/v2/products",
    "tags": [
      "products"
    ],
    "summary": "All products",
    "pathParams": [],
    "queryParams": [
      "page_key"
    ],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "createProduct",
    "method": "POST",
    "path": "/v2/products",
    "tags": [
      "products"
    ],
    "summary": "Create a product (as a DRAFT with purchases disabled)",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "deleteProduct",
    "method": "DELETE",
    "path": "/v2/products/{id}",
    "tags": [
      "products"
    ],
    "summary": "Permanently delete a product",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getProduct",
    "method": "GET",
    "path": "/v2/products/{id}",
    "tags": [
      "products"
    ],
    "summary": "One product",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "updateProduct",
    "method": "PUT",
    "path": "/v2/products/{id}",
    "tags": [
      "products"
    ],
    "summary": "Update product metadata",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "updateBundleContents",
    "method": "PUT",
    "path": "/v2/products/{id}/bundle_contents",
    "tags": [
      "products"
    ],
    "summary": "Set what a bundle product contains",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "addProductCover",
    "method": "POST",
    "path": "/v2/products/{id}/covers",
    "tags": [
      "products"
    ],
    "summary": "Add a cover image",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "deleteProductCover",
    "method": "DELETE",
    "path": "/v2/products/{id}/covers/{cover_id}",
    "tags": [
      "products"
    ],
    "summary": "Remove one cover image",
    "pathParams": [
      "id",
      "cover_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listCustomFields",
    "method": "GET",
    "path": "/v2/products/{id}/custom_fields",
    "tags": [
      "products"
    ],
    "summary": "Checkout custom fields",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "createCustomField",
    "method": "POST",
    "path": "/v2/products/{id}/custom_fields",
    "tags": [
      "products"
    ],
    "summary": "Add a checkout field (e.g. 'Pet name')",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "deleteCustomField",
    "method": "DELETE",
    "path": "/v2/products/{id}/custom_fields/{field_id}",
    "tags": [
      "products"
    ],
    "summary": "Remove a checkout field",
    "pathParams": [
      "id",
      "field_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "updateCustomField",
    "method": "PUT",
    "path": "/v2/products/{id}/custom_fields/{field_id}",
    "tags": [
      "products"
    ],
    "summary": "Update a checkout field",
    "pathParams": [
      "id",
      "field_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getProductCustomHtml",
    "method": "GET",
    "path": "/v2/products/{id}/custom_html",
    "tags": [
      "products"
    ],
    "summary": "A product page's custom HTML",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "editProductCustomHtml",
    "method": "POST",
    "path": "/v2/products/{id}/custom_html/edit",
    "tags": [
      "products"
    ],
    "summary": "Patch a product page's custom HTML",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "disableProduct",
    "method": "PUT",
    "path": "/v2/products/{id}/disable",
    "tags": [
      "products"
    ],
    "summary": "Take a product off sale (keeps the listing)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "enableProduct",
    "method": "PUT",
    "path": "/v2/products/{id}/enable",
    "tags": [
      "products"
    ],
    "summary": "Publish a product",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listOfferCodes",
    "method": "GET",
    "path": "/v2/products/{id}/offer_codes",
    "tags": [
      "products"
    ],
    "summary": "Discount codes",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "createOfferCode",
    "method": "POST",
    "path": "/v2/products/{id}/offer_codes",
    "tags": [
      "products"
    ],
    "summary": "Create a discount code",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "deleteOfferCode",
    "method": "DELETE",
    "path": "/v2/products/{id}/offer_codes/{offer_code_id}",
    "tags": [
      "products"
    ],
    "summary": "Delete a discount code",
    "pathParams": [
      "id",
      "offer_code_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getOfferCode",
    "method": "GET",
    "path": "/v2/products/{id}/offer_codes/{offer_code_id}",
    "tags": [
      "products"
    ],
    "summary": "One discount code",
    "pathParams": [
      "id",
      "offer_code_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "updateOfferCode",
    "method": "PUT",
    "path": "/v2/products/{id}/offer_codes/{offer_code_id}",
    "tags": [
      "products"
    ],
    "summary": "Update a discount code",
    "pathParams": [
      "id",
      "offer_code_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "previewProductCustomHtml",
    "method": "POST",
    "path": "/v2/products/{id}/preview_custom_html",
    "tags": [
      "products"
    ],
    "summary": "Render a product page preview without saving",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listProductReviews",
    "method": "GET",
    "path": "/v2/products/{id}/reviews",
    "tags": [
      "products"
    ],
    "summary": "Public reviews on a product page, with submission dates",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listSkus",
    "method": "GET",
    "path": "/v2/products/{id}/skus",
    "tags": [
      "products"
    ],
    "summary": "SKUs (the concrete variant combinations)",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listProductSubscribers",
    "method": "GET",
    "path": "/v2/products/{id}/subscribers",
    "tags": [
      "products"
    ],
    "summary": "Subscribers to a membership product",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "financial",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "deleteProductThumbnail",
    "method": "DELETE",
    "path": "/v2/products/{id}/thumbnail",
    "tags": [
      "products"
    ],
    "summary": "Remove the thumbnail",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "setProductThumbnail",
    "method": "POST",
    "path": "/v2/products/{id}/thumbnail",
    "tags": [
      "products"
    ],
    "summary": "Set the listing/search thumbnail",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listVariantCategories",
    "method": "GET",
    "path": "/v2/products/{id}/variant_categories",
    "tags": [
      "products"
    ],
    "summary": "Variant categories (e.g. 'Format', 'Tier')",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "createVariantCategory",
    "method": "POST",
    "path": "/v2/products/{id}/variant_categories",
    "tags": [
      "products"
    ],
    "summary": "Create a variant category",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "deleteVariantCategory",
    "method": "DELETE",
    "path": "/v2/products/{id}/variant_categories/{category_id}",
    "tags": [
      "products"
    ],
    "summary": "Delete a variant category",
    "pathParams": [
      "id",
      "category_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getVariantCategory",
    "method": "GET",
    "path": "/v2/products/{id}/variant_categories/{category_id}",
    "tags": [
      "products"
    ],
    "summary": "One variant category",
    "pathParams": [
      "id",
      "category_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "updateVariantCategory",
    "method": "PUT",
    "path": "/v2/products/{id}/variant_categories/{category_id}",
    "tags": [
      "products"
    ],
    "summary": "Rename a variant category",
    "pathParams": [
      "id",
      "category_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listVariants",
    "method": "GET",
    "path": "/v2/products/{id}/variant_categories/{category_id}/variants",
    "tags": [
      "products"
    ],
    "summary": "Variants in a category",
    "pathParams": [
      "id",
      "category_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "createVariant",
    "method": "POST",
    "path": "/v2/products/{id}/variant_categories/{category_id}/variants",
    "tags": [
      "products"
    ],
    "summary": "Create a variant - this is how a product gets pricing tiers",
    "pathParams": [
      "id",
      "category_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "deleteVariant",
    "method": "DELETE",
    "path": "/v2/products/{id}/variant_categories/{category_id}/variants/{variant_id}",
    "tags": [
      "products"
    ],
    "summary": "Delete a variant",
    "pathParams": [
      "id",
      "category_id",
      "variant_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getVariant",
    "method": "GET",
    "path": "/v2/products/{id}/variant_categories/{category_id}/variants/{variant_id}",
    "tags": [
      "products"
    ],
    "summary": "One variant",
    "pathParams": [
      "id",
      "category_id",
      "variant_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "updateVariant",
    "method": "PUT",
    "path": "/v2/products/{id}/variant_categories/{category_id}/variants/{variant_id}",
    "tags": [
      "products"
    ],
    "summary": "Update a variant",
    "pathParams": [
      "id",
      "category_id",
      "variant_id"
    ],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getProductComps",
    "method": "GET",
    "path": "/v2/products/comps",
    "tags": [
      "products"
    ],
    "summary": "Comparable products and price points, for pricing a new one",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getRefundPolicy",
    "method": "GET",
    "path": "/v2/refund_policy",
    "tags": [
      "refund_policy"
    ],
    "summary": "Account-level refund policy",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "updateRefundPolicy",
    "method": "PUT",
    "path": "/v2/refund_policy",
    "tags": [
      "refund_policy"
    ],
    "summary": "Set the account-level refund policy",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listWebhooks",
    "method": "GET",
    "path": "/v2/resource_subscriptions",
    "tags": [
      "resource_subscriptions"
    ],
    "summary": "Webhook subscriptions for ONE event - resource_name is REQUIRED, not optional (sale, refund, cancellation, dispute, dispute_won, subscription_ended, subscription_restarted, subscription_updated). Without it Gumroad answers 'Valid resource_name parameter required', which reads like a broken tool.",
    "pathParams": [],
    "queryParams": [
      "resource_name"
    ],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "createWebhook",
    "method": "PUT",
    "path": "/v2/resource_subscriptions",
    "tags": [
      "resource_subscriptions"
    ],
    "summary": "Subscribe to an event - push instead of polling /sales. resource_name is one of: sale, refund, cancellation, dispute, dispute_won, subscription_ended, subscription_restarted, subscription_updated. post_url is where Gumroad POSTs.",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "deleteWebhook",
    "method": "DELETE",
    "path": "/v2/resource_subscriptions/{id}",
    "tags": [
      "resource_subscriptions"
    ],
    "summary": "Remove a webhook subscription",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listSales",
    "method": "GET",
    "path": "/v2/sales",
    "tags": [
      "sales"
    ],
    "summary": "Sales, one row each",
    "pathParams": [],
    "queryParams": [
      "after",
      "before",
      "product_id",
      "email",
      "page_key"
    ],
    "hasBody": false,
    "action": "read",
    "tier": "financial",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getSale",
    "method": "GET",
    "path": "/v2/sales/{id}",
    "tags": [
      "sales"
    ],
    "summary": "One sale in full",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "financial",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "markSaleShipped",
    "method": "PUT",
    "path": "/v2/sales/{id}/mark_as_shipped",
    "tags": [
      "sales"
    ],
    "summary": "Mark a physical order shipped",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "refundSale",
    "method": "PUT",
    "path": "/v2/sales/{id}/refund",
    "tags": [
      "sales"
    ],
    "summary": "REFUND a sale - this moves real money back to the buyer and cannot be undone",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": true,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "resendReceipt",
    "method": "POST",
    "path": "/v2/sales/{id}/resend_receipt",
    "tags": [
      "sales"
    ],
    "summary": "Resend a buyer's receipt email",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "exportSales",
    "method": "POST",
    "path": "/v2/sales/exports",
    "tags": [
      "sales"
    ],
    "summary": "Request a sales export",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "read",
    "tier": "financial",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getSalesSummary",
    "method": "GET",
    "path": "/v2/sales/summary",
    "tags": [
      "sales"
    ],
    "summary": "Gross/net/units totals",
    "pathParams": [],
    "queryParams": [
      "after",
      "before"
    ],
    "hasBody": false,
    "action": "read",
    "tier": "financial",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getSubscriber",
    "method": "GET",
    "path": "/v2/subscribers/{id}",
    "tags": [
      "subscribers"
    ],
    "summary": "One subscriber",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "financial",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listTaxForms",
    "method": "GET",
    "path": "/v2/tax_forms",
    "tags": [
      "tax_forms"
    ],
    "summary": "Available tax forms by year. NEEDS 'Tax center' enabled on the account - not on at present, returns 'Tax center is not enabled for this account.' Not a fault.",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "financial",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "downloadTaxForm",
    "method": "GET",
    "path": "/v2/tax_forms/{year}/{tax_form_type}/download",
    "tags": [
      "tax_forms"
    ],
    "summary": "Download a tax form. Same 'Tax center' account requirement as listTaxForms.",
    "pathParams": [
      "year",
      "tax_form_type"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "financial",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listUpsells",
    "method": "GET",
    "path": "/v2/upsells",
    "tags": [
      "upsells"
    ],
    "summary": "Upsells",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "createUpsell",
    "method": "POST",
    "path": "/v2/upsells",
    "tags": [
      "upsells"
    ],
    "summary": "Create an upsell / cross-sell",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "deleteUpsell",
    "method": "DELETE",
    "path": "/v2/upsells/{id}",
    "tags": [
      "upsells"
    ],
    "summary": "Delete an upsell",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getUpsell",
    "method": "GET",
    "path": "/v2/upsells/{id}",
    "tags": [
      "upsells"
    ],
    "summary": "One upsell",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "updateUpsell",
    "method": "PUT",
    "path": "/v2/upsells/{id}",
    "tags": [
      "upsells"
    ],
    "summary": "Update an upsell",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getUser",
    "method": "GET",
    "path": "/v2/user",
    "tags": [
      "user"
    ],
    "summary": "The seller account",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "updateUser",
    "method": "PUT",
    "path": "/v2/user",
    "tags": [
      "user"
    ],
    "summary": "Update seller profile",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getUserCustomHtml",
    "method": "GET",
    "path": "/v2/user/custom_html",
    "tags": [
      "user"
    ],
    "summary": "The profile page's custom HTML",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "updateUserCustomHtml",
    "method": "PUT",
    "path": "/v2/user/custom_html",
    "tags": [
      "user"
    ],
    "summary": "Replace the profile page's custom HTML",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "editUserCustomHtml",
    "method": "POST",
    "path": "/v2/user/custom_html/edit",
    "tags": [
      "user"
    ],
    "summary": "Patch the profile page's custom HTML",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "previewUserCustomHtml",
    "method": "POST",
    "path": "/v2/user/preview_custom_html",
    "tags": [
      "user"
    ],
    "summary": "Render a preview without saving",
    "pathParams": [],
    "queryParams": [],
    "hasBody": true,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getProfileLayout",
    "method": "GET",
    "path": "/v2/user/profile_layout",
    "tags": [
      "user"
    ],
    "summary": "Storefront tabs and sections",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getTheme",
    "method": "GET",
    "path": "/v2/user/theme",
    "tags": [
      "user"
    ],
    "summary": "Storefront colours and font (read-only - no self-serve editor)",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listUtmLinks",
    "method": "GET",
    "path": "/v2/utm_links",
    "tags": [
      "utm_links"
    ],
    "summary": "UTM tracking links",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "createUtmLink",
    "method": "POST",
    "path": "/v2/utm_links",
    "tags": [
      "utm_links"
    ],
    "summary": "Create a UTM tracking link - how you attribute a sale to a campaign",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "deleteUtmLink",
    "method": "DELETE",
    "path": "/v2/utm_links/{id}",
    "tags": [
      "utm_links"
    ],
    "summary": "Delete a UTM link",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "destructive",
    "tier": "destructive",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getUtmLink",
    "method": "GET",
    "path": "/v2/utm_links/{id}",
    "tags": [
      "utm_links"
    ],
    "summary": "One UTM link",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "updateUtmLink",
    "method": "PUT",
    "path": "/v2/utm_links/{id}",
    "tags": [
      "utm_links"
    ],
    "summary": "Update a UTM link",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "disableUtmLink",
    "method": "PUT",
    "path": "/v2/utm_links/{id}/disable",
    "tags": [
      "utm_links"
    ],
    "summary": "Disable a UTM link",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "enableUtmLink",
    "method": "PUT",
    "path": "/v2/utm_links/{id}/enable",
    "tags": [
      "utm_links"
    ],
    "summary": "Enable a UTM link",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "listWorkflows",
    "method": "GET",
    "path": "/v2/workflows",
    "tags": [
      "workflows"
    ],
    "summary": "Automated email workflows",
    "pathParams": [],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "getWorkflow",
    "method": "GET",
    "path": "/v2/workflows/{id}",
    "tags": [
      "workflows"
    ],
    "summary": "One workflow",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "read",
    "tier": "read",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "createWorkflowEmail",
    "method": "POST",
    "path": "/v2/workflows/{id}/emails",
    "tags": [
      "workflows"
    ],
    "summary": "Add an email to a workflow",
    "pathParams": [
      "id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  },
  {
    "id": "updateWorkflowEmail",
    "method": "PUT",
    "path": "/v2/workflows/{id}/emails/{email_id}",
    "tags": [
      "workflows"
    ],
    "summary": "Update a workflow email",
    "pathParams": [
      "id",
      "email_id"
    ],
    "queryParams": [],
    "hasBody": false,
    "action": "write",
    "tier": "write",
    "status": "covered",
    "tool": "gumroad_call"
  }
];

export const OPERATIONS_BY_ID = new Map(OPERATIONS.map((o) => [o.id, o]));
