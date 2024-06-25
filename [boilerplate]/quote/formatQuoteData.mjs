export function formatQuoteData(data, swapData, name) {
  return {
    //adjust the code below based on the response from your API. it should all include the following fields
    aggregator: name,
    tokenIn: swapData.fromTokenAddress,
    tokenOut: swapData.toTokenAddress,
    amountIn: swapData.amountIn,
    amountOut: data.dstAmount ?? "0",
    gas: data.gas.toString() ?? "0",
  };
}
