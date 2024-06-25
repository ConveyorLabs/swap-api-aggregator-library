// https://0x.org/docs/0x-swap-api/api-references/get-swap-v1-price

import { chainToApi } from "../constants.mjs";
import { buildQueryParams } from "./buildQueryParams.mjs";

export async function fetchQuoteData(swapData) {
  const baseUrl = `${chainToApi[swapData.chainId]}swap/v1/price`;
  const params = await buildQueryParams(swapData);
  const response = await fetch(`${baseUrl}?${params}`, {
    headers: {
      "0x-api-key": swapData.zeroExApiKey,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to fetch quote data from 0x: ${response.statusText}`);
    console.error(`Error response: ${errorText}`);
    throw new Error(
      `Failed to fetch quote data from 0x: ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data) {
    throw new Error("Invalid response format from 0x API");
  }

  return data;
}
