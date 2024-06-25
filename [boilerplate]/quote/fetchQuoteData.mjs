import { buildQueryParams } from "./buildQueryParams.mjs";

export async function fetchQuoteData(swapData) {
  // adjust your baseUrl, headers, and fetch call as necessary
  const baseUrl = `https://api.aggregator.com/quote`;
  const params = await buildQueryParams(swapData);
  const response = await fetch(`${baseUrl}?${params}`, {
    //add headers if necessary
    // headers: {
    //   Authorization: `Bearer ${swapData.oneInchApiKey}`,
    // },
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `Failed to fetch quote data from [aggregator]: ${response.statusText}`
    );
    console.error(`Error response: ${errorText}`);
    throw new Error(`[aggregator] API error: ${errorText}`);
  }

  const data = await response.json();
  data.fromAmount = swapData.amountIn;

  return data;
}
