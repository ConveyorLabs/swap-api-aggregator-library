export function formatSwapData(data, swapData) {
  const isETH =
    swapData.fromTokenAddress.toLowerCase() ===
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
  return {
    from: swapData.recipient,
    to: data.routerAddress,
    value: isETH ? swapData.amountIn : "0",
    data: data.encodedSwapData,
    gas: data.totalGas,
    chainId: swapData.chainId,
  };
}
