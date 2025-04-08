export function formatQuoteData(data, swapData, name) {
  const bestQuote = data?.[0];
  return {
    aggregator: name,
    tokenIn: swapData.fromTokenAddress,
    tokenOut: swapData.toTokenAddress,
    amountIn: swapData.amountIn,
    amountOut: bestQuote?.toTokenAmount ?? "0",
    gas: bestQuote?.estimateGas ?? "0",
  };
}
