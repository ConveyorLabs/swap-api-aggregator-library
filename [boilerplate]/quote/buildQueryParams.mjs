import { constructQuery } from "../constants.mjs";

export async function buildQueryParams(swapData) {
  const {
    fromTokenAddress,
    toTokenAddress,
    chainId,
    amountIn,
    slippage,
    includeProtocols = [],
    excludeProtocols = [],
    isAuthenticated,
  } = swapData;

  //do not alter this code

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

  // adjust this code based on the query parameters needed
  const params = new URLSearchParams({
    tokenIn: fromTokenAddress,
    tokenOut: toTokenAddress,
    amount: amountIn,
    slippage, // slippage is passed in as a percentage in the request body (e.g. 1 for 1% slippage), adjust as necessary if your API expects a different format (e.g. 100 for 1% slippage)
    from: recipient,
  });

  if (!isAuthenticated) {
    params.append("fee", 0.2);
  }

  //adjust the code below based on how your aggregator handles includeDEXS and excludeDEXS

  if (includeDEXS) {
    params.append("includeProtocols", includeDEXS);
  }
  if (excludeDEXS) {
    params.append("excludeProtocols", excludeDEXS);
  }

  return params;
}
