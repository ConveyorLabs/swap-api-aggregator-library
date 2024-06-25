import { openOceanApiKey } from "../../../constants/apiKeys.mjs";
import { chainIdToName } from "../constants.mjs";
import { buildQueryParams } from "./buildQueryParams.mjs";

export async function fetchSwapData(swapData) {
  const chainName = chainIdToName[swapData.chainId];
  if (!chainName) {
    throw new Error(`Unsupported chain ID: ${swapData.chainId}`);
  }

  const baseUrl = `https://open-api.openocean.finance/v3/${chainName}/swap_quote`;
  const params = await buildQueryParams(swapData);
  const url = `${baseUrl}?${params}`;
  console.log("Request URL:", url);

  const response = await fetch(url, {
    headers: {
      apikey: openOceanApiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `Failed to fetch swap data from OpenOcean: ${response.statusText}`
    );
    console.error(`Error response: ${errorText}`);
    throw new Error(
      `Failed to fetch swap data from OpenOcean: ${response.statusText}`
    );
  }

  const data = await response.json();
  if (!data || !data.data || !data.data.outAmount) {
    throw new Error("Invalid response format from OpenOcean API");
  }

  return data;
}
