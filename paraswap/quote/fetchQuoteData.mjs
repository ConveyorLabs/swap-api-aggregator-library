//https://developers.paraswap.network/api/get-rate-for-a-token-pair

import { buildQueryParams } from "./buildQueryParams.mjs";

export async function fetchQuoteData(swapData) {
  const baseUrl = "https://api.paraswap.io/prices";
  const params = await buildQueryParams(swapData);
  const response = await fetch(`${baseUrl}?${params}&version6`);
  // console.log(`${baseUrl}?${params}`);

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to fetch data from Paraswap: ${response.statusText}`);
    console.error(`Error response: ${errorText}`);
    throw new Error(
      `Failed to fetch data from Paraswap: ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data || !data.priceRoute) {
    throw new Error("Invalid response format from Paraswap API");
  }

  return data;
}
