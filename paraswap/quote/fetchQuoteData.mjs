import { buildQueryParams } from "./buildQueryParams.mjs";

export async function fetchQuoteData(swapData) {
  const baseUrl = "https://api.paraswap.io/prices";
  const params = await buildQueryParams(swapData);
  const url = `${baseUrl}?${params}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to fetch data from Paraswap: ${response.statusText}`
      );
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
  } catch (error) {
    console.error("Error in fetchQuoteData:", error);
    throw error;
  }
}
