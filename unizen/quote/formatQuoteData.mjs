export function formatQuoteData(data, swapData, name) {
  // If data is an array, use the first item, otherwise use the data object directly
  const quote = Array.isArray(data) ? data[0] : data;

  console.log("[Unizen] Formatting quote data:", {
    hasData: !!quote,
    toTokenAmount: quote?.toTokenAmount,
    estimateGas: quote?.estimateGas,
  });

  return {
    aggregator: name,
    tokenIn: swapData.fromTokenAddress,
    tokenOut: swapData.toTokenAddress,
    amountIn: swapData.amountIn,
    amountOut: quote?.toTokenAmount ?? "0",
    gas: quote?.estimateGas ?? "0",
  };
}
