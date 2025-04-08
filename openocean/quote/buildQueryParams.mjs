// https://docs.openocean.finance/dev/aggregator-api-and-sdk/aggregator-api-v3#quote-the-price-of-a-specific-trading-pair
import { constructQuery, tokenAddressToNativeToken } from "../constants.mjs";
import fetchGasPrice from "../../../lib/fetchGasPrice.mjs";
import { fetchTokenDecimals } from "../../../lib/fetchTokenDecimals.mjs";

export async function buildQueryParams(swapData) {
  const {
    fromTokenAddress,
    toTokenAddress,
    chainId,
    amountIn,
    slippage,
    includeProtocols = [],
    excludeProtocols = [],
    fromTokenDecimals,
    toTokenDecimals,
    rpcUrl,
  } = swapData;

  const inTokenAddress =
    fromTokenAddress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      ? tokenAddressToNativeToken[chainId]
      : fromTokenAddress;
  const outTokenAddress =
    toTokenAddress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
      ? tokenAddressToNativeToken[chainId]
      : toTokenAddress;

  const includeProtocolsArray = Array.isArray(includeProtocols)
    ? includeProtocols
    : includeProtocols.split(",");
  const excludeProtocolsArray = Array.isArray(excludeProtocols)
    ? excludeProtocols
    : excludeProtocols.split(",");

  const tokenDecimals = await fetchTokenDecimals({
    fromTokenAddress: inTokenAddress,
    toTokenAddress: outTokenAddress,
    chainId,
    fromTokenDecimals,
    toTokenDecimals,
    rpcUrl,
  });

  let gasPrice;
  try {
    gasPrice = await fetchGasPrice(chainId, rpcUrl);
  } catch (error) {
    gasPrice = "1000000000"; // 1 gwei fallback
  }

  // Format gas price correctly - ensure it's at least 1 gwei
  const gasPriceInGwei = (Number(BigInt(gasPrice)) / 10 ** 9);
  const formattedGasPrice = Math.max(1, gasPriceInGwei).toFixed(0);

  const { includeDEXS, excludeDEXS } = constructQuery(
    chainId,
    includeProtocolsArray.join(","),
    excludeProtocolsArray.join(",")
  );

  const formattedAmount = (Number(amountIn) / 10 ** tokenDecimals.fromTokenDecimals).toString();

  // Create params with minimal required fields first
  const params = new URLSearchParams({
    gasPrice: formattedGasPrice,
    inTokenAddress: inTokenAddress,
    outTokenAddress: outTokenAddress,
    amount: formattedAmount,
    slippage,
  });

  // Add all DEX IDs if available
  if (includeDEXS && includeDEXS.length > 0) {
    params.append("enableDexIds", includeDEXS);
  }

  return params;
}