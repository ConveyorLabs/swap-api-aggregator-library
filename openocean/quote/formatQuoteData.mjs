export function formatQuoteData(data, swapData, protocol) {
  return {
    aggregator: protocol,
    tokenIn: data.data.inToken.address,
    tokenOut: data.data.outToken.address,
    amountIn: swapData.amountIn,
    amountOut: data.data.outAmount,
    gas: data.data.estimatedGas,
  };
}
