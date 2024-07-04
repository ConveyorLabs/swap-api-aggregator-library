import { platformFeeBps } from "../../../constants/referrer.mjs";
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
    src: fromTokenAddress,
    dst: toTokenAddress,
    amount: amountIn,
    slippage, // slippage is in %
    includeGas: "true",
  });

  if (excludeDEXS) {
    params.append("excludeProtocols", excludeDEXS);
  }

  if (plan === "basic") {
    params.append("fee", platformFeeBps / 100);
  }

  if (plan === "premium") {
    if (partnerReferralWallet || partnerReferralFeeBps) {
      params.append("fee", partnerReferralFeeBps / 100);
    }
  }

  return params;
}
