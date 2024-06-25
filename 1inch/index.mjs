import { fetchQuoteData as aggregatorFetchQuoteData } from "./quote/fetchQuoteData.mjs";
import { formatQuoteData } from "./quote/formatQuoteData.mjs";
import { fetchSwapData as aggregatorFetchSwapData } from "./swap/fetchSwapData.mjs";
import { formatSwapData } from "./swap/formatSwapData.mjs";

export const name = "1inch";

export async function fetchQuoteData(requestBody) {
  const data = await aggregatorFetchQuoteData(requestBody);
  return {
    ...formatQuoteData(data, requestBody, name),
    aggregator: name,
  };
}

export async function fetchSwapData(requestBody) {
  const data = await aggregatorFetchSwapData(requestBody);
  return {
    ...formatSwapData(data, requestBody),
    aggregator: name,
  };
}
