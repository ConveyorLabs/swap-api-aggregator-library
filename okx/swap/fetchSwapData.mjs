// https://www.okx.com/api/v5/dex/aggregator/swap?

import { buildQueryData } from "./buildQueryData.mjs";

export async function fetchSwapData(swapData) {
  const baseUrl = `https://www.okx.com/api/v5/dex/aggregator/swap?`;
  const { api_config, signature, timestamp } = await buildQueryData(swapData);
  const { chainId, amount, fromTokenAddress, toTokenAddress, slippage, userWalletAddress } = swapData;
  const response = await fetch(`${baseUrl}chainId=${chainId}&amount=${amount}&toTokenAddress=${toTokenAddress}&fromTokenAddress=${fromTokenAddress}&slippage=${slippage}&userWalletAddress=${userWalletAddress}`, {
    headers: {
      'OK-ACCESS-PROJECT': api_config['project'],
      'OK-ACCESS-KEY': api_config['api_key'],
      'OK-ACCESS-SIGN': signature,
      'OK-ACCESS-PASSPHRASE': api_config['passphrase'],
      'OK-ACCESS-TIMESTAMP': timestamp,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to fetch swap data from 0x: ${response.statusText}`);
    console.error(`Error response: ${errorText}`);
    throw new Error(
      `Failed to fetch swap data from 0x: ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data) {
    throw new Error("Invalid response format from 0x API");
  }

  return data;
}
