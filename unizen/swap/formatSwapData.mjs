export function formatSwapData(data, swapData) {

  const contractAddresses = {
    1: "0xd3f64BAa732061F8B3626ee44bab354f854877AC",
    56: "0x880E0cE34F48c0cbC68BF3E745F17175BA8c650e",
    137: "0x07d0ac7671D4242858D0cebcd34ec03907685947",
    43114: "0x1C7F7e0258c81CF41bcEa31ea4bB5191914Bf7D7",
    250: "0xBE2A77399Cde40EfbBc4e89207332c4a4079c83D",
    42161: "0x1C7F7e0258c81CF41bcEa31ea4bB5191914Bf7D7",
    10: "0xad1D43efCF92133A9a0f33e5936F5ca10f2b012E",
    8453: "0x4F68248ecB782647D1E5981a181bBe1bfFee1040"
  };
  return {
    from: swapData.recipient,
    to: contractAddresses[swapData.chainId],
    value: data.nativeValue,
    data: data.data,
    gas: data.estimateGas,
    chainId: swapData.chainId,
  };
}
