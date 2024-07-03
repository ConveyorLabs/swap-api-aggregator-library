import { constructQuery } from "../constants.mjs";

export async function buildQueryParams(swapData) {
  const {
    fromTokenAddress,
    toTokenAddress,
    chainId,
    amountIn,
    slippage,
    includeProtocols = [],
    excludeProtocols = []
  } = swapData;

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
    fromTokenAddress,
    toTokenAddress,
    amount: amountIn,
    slippage: (slippage / 100), // slippage is in %
    disableEstimate: false
  });

  // if (excludeDEXS) {
  //   params.append("excludedDexes", excludeDEXS);
  // }

  return params;
}
