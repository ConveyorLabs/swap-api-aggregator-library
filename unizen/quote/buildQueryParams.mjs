import {
  platformFeeBps,
  platformReferralWallet,
} from "../../../constants/referrer.mjs";
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
    plan,
    partnerReferralWallet,
    partnerReferralFeeBps,
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
    slippage: slippage / 100, // slippage is in %
    disableEstimate: false,
    version: "v2",
  });

  if (excludeDEXS && Object.keys(excludeDEXS).length > 0) {
    params.append("excludedDexes", JSON.stringify(excludeDEXS));
  }

  if (plan === "basic") {
    params.append("feePercentage", `"${platformFeeBps / 100}"`);
    params.append("feeReceiver", platformReferralWallet);
  }

  if (plan === "premium") {
    if (partnerReferralWallet || partnerReferralFeeBps) {
      params.append("feePercentage", `"${partnerReferralFeeBps / 100}"`);
      params.append("feeReceiver", partnerReferralWallet);
    }
  }

  return params;
}
