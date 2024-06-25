import { fetchQuoteData } from "../quote/fetchQuoteData.mjs";
import { buildQueryParams } from "./buildQueryParams.mjs";

export async function fetchSwapData(swapData) {
  // Fetch the quote data to retrieve the pathId
  const quoteData = await fetchQuoteData(swapData);

  if (!quoteData || !quoteData.pathId) {
    throw new Error("Failed to fetch pathId from Odos quote");
  }

  console.log(`quote ID: ${quoteData.pathId}`);

  const pathId = quoteData.pathId;
  const baseUrl = `https://api.odos.xyz/sor/assemble`;
  const params = await buildQueryParams(swapData, pathId);

  console.log(`Request Payload: ${params}`); // Log the payload being sent

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: params,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `Failed to fetch swap data from Odos: ${response.statusText}`
    );
    console.error(`Error response: ${errorText}`);
    throw new Error(
      `Failed to fetch swap data from Odos: ${response.statusText}`
    );
  }

  const data = await response.json();
  data.fromTokenAddress = swapData.fromTokenAddress;

  console.log("Odos Swap Data Response:", data);

  return data;
}
