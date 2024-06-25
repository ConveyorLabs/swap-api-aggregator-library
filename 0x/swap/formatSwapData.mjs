export function formatSwapData(data, swapData) {
  const isETH =
    swapData.fromTokenAddress.toLowerCase() ===
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

  return {
    from: data.from,
    to: data.to,
    value: isETH ? data.value : "0",
    data: data.data,
    gas: data.gas,
    chainId: data.chainId,
  };
}
