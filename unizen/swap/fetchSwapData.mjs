import { buildQueryParams } from "./buildQueryParams.mjs";
import { fetchQuoteData } from "../quote/fetchQuoteData.mjs";
import { unizenApiKey } from "../../../constants/apiKeys.mjs";

export async function fetchSwapData(swapData) {
  const baseUrl = "https://api.zcx.com/trade/v1";
  const quoteData = await fetchQuoteData(swapData);
  const body = await buildQueryParams({ ...swapData, quotes: quoteData });

  const queryUrl = `${baseUrl}/${swapData.chainId}/swap/single`;
  const response = await fetch(queryUrl, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${unizenApiKey}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `Failed to fetch swap data from unizen: ${response.statusText}`
    );
    console.error(`Error response: ${errorText}`);
    throw new Error(`unizen API error: ${errorText}`);
  }

  const baseUrlSpender = `${baseUrl}/${swapData.chainId}/approval/spender?contractVersion=v1`;
  const responseSpender = await fetch(baseUrlSpender, {
    headers: {
      Authorization: `Bearer ${unizenApiKey}`,
    },
  });

  const responseJson = await responseSpender.json();
  const data = await response.json();
  data.fromAmount = swapData.amountIn;
  data.spender = responseJson.address;

  return data;
}
