import { buildQueryParams } from "./buildQueryParams.mjs";

export async function fetchQuoteData(swapData) {
  const params = await buildQueryParams(swapData);

  const response = await fetch(`https://api.odos.xyz/sor/quote/v2`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `Failed to fetch quote data from Odos: ${response.statusText}`
    );
    console.error(`Error response: ${errorText}`);
    throw new Error(
      `Failed to fetch quote data from Odos: ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data) {
    throw new Error("Invalid response format from Odos API");
  }

  return data;
}
