import { buildQueryParams } from "./buildQueryParams.mjs";
import { BASE_DOMAIN } from "../constants.mjs";

export async function fetchQuoteData(swapData) {
  const baseUrl = `${BASE_DOMAIN}/${swapData.chainId}/quote/single`;
  const params = await buildQueryParams(swapData);
  const completeUrl = `${baseUrl}?${params}`;
  const response = await fetch(completeUrl, {
    headers: {
      Authorization: `Bearer ${swapData.unizenApiKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch data from unizen (${completeUrl}): ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}
