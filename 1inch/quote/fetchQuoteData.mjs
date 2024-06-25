import { buildQueryParams } from "./buildQueryParams.mjs";

export async function fetchQuoteData(swapData) {
  const baseUrl = `https://api.1inch.dev/swap/v6.0/${swapData.chainId}/quote`;
  const params = await buildQueryParams(swapData);
  const response = await fetch(`${baseUrl}?${params}`, {
    headers: {
      Authorization: `Bearer ${swapData.oneInchApiKey}`,
    },
  });

  console.log(`${baseUrl}?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch data from 1inch: ${response.statusText}`);
  }

  const data = await response.json();
  data.fromAmount = swapData.amountIn;

  return data;
}
