export function createAdapter(name, quoteFunctions, swapFunctions) {
  if (!name) {
    throw new Error("Adapter name is required");
  }
  return {
    name,
    async fetchQuoteData(requestBody) {
      const data = await quoteFunctions.fetchQuoteData(requestBody);
      return {
        ...quoteFunctions.formatQuoteData(data, requestBody, name),
        aggregator: name,
      };
    },
    async fetchSwapData(requestBody) {
      const data = await swapFunctions.fetchSwapData(requestBody);
      return {
        ...swapFunctions.formatSwapData(data, requestBody),
        aggregator: name,
      };
    },
  };
}
