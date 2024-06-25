import { chainToId } from "../constants.mjs";
import { buildQueryParams } from "./buildQueryParams.mjs";

export async function fetchQuoteData(swapData) {
  const baseUrl = `https://aggregator-api.kyberswap.com/${
    chainToId[swapData.chainId]
  }/api/v1/routes`;
  const params = await buildQueryParams(swapData);
  const response = await fetch(`${baseUrl}?${params}`, {
    headers: { "Accept-Version": "Latest" },
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      "Failed to fetch quote data from Kyber:",
      response.statusText,
      errorText
    );
    throw new Error(
      `Failed to fetch quote data from Kyber: ${response.statusText}`
    );
  }

  const data = await response.json();

  return data;
}
