export function formatQuoteData(data, swapData, name) {
  return {
    aggregator: name,
    tokenIn: swapData.fromTokenAddress,
    tokenOut: swapData.toTokenAddress,
    amountIn: swapData.amountIn,
    amountOut: data.dstAmount ?? "0",
    gas: data.gas.toString() ?? "0",
  };
}
