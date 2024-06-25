export function formatSwapData(data, swapData) {
  //adjust based on how you handle input tokens, if the input token is Ether and your api expects the input contract address to be 0x0000000 or 0xeeeeeee, adjust the code below
  const isETH =
    swapData.fromTokenAddress.toLowerCase() ===
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

  console.log(`value: ${data.tx.value}`);
  return {
    //adjust the code below based on the response from your API. it should all include the following fields
    from: data.tx.from,
    to: data.tx.to,
    value: isETH ? data.tx.value : "0",
    data: data.tx.data,
    gas: data.tx.gas,

    //if you return the chainID, include it here, otherwise reference swapData.chainId
    chainId: data.tx.chainId,
  };
}
