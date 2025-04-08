export function formatSwapData(data, swapData) {
  const isETH =
    swapData.fromTokenAddress.toLowerCase() ===
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  
  return {
    from: swapData.recipient,
    to: data.data.to,
    value: isETH ? data.data.value || "0" : "0",
    data: data.data.data,
    gas: data.data.estimatedGas || "300000", // Fallback gas limit
    chainId: data.data.chainId || swapData.chainId.toString(),
  };
}
