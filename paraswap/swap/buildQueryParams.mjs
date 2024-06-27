import {
  platformFeeBps,
  platformReferralWallet,
} from "../../../constants/referrer.mjs";
import { fetchTokenDecimals } from "../../../lib/fetchTokenDecimals.mjs";

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
    priceRoute,
    rpcUrl,
    plan,
    partnerReferralWallet,
    partnerReferralFeeBps,
  } = swapData;

  const tokenDecimals = await fetchTokenDecimals({
    fromTokenAddress,
    toTokenAddress,
    chainId,
    fromTokenDecimals,
    toTokenDecimals,
    rpcUrl,
  });

  const params = {
    srcToken: fromTokenAddress,
    srcDecimals: tokenDecimals.fromTokenDecimals,
    destToken: toTokenAddress,
    destDecimals: tokenDecimals.toTokenDecimals,
    srcAmount: amountIn.toString(),
    slippage: (slippage * 100).toString(), // Slippage in basis points
    userAddress: recipient,
    partner: "Conveyor",
    takeSurplus: true,
    priceRoute,
  };

  if (plan === "basic") {
    params.partnerFeeBps = platformFeeBps;
    params.partnerAddress = platformReferralWallet;
  }

  if (plan === "premium") {
    if (partnerReferralWallet || partnerReferralFeeBps) {
      params.partnerFeeBps = partnerReferralFeeBps;
      params.partnerAddress = partnerReferralWallet;
    }
  }

  return params;
}
