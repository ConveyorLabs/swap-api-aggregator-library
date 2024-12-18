import { buildQueryParams } from "./buildQueryParams.mjs";
import { unizenApiKey } from "../../../constants/apiKeys.mjs";

export async function fetchQuoteData(swapData) {
  const baseUrl = "https://api.zcx.com/trade/v1";
  const queryUrl = `${baseUrl}/${swapData.chainId}/quote/single`;

  try {
    const params = await buildQueryParams(swapData);
    const completeUrl = `${queryUrl}?${params}`;

    const response = await fetch(completeUrl, {
      headers: {
        Authorization: `Bearer ${unizenApiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data from unizen (${completeUrl}): ${response.statusText}`
      );
    }

    const allQuotes = await response.json();
    // Take only the first quote (best quote)
    const bestQuote = Array.isArray(allQuotes) ? allQuotes[0] : allQuotes;
    return bestQuote;
  } catch (error) {
    console.error(`Error fetching quote data: ${error.message}`);
    throw error;
  }
}
