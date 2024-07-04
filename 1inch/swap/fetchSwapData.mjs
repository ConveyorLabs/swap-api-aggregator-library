import { buildQueryParams } from "./buildQueryParams.mjs";

export async function fetchSwapData(swapData) {
  const baseUrl = `https://api.1inch.dev/swap/v6.0/${swapData.chainId}/swap`;
  const params = await buildQueryParams(swapData);
  const response = await fetch(`${baseUrl}?${params}`, {
    headers: {
      Authorization: `Bearer ${swapData.oneInchApiKey}`,
    },
  });
  if (!response.ok) {
    const errorText = await response.text(); // Read the response body
    console.error(
      `Failed to fetch swap data from 1inch: ${response.statusText}`
    );
    console.error(`Error response: ${errorText}`);
    throw new Error(`1inch API error: ${errorText}`);
  }

  const data = await response.json();

  data.fromAmount = swapData.amountIn;

  return data;
}
