// https://docs.openocean.finance/dev/aggregator-api-and-sdk/aggregator-api-v3#quote-the-price-of-a-specific-trading-pair
import { openOceanApiKey } from "../../../constants/apiKeys.mjs";
import { chainIdToName } from "../constants.mjs";
import { buildQueryParams } from "./buildQueryParams.mjs";

export async function fetchQuoteData(swapData) {
  const chainName = chainIdToName[swapData.chainId];
  const baseUrl = `https://open-api-pro.openocean.finance/v3/${chainName}/quote`;
  const params = await buildQueryParams(swapData);

  const url = `${baseUrl}?${params}`;

  const response = await fetch(url, {
    headers: {
      apikey: openOceanApiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `Failed to fetch data from OpenOcean: ${response.statusText}`
    );
    console.error(`Error response: ${errorText}`);
    throw new Error(
      `Failed to fetch data from OpenOcean: ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data || !data.data) {
    throw new Error("Invalid response format from OpenOcean API");
  }
  
  return data;
}