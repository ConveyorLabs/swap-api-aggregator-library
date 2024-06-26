import { platformReferralWallet } from "../../../constants/referrer.mjs";
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
    isAuthenticated,
    priceRoute,
  } = swapData;

  const tokenDecimals = await fetchTokenDecimals({
    fromTokenAddress,
    toTokenAddress,
    chainId,
    fromTokenDecimals,
    toTokenDecimals,
  });

  const params = {
    srcToken: fromTokenAddress,
    srcDecimals: tokenDecimals.fromTokenDecimals,
    destToken: toTokenAddress,
    destDecimals: tokenDecimals.toTokenDecimals,
    srcAmount: amountIn.toString(),
    slippage: (slippage * 100).toString(), // Slippage in basis points
    userAddress: recipient,
    priceRoute,
  };

  if (!isAuthenticated) {
    params.partner = "Conveyor";
    params.takeSurplus = true;
    params.partnerFeeBps = "20";
    params.partnerAddress = platformReferralWallet;
  }

  return params;
}
