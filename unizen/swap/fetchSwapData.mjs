import { buildQueryParams } from "./buildQueryParams.mjs";
import { fetchQuoteData } from "../quote/fetchQuoteData.mjs";

export async function fetchSwapData(swapData) {
  const quoteData = await fetchQuoteData(swapData);
  const body = await buildQueryParams({
    ...swapData,
    quotes: quoteData,
  });

  const baseUrl = `https://api.zcx.com/trade/v1/${swapData.chainId}/swap`;
  const response = await fetch(`${baseUrl}`, {
    body,
    headers: {
      Authorization: `Bearer ${swapData.unizenApiKey}`,
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
  console.dir(data, { depth: null });
  data.fromAmount = swapData.amountIn;

  return data;
}
