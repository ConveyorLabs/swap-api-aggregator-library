import { constructQuery } from "../constants.mjs";

export async function buildQueryParams(swapData) {
  const {
    fromTokenAddress,
    toTokenAddress,
    chainId,
    amountIn,
    slippage,
    recipient,
    includeProtocols = [],
    excludeProtocols = [],
  } = swapData;

  // if (slippage > 100) {
  //   throw new Error("Slippage must be less than or equal to 100.");
  // }

  const includeProtocolsArray = Array.isArray(includeProtocols)
    ? includeProtocols
    : includeProtocols.split(",");
  const excludeProtocolsArray = Array.isArray(excludeProtocols)
    ? excludeProtocols
    : excludeProtocols.split(",");

  const { excludeDEXS } = constructQuery(
    chainId,
    includeProtocolsArray.join(","),
    excludeProtocolsArray.join(",")
  );

  const params = new URLSearchParams({
    sellToken: fromTokenAddress,
    buyToken: toTokenAddress,
    sellAmount: amountIn.toString(),
    slippagePercentage: (Number(slippage) / 100).toString(),
    takerAddress: recipient,
    skipValidation: "true",
  });

  // if (includeDEXS) {
  //   params.append("includedSources", includeDEXS);
  // }
  if (excludeDEXS) {
    params.append("excludedSources", excludeDEXS);
  }

  return params;
}
