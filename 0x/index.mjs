import { fetchQuoteData as zeroExFetchQuoteData } from "./quote/fetchQuoteData.mjs";
import { formatQuoteData } from "./quote/formatQuoteData.mjs";
import { fetchSwapData as zeroExFetchSwapData } from "./swap/fetchSwapData.mjs";
import { formatSwapData } from "./swap/formatSwapData.mjs";

export const name = "0x";

export async function fetchQuoteData(requestBody) {
  const data = await zeroExFetchQuoteData(requestBody);
  return {
    ...formatQuoteData(data, requestBody, name),
    aggregator: name,
  };
}

export async function fetchSwapData(requestBody) {
  const data = await zeroExFetchSwapData(requestBody);
  return {
    ...formatSwapData(data, requestBody),
    aggregator: name,
  };
}
