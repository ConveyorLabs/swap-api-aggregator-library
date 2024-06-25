import { zeroAddress } from "viem";
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
    isAuthenticated,
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

  const params = {
    chainId: Number(chainId),
    inputTokens: [
      {
        tokenAddress:
          fromTokenAddress.toLowerCase() ===
          "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            ? zeroAddress
            : fromTokenAddress.toLowerCase(),
        amount: amountIn.toString(),
      },
    ],
    outputTokens: [
      {
        tokenAddress:
          toTokenAddress.toLowerCase() ===
          "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
            ? zeroAddress
            : toTokenAddress.toLowerCase(),
        proportion: 1,
      },
    ],
    userAddr: recipient,
    slippageLimitPercent: Number(slippage),
    sourceBlacklist: excludeDEXS ? excludeDEXS.split(",") : [],
    disableRFQs: false,
    compact: false,
  };

  if (!isAuthenticated) {
    params.referralCode = "3303183541";
  }

  return params;
}
