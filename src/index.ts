#!/usr/bin/env node
/**
 * gumroad-mcp-server — a Model Context Protocol server for the Gumroad v2 API.
 *
 * All 105 seller operations, catalogued from Gumroad's own routing table.
 * Gumroad publishes no OpenAPI document, so vendor/gumroad-operations.json is
 * the spec; see scripts/generate-operations.mjs.
 *
 * Configuration:
 *   GUMROAD_ACCESS_TOKEN   required.
 *   GUMROAD_BASE_URL       optional. Defaults to https://api.gumroad.com
 *   MCP_READ_ONLY=1        refuse anything that changes state.
 *   MCP_NO_DESTRUCTIVE=1   allow writes, refuse refunds, deletes and sends.
 *
 * ⚠️  Note what is deliberately absent. The server this replaces set
 *     NODE_TLS_REJECT_UNAUTHORIZED = "0" — disabling certificate verification
 *     for the WHOLE PROCESS, not just its own requests — whenever
 *     GUMROAD_BASE_URL differed from the exact production string, including by
 *     a trailing slash. A typo in a base URL silently turned off TLS
 *     verification for every request anything in that process made. There is
 *     no such escape hatch here: a non-production base URL is just a base URL.
 */

import { authorizerFromEnv, requireEnv, runServer, HttpClient } from "@nasdigital/mcp-server-core";
import { buildTools, COVERED, FINANCIAL } from "./tools.js";

const VERSION = "1.0.0";

async function main() {
  const token = requireEnv("GUMROAD_ACCESS_TOKEN");

  const http = new HttpClient({
    baseUrl: process.env.GUMROAD_BASE_URL || "https://api.gumroad.com",
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": `gumroad-mcp-server/${VERSION}`,
    },
    timeoutMs: 30_000,
  });

  await runServer({
    name: "gumroad-mcp-server",
    version: VERSION,
    authorizer: authorizerFromEnv(),
    tools: buildTools(http),
  });

  console.error(
    `Gumroad v2: ${COVERED.length} operations reachable, ${FINANCIAL.length} of them financial.`,
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
