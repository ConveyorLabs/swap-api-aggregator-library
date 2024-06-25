export function formatQuoteData(data, swapData, protocol) {
  return {
    aggregator: protocol,
    tokenIn: swapData.fromTokenAddress,
    tokenOut: swapData.toTokenAddress,
    amountIn: swapData.amountIn,
    amountOut: data.priceRoute.destAmount,
    gas: data.priceRoute.gasCost,
  };
}
