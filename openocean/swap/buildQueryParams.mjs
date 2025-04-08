// https://docs.openocean.finance/dev/aggregator-api-and-sdk/aggregator-api-v3#building-transaction-1
import { constructQuery, tokenAddressToNativeToken } from "../constants.mjs";
import fetchGasPrice from "../../../lib/fetchGasPrice.mjs";
import { fetchTokenDecimals } from "../../../lib/fetchTokenDecimals.mjs";
import {
  platformFeeBps,
  platformReferralWallet,
} from "../../../constants/referrer.mjs";

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
    rpcUrl,
    plan,
    partnerReferralWallet,
    partnerReferralFeeBps,
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

  const { includeDEXS, excludeDEXS } = constructQuery(
    chainId,
    includeProtocolsArray.join(","),
    excludeProtocolsArray.join(",")
  );

  // Format gas price correctly - ensure it's at least 1 gwei
  const gasPriceInGwei = (Number(BigInt(gasPrice)) / 10 ** 9);
  const formattedGasPrice = Math.max(1, gasPriceInGwei).toFixed(0);

  const formattedAmount = (Number(amountIn) / 10 ** tokenDecimals.fromTokenDecimals).toString();

  const params = new URLSearchParams({
    gasPrice: formattedGasPrice,
    inTokenAddress: inTokenAddress,
    outTokenAddress: outTokenAddress,
    amount: formattedAmount,
    slippage,
    account: recipient,
  });

  if (includeDEXS) {
    params.append("enableDexIds", includeDEXS);
  }
  if (excludeDEXS) {
    params.append("disableDexIds", excludeDEXS);
  }

  if (plan === "basic") {
    params.append("referrer", platformReferralWallet);
    params.append("referrerFee", (platformFeeBps / 100).toString());
  }

  if (plan === "premium") {
    if (partnerReferralWallet || partnerReferralFeeBps) {
      params.append("referrer", partnerReferralWallet);
      params.append("referrerFee", (partnerReferralFeeBps / 100).toString());
    }
  }

  return params;
}
