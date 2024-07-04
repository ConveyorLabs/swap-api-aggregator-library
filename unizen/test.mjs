import adapter from "./index.mjs";

const mockSwapData = {
  fromTokenAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  toTokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
  amountIn: "1000000000",
  slippage: 1,
  chainId: 1,
  recipient: "0x92977D2552f455Bb9A3457AEbfCb78f1256Dd2e5",
  includeProtocols: "uniswap-v2,sushiswap",
  excludeProtocols: "uniswap-v3",
  fromTokenDecimals: 6,
  toTokenDecimals: 18,
  unizenApiKey: "set key here"
};

async function testQuote() {
  try {
    console.log("Testing Quote Functionality");
    const quoteResult = await adapter.fetchQuoteData(mockSwapData);
    console.log("Quote result:", JSON.stringify(quoteResult, null, 2));
    return quoteResult;
  } catch (error) {
    console.error("Error in Quote test:", error);
    throw error;
  }
}

async function testSwap() {
  try {
    console.log("\nTesting Swap Functionality");
    const swapResult = await adapter.fetchSwapData(mockSwapData);
    console.log("Swap result:", JSON.stringify(swapResult, null, 2));
    return swapResult;
  } catch (error) {
    console.error("Error in Swap test:", error);
    throw error;
  }
}

async function runTests() {
  try {
    const quoteResult = await testQuote();
    const swapResult = await testSwap();

    console.log("\nTest Summary:");
    console.log("Quote Test: Success");
    console.log("Swap Test: Success");
    console.log("\nAll tests completed successfully");
  } catch (error) {
    console.error("\nTest Summary:");
    console.error("Tests failed:", error);
  }
}

runTests();
