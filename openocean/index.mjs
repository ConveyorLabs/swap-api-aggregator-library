import { fetchQuoteData as openoceanFetchQuoteData } from "./quote/fetchQuoteData.mjs";
import { formatQuoteData } from "./quote/formatQuoteData.mjs";
import { fetchSwapData as openoceanFetchSwapData } from "./swap/fetchSwapData.mjs";
import { formatSwapData } from "./swap/formatSwapData.mjs";

export const name = "OpenOcean";

export async function fetchQuoteData(requestBody) {
  const data = await openoceanFetchQuoteData(requestBody);
  return {
    ...formatQuoteData(data, requestBody, name),
    aggregator: name,
  };
}

export async function fetchSwapData(requestBody) {
  const data = await openoceanFetchSwapData(requestBody);
  return {
    ...formatSwapData(data, requestBody),
    aggregator: name,
  };
}
