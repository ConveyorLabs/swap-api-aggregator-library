export function formatSwapData(data, swapData) {
  // If data is an array, use the first item, otherwise use the data object directly
  const swapResponse = Array.isArray(data) ? data[0] : data;

  console.log("[Unizen] Formatting swap data:", {
    hasData: !!swapResponse,
    spender: swapResponse?.spender,
    estimateGas: swapResponse?.estimateGas,
  });

  const isETH =
    swapData.fromTokenAddress.toLowerCase() ===
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

  return {
    from: swapData.recipient,
    to: swapResponse.spender,
    value: isETH ? swapResponse.nativeValue : "0",
    data: swapResponse.data,
    gas: swapResponse.estimateGas,
    chainId: swapData.chainId,
  };
}
