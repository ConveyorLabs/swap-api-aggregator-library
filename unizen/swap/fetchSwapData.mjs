import { buildQueryParams } from "./buildQueryParams.mjs";
import { fetchQuoteData } from "../quote/fetchQuoteData.mjs";

export async function fetchSwapData(swapData) {
  const quoteData = await fetchQuoteData(swapData);
  const body = await buildQueryParams({
    ...swapData,
    quotes: quoteData,
  });

  const baseUrl = `https://api.zcx.com/trade/v1/${swapData.chainId}/swap/single`;
  console.log('body', body);
  const response = await fetch(`${baseUrl}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${swapData.unizenApiKey}`
    },
  });
  if (!response.ok) {
    const errorText = await response.text(); // Read the response body
    console.error(
      `Failed to fetch swap data from unizen: ${response.statusText}`
    );
    console.error(`Error response: ${errorText}`);
    throw new Error(`unizen API error: ${errorText}`);
  }

  const data = await response.json();
  console.dir(data, { depth: null });
  data.fromAmount = swapData.amountIn;

  return data;
}
