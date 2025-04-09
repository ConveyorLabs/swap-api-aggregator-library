export function formatSwapData(data, swapData) {
  const isETH =
    swapData.fromTokenAddress.toLowerCase() ===
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

  return {
    from: swapData.recipient,
    to: data.spender,
    value: isETH ? data.nativeValue : "0",
    data: data.data,
    gas: parseInt(data.estimateGas),
    chainId: swapData.chainId,
  };
}
