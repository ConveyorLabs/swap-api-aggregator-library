import { fetchTokenDecimals } from "../../../lib/fetchTokenDecimals.mjs";
import { constructQuery } from "../constants.mjs";

export async function buildQueryParams(swapData) {
  const {
    fromTokenAddress,
    toTokenAddress,
    chainId,
    amountIn,
    slippage,
    recipient,
    fromTokenDecimals,
    toTokenDecimals,
    includeProtocols = [],
    excludeProtocols = [],
  } = swapData;

  const tokenDecimals = await fetchTokenDecimals({
    fromTokenAddress,
    toTokenAddress,
    chainId,
    fromTokenDecimals,
    toTokenDecimals,
  });

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
    srcToken: fromTokenAddress,
    destToken: toTokenAddress,
    amount: amountIn,
    srcDecimals: tokenDecimals.fromTokenDecimals,
    destDecimals: tokenDecimals.toTokenDecimals,
    side: "SELL",
    network: chainId,
    slippage: slippage * 100, // Slippage in basis points
    recipient,
    maxImpact: "50",
  });

  if (includeDEXS) {
    params.append("includeDEXS", includeDEXS);
  }
  if (excludeDEXS) {
    params.append("excludeDEXS", excludeDEXS);
  }

  return params;
}
