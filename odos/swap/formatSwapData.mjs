export function formatSwapData(data, swapData, protocol) {
  const isETH =
    swapData.fromTokenAddress.toLowerCase() ===
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

  return {
    aggregator: protocol,
    from: data.transaction.from,
    to: data.transaction.to,
    value: isETH ? data.transaction.value : "0",
    data: data.transaction.data,
    gas: data.transaction.gas <= 0 ? data.gasEstimate : data.transaction.gas,
    chainId: swapData.chainId,
  };
}
