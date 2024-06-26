//https://docs.kyberswap.com/kyberswap-solutions/kyberswap-aggregator/aggregator-api-specification/evm-swaps

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
    source: "Conveyor",
  });

  if (includeDEXS) {
    params.append("includedSources", includeDEXS);
  }
  if (excludeDEXS) {
    params.append("excludedSources", excludeDEXS);
  }

  if (plan === "/basic") {
    params.append("feeAmount", platformFeeBps);
    params.append("chargeFeeBy", "currency_in");
    params.append("feeReceiver", platformReferralWallet);
    params.append("isInBps", true);
    console.log(params);
  }

  if (plan === "/premium") {
    if (partnerReferralWallet || partnerReferralFeeBps) {
      params.append("feeAmount", partnerReferralFeeBps);
      params.append("chargeFeeBy", "currency_in");
      params.append("feeReceiver", partnerReferralWallet);
      params.append("isInBps", true);
      console.log(params);
    }
  }

  return params;
}
