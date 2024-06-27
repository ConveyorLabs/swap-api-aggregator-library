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
    recipient,
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
    sellToken: fromTokenAddress,
    buyToken: toTokenAddress,
    sellAmount: amountIn.toString(),
    slippagePercentage: (Number(slippage) / 100).toString(),
    takerAddress: recipient,
    skipValidation: "true",
  });

  if (excludeDEXS) {
    params.append("excludedSources", excludeDEXS);
  }

  if (plan === "basic") {
    params.append("feeRecipient", platformReferralWallet);
    params.append("buyTokenPercentageFee", platformFeeBps / 100);
    params.append("feeRecipientTradeSurplus", platformReferralWallet);
  }

  if (plan === "premium") {
    if (partnerReferralWallet || partnerReferralFeeBps) {
      params.append("feeRecipient", partnerReferralWallet);
      params.append("buyTokenPercentageFee", partnerReferralFeeBps / 100);
      params.append("feeRecipientTradeSurplus", partnerReferralWallet);
    }
  }
  return params;
}
