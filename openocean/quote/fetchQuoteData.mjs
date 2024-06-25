import { chainIdToName } from "../constants.mjs";
import { buildQueryParams } from "./buildQueryParams.mjs";

export async function fetchQuoteData(swapData) {
  const chainName = chainIdToName[swapData.chainId];
  const baseUrl = `https://open-api-pro.openocean.finance/v3/${chainName}/quote`;
  const params = await buildQueryParams(swapData);

  const response = await fetch(`${baseUrl}?${params}`, {
    headers: {
      apikey: "aZt04VmQhipm2TsCMNhp2xQ5aHivpMOv",
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

  if (!data || !data.data || !data.data.outAmount) {
    throw new Error("Invalid response format from OpenOcean API");
  }

  return data;
}
