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

  const params = new URLSearchParams({
    tokenIn: fromTokenAddress,
    tokenOut: toTokenAddress,
    amountIn: amountIn,
    to: recipient,
    saveGas: "0",
    gasInclude: "1",
    slippageTolerance: slippage * 100, //fee is in bips
    includedSources: includeDEXS,
    excludedSources: excludeDEXS,
    source: "Conveyor",
  });

  if (includeDEXS) {
    params.append("includeDEXS", includeDEXS);
  }
  if (excludeDEXS) {
    params.append("excludeDEXS", excludeDEXS);
  }

  if (!isAuthenticated) {
    params.append("feeAmount", 20);
    params.append("chargeFeeBy", "currency_in");
    params.append("feeReceiver", "0x2f37bC8900EB1176C689c63c5E781B96DCC0C48E");
    params.append("isInBps", true);
  }

  return params;
}
