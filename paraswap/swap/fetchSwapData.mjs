//https://developers.paraswap.network/api/build-parameters-for-transaction

import { fetchQuoteData } from "../quote/fetchQuoteData.mjs";
import { buildQueryParams } from "./buildQueryParams.mjs";

export async function fetchSwapData(swapData) {
  const quoteData = await fetchQuoteData(swapData);
  const params = await buildQueryParams({
    ...swapData,
    priceRoute: quoteData.priceRoute,
  });

  const baseUrl = `https://api.paraswap.io/transactions/${swapData.chainId}`;
  const url = `${baseUrl}?ignoreChecks=true&version6`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `Failed to fetch swap data from Paraswap: ${response.statusText}`
    );
    console.error(`Error response: ${errorText}`);
    throw new Error(
      `Failed to fetch swap data from Paraswap: ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data) {
    throw new Error("Invalid response format from Paraswap API");
  }

  return data;
}
