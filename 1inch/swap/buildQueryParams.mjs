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
    isAuthenticated,
  } = swapData;

  const includeProtocolsArray = Array.isArray(includeProtocols)
    ? includeProtocols
    : includeProtocols.split(",");
  const excludeProtocolsArray = Array.isArray(excludeProtocols)
    ? excludeProtocols
    : excludeProtocols.split(",");

  const { includeDEXS, excludeDEXS } = constructQuery(
    chainId,
    includeProtocolsArray.join(","),
    excludeProtocolsArray.join(",")
  );

  // Prepare the payload
  const params = new URLSearchParams({
    src: fromTokenAddress,
    dst: toTokenAddress,
    amount: amountIn,
    slippage, // slippage is in %
    includeGas: "true",
    from: recipient,
    protocols: includeDEXS,
    excludeProtocols: excludeDEXS,
    origin: recipient,
    disableEstimate: "true",
  });

  // Add additional params if not authenticated
  if (!isAuthenticated) {
    params.append("fee", 0.2);
    params.append("referrer", "0x2f37bC8900EB1176C689c63c5E781B96DCC0C48E");
  }

  // if (includeDEXS) {
  //   params.append("includeProtocols", includeDEXS);
  // }
  if (excludeDEXS) {
    params.append("excludeProtocols", excludeDEXS);
  }

  return params;
}
