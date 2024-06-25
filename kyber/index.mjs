import { fetchQuoteData as kyberFetchQuoteData } from "./quote/fetchQuoteData.mjs";
import { formatQuoteData } from "./quote/formatQuoteData.mjs";
import { fetchSwapData as kyberFetchSwapData } from "./swap/fetchSwapData.mjs";
import { formatSwapData } from "./swap/formatSwapData.mjs";

export const name = "Kyber";

export async function fetchQuoteData(requestBody) {
  const data = await kyberFetchQuoteData(requestBody);
  return {
    ...formatQuoteData(data, requestBody, name),
    aggregator: name,
  };
}

export async function fetchSwapData(requestBody) {
  const data = await kyberFetchSwapData(requestBody);
  return {
    ...formatSwapData(data, requestBody),
    aggregator: name,
  };
}
