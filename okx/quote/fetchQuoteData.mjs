// https://www.okx.com/api/v5/dex/aggregator/quote?
import { buildQueryData } from "./buildQueryData.mjs";

export async function fetchQuoteData(swapData) {
    const baseUrl = `https://www.okx.com/api/v5/dex/aggregator/quote?`;
    const { api_config, signature, timestamp } = await buildQueryData(swapData);
    const { amount, chainId, toTokenAddress, fromTokenAddress } = swapData;
    const response = await fetch(`${baseUrl}amount=${amount}&chainId=${chainId}&toTokenAddress=${toTokenAddress}&fromTokenAddress=${fromTokenAddress}`, {
        headers: {
            'OK-ACCESS-KEY': api_config['api_key'],
            'OK-ACCESS-SIGN': signature,
            'OK-ACCESS-TIMESTAMP': timestamp,
            'OK-ACCESS-PASSPHRASE': api_config['passphrase'],
            'OK-ACCESS-PROJECT': api_config['project'], // This applies only to WaaS APIs
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to fetch quote data from 0x: ${response.statusText}`);
        console.error(`Error response: ${errorText}`);
        throw new Error(
            `Failed to fetch quote data from 0x: ${response.statusText}`
        );
    }

    const data = await response.json();

    if (!data) {
        throw new Error("Invalid response format from 0x API");
    }

    return data;
}
