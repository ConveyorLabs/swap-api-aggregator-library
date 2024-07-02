import { buildQueryParams as quoteBuildQueryParams } from "../quote/buildQueryParams.mjs";

export async function buildQueryParams(swapData) {
  return quoteBuildQueryParams(swapData, false);
}
