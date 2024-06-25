import { fetchQuoteData as paraswapFetchQuoteData } from "./quote/fetchQuoteData.mjs";
import { formatQuoteData } from "./quote/formatQuoteData.mjs";
import { fetchSwapData as paraswapFetchSwapData } from "./swap/fetchSwapData.mjs";
import { formatSwapData } from "./swap/formatSwapData.mjs";

export const name = "Paraswap";

export async function fetchQuoteData(requestBody) {
  const data = await paraswapFetchQuoteData(requestBody);
  return {
    ...formatQuoteData(data, requestBody, name),
    aggregator: name,
  };
}

export async function fetchSwapData(requestBody) {
  const data = await paraswapFetchSwapData(requestBody);
  return {
    ...formatSwapData(data, requestBody),
    aggregator: name,
  };
}
