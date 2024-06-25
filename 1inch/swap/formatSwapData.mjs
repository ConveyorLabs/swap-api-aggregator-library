export function formatSwapData(data, swapData) {
  const isETH =
    swapData.fromTokenAddress.toLowerCase() ===
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

  console.log(`value: ${data.tx.value}`);
  return {
    from: data.tx.from,
    to: data.tx.to,
    value: isETH ? data.tx.value : "0",
    data: data.tx.data,
    gas: data.tx.gas,
    chainId: data.tx.chainId,
  };
}
