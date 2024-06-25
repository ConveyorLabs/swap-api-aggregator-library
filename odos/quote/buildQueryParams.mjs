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
    disableRFQs: false,
    compact: false,
  };

  if (includeDEXS) {
    params.sourceWhitelist = includeDEXS.split(",").map((item) => item.trim());
  }

  if (excludeDEXS) {
    params.sourceBlacklist = excludeDEXS.split(",").map((item) => item.trim());
  }

  if (
    fromTokenAddress.toLowerCase() ===
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" ||
    fromTokenAddress.toLowerCase() === zeroAddress ||
    toTokenAddress.toLowerCase() ===
      "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" ||
    toTokenAddress.toLowerCase() === zeroAddress
  ) {
    if (!params.sourceWhitelist) {
      params.sourceWhitelist = [];
    }
    if (!params.sourceWhitelist.includes("Wrapped Ether")) {
      params.sourceWhitelist.push("Wrapped Ether");
    }
    if (params.sourceBlacklist) {
      params.sourceBlacklist = params.sourceBlacklist.filter(
        (item) => item !== "Wrapped Ether"
      );
    }
  }

  if (!isAuthenticated) {
    params.referralCode = "3303183541";
  }

  console.log(params);

  return params;
}
