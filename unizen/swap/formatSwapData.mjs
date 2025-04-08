export function formatSwapData(data, swapData) {
  return {
    from: swapData.recipient,
    to: data.spender,
    value: data.nativeValue,
    data: data.data,
    gas: data.estimateGas,
    chainId: swapData.chainId,
  };
}
