import { buildQueryParams } from "./buildQueryParams.mjs";

export async function fetchQuoteData(swapData) {
  const baseUrl = `https://api.zcx.com/trade/v1/${swapData.chainId}/quote`;
  const params = await buildQueryParams(swapData);
  const response = await fetch(`${baseUrl}?${params}`, {
    headers: {
      Authorization: `Bearer ${swapData.unizenApiKey}`,
    },
  });

  console.log(`${baseUrl}?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from unizen: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}
