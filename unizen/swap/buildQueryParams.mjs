export async function buildQueryParams(swapData) {
  const {
    quotes,
    recipient
  } = swapData;

  const bestQuote = quotes?.[0];
  const params = {
    transactionData: bestQuote?.transactionData,
    nativeValue: bestQuote?.nativeValue,
    account: recipient,
    receiver: recipient,
    tradeType: bestQuote.tradeType
  }
  return params;
}
