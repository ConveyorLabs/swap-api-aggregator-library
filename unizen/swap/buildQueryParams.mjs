export async function buildQueryParams(swapData) {
  const { recipient, tradeType, transactionData, nativeValue } = swapData;

  console.log("[Unizen] Building swap params:", {
    recipient,
    tradeType,
    hasTransactionData: !!transactionData,
  });

  const params = {
    transactionData,
    nativeValue,
    account: recipient,
    receiver: recipient,
    tradeType,
  };

  return params;
}
