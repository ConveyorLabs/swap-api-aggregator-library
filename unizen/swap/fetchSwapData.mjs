import { buildQueryParams } from "./buildQueryParams.mjs";
import { fetchQuoteData } from "../quote/fetchQuoteData.mjs";
import { unizenApiKey } from "../../../constants/apiKeys.mjs";
import { UNIZEN_ROUTER_ADDRESSES } from "../constants.mjs";

export async function fetchSwapData(swapData) {
  const baseUrl = "https://api.zcx.com/trade/v1";

  // Get quote data
  const quoteData = await fetchQuoteData(swapData);
  console.log("[Unizen] Swap - Quote data received:", quoteData?.tradeType);

  const body = await buildQueryParams({
    ...swapData,
    tradeType: quoteData.tradeType,
    transactionData: quoteData.transactionData,
    nativeValue: quoteData.nativeValue,
  });

  const queryUrl = `${baseUrl}/${swapData.chainId}/swap/single`;
  console.log("[Unizen] Sending swap request to:", queryUrl);

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

  const data = await response.json();
  data.fromAmount = swapData.amountIn;
  data.spender = UNIZEN_ROUTER_ADDRESSES[swapData.chainId];

  return data;
}
