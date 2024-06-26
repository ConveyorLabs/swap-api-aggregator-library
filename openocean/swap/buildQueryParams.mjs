//https://docs.openocean.finance/dev/aggregator-api-and-sdk/aggregator-api-v3#building-transaction-1

import { constructQuery, tokenAddressToNativeToken } from "../constants.mjs";
import fetchGasPrice from "../../../lib/fetchGasPrice.mjs";
import { fetchTokenDecimals } from "../../../lib/fetchTokenDecimals.mjs";
import { platformReferralWallet } from "../../../constants/referrer.mjs";

export async function buildQueryParams(swapData) {
  const {
    fromTokenAddress,
    toTokenAddress,
    fromTokenDecimals,
    toTokenDecimals,
    chainId,
    amountIn,
    slippage,
    recipient,
    includeProtocols = [],
    excludeProtocols = [],
    platformReferralWallet,
    referralFeeBps,
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
  });

  const gasPrice = await fetchGasPrice(chainId);

  const { includeDEXS, excludeDEXS } = constructQuery(
    chainId,
    includeProtocolsArray.join(","),
    excludeProtocolsArray.join(",")
  );

  const params = new URLSearchParams({
    gasPrice: (Number(BigInt(gasPrice)) / 10 ** 9).toFixed(2).toString(),
    inTokenAddress: inTokenAddress,
    outTokenAddress: outTokenAddress,
    amount: (amountIn / 10 ** tokenDecimals.fromTokenDecimals).toString(),
    slippage,
    account: recipient,
  });

  if (includeDEXS) {
    params.append("enableDexIds", includeDEXS);
  }
  if (excludeDEXS) {
    params.append("disableDexIds", excludeDEXS);
  }

  if (!isAuthorized) {
    params.append("referrer", platformReferralWallet);
    params.append("referrerFee", "0.2");
  }

  return params;
}
