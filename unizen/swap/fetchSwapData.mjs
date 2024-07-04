import { buildQueryParams } from "./buildQueryParams.mjs";
import { fetchQuoteData } from "../quote/fetchQuoteData.mjs";
import { BASE_DOMAIN } from "../constants.mjs";

export async function fetchSwapData(swapData) {
  const quoteData = await fetchQuoteData(swapData);
  const body = await buildQueryParams({
    ...swapData,
    quotes: quoteData,
  });

  const baseUrl = `${BASE_DOMAIN}/${swapData.chainId}/swap/single`;
  console.log('body', body);
  const response = await fetch(`${baseUrl}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${swapData.unizenApiKey}`
    },
  });
  if (!response.ok) {
    const errorText = await response.text(); // Read the response body
    console.error(
      `Failed to fetch swap data from unizen: ${response.statusText}`
    );
    console.error(`Error response: ${errorText}`);
    throw new Error(`unizen API error: ${errorText}`);
  }

  const baseUrlSpender = `${BASE_DOMAIN}/${swapData.chainId}/approval/spender?contractVersion=v1`;
  console.log('baseUrlSpender', baseUrlSpender);
  const responseSpender = await fetch(baseUrlSpender, {
    headers: {
      Authorization: `Bearer ${swapData.unizenApiKey}`
    },
  });
  const responseJson = await responseSpender.json();
  console.log('responseSpender', responseSpender);
  console.log('responseJson', responseJson);

  const data = await response.json();
  console.dir(data, { depth: null });
  data.fromAmount = swapData.amountIn;
  data.spender = responseJson.address;

  return data;
}
