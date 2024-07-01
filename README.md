# Aggregator Integration Guide

This guide explains how to integrate a new aggregator into our DEX aggregator system.

## Folder Structure

To add a new aggregator, It's highly suggested that you copy and paste an existing aggregator as a boilerplate. Each Aggregator implementation has this structure, and any new PR's should be structured the exact same way.

```
your-aggregator-name/
   ├── index.mjs
   ├── constants.mjs
   ├── quote/
   │   ├── index.mjs
   │   ├── buildQueryParams.mjs
   │   ├── fetchQuoteData.mjs
   │   └── formatQuoteData.mjs
   └── swap/
       ├── index.mjs
       ├── buildQueryParams.mjs
       ├── fetchSwapData.mjs
       └── formatSwapData.mjs
```

## Step-by-Step Integration

1. **Create `constants.mjs`**

  Define any protocols specific to your aggregator for each chain you support. The KEY should be how your particular Aggregator formats names for including and excluding sources (i.e. UNISWAP_V3, Uniswap-V3, uniswapv3, etc...), the VALUE is how it appears in our API, and should mirror how other protocols ./constants files are formatted. be sure to use existing value names from other aggregators first before creating your own, as it will reduce duplicates in the main swap API responses for /sources and when using `includeProtocols` and `excludeProtocols`

  Example:
  
```js
  export const supportedProtocols = {
    1: { KEY:VALUE, KEY:VALUE,... },
    56: { /* BSC protocols */ },
    // ... other chains
  };

  export function constructQuery(chainId, includeProtocols, excludeProtocols) {
    // Implement logic to construct query based on protocols
  }
```

2. **Implement `quote/buildQueryParams.mjs`**

  Create a function that builds the query parameters for your quote request. If you allow partners to take a fee, you should have separate logic for "basic" and "premium" plans. It should mirror how other Aggregators implement their logic.

  Example:

```js
  import { constructQuery } from "../constants.mjs";

  export async function buildQueryParams(swapData) {
    const {
      fromTokenAddress,
      toTokenAddress,
      chainId,
      amountIn,
      slippage,
      includeProtocols,
      excludeProtocols,
    } = swapData;

    const { includeDEXS, excludeDEXS } = constructQuery(
      chainId,
      includeProtocols,
      excludeProtocols
    );

    const params = new URLSearchParams({
      fromToken: fromTokenAddress,
      toToken: toTokenAddress,
      amount: amountIn,
      slippage: slippage.toString(),
      includeDEXS,
      excludeDEXS,
    });

    return params;
  }
```


3. **Implement `quote/fetchQuoteData.mjs`**

  Create a function that fetches quote data from your aggregator's API.

  Example:

```js
  import { buildQueryParams } from "./buildQueryParams.mjs";

  export async function fetchQuoteData(swapData) {
    const baseUrl = "https://api.your-aggregator.com/quote";
    const params = await buildQueryParams(swapData);
    const response = await fetch(`${baseUrl}?${params}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    return await response.json();
  }
```

4. **Implement `quote/formatQuoteData.mjs`**

  Create a function that formats the quote data to match the expected structure.

  Example:

```js
  export function formatQuoteData(data, swapData, protocol) {
    return {
      aggregator: protocol,
      tokenIn: swapData.fromTokenAddress,
      tokenOut: swapData.toTokenAddress,
      amountIn: swapData.amountIn,
      amountOut: data.expectedOutput,
      gas: data.estimatedGas,
    };
  }
```

5. **Implement `swap/buildQueryParams.mjs`**

  Create a function that builds the query parameters for your swap request. If you allow partners to take a fee, you should have separate logic for "basic" and "premium" plans. It should mirror how other Aggregators implement their logic.

  Example:

```js
  import { constructQuery } from "../constants.mjs";

  export async function buildQueryParams(swapData) {
    const {
      fromTokenAddress,
      toTokenAddress,
      chainId,
      amountIn,
      slippage,
      recipient,
      includeProtocols,
      excludeProtocols,
    } = swapData;

    const { includeDEXS, excludeDEXS } = constructQuery(
      chainId,
      includeProtocols,
      excludeProtocols
    );

    const params = new URLSearchParams({
      fromToken: fromTokenAddress,
      toToken: toTokenAddress,
      amount: amountIn,
      slippage: slippage.toString(),
      recipient,
      includeDEXS,
      excludeDEXS,
    });

    return params;
  }
```

6. **Implement `swap/fetchSwapData.mjs`**

  Create a function that fetches swap data from your aggregator's API.

  Example:

```js
  import { buildQueryParams } from "./buildQueryParams.mjs";

  export async function fetchSwapData(swapData) {
    const baseUrl = "https://api.your-aggregator.com/swap";
    const params = await buildQueryParams(swapData);
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch swap data: ${response.statusText}`);
    }

    return await response.json();
  }
```


7. **Implement `swap/formatSwapData.mjs`**

  Create a function that formats the swap data to match the expected structure.

  Example:

```js
  export function formatSwapData(data, swapData) {
    return {
      from: data.from,
      to: data.to,
      value: data.value,
      data: data.data,
      gas: data.gas,
      chainId: data.chainId,
    };
  }
```

8. **Create `quote/index.mjs` and `swap/index.mjs`**. These files should not be altered.

  Export the functions from these index files.

  Example for `quote/index.mjs`:

```js
  export { fetchQuoteData } from "./fetchQuoteData.mjs";
  export { formatQuoteData } from "./formatQuoteData.mjs";
```

  Example for `swap/index.mjs`:

```js
  export { fetchSwapData } from "./fetchSwapData.mjs";
  export { formatSwapData } from "./formatSwapData.mjs";
```

9. **Create the main `index.mjs`**

  Use the `createAdapter` function to create and export your adapter. This file should only require you to update your adapter name for `yourAggregatorName` as you want it shown to users via the /adapters slug in the API request.

```js
  import { createAdapter } from "../../common/adapterTemplate.mjs";
  import * as quoteFunctions from "./quote/index.mjs";
  import * as swapFunctions from "./swap/index.mjs";

  const adapter = createAdapter("YourAggregatorName", quoteFunctions, swapFunctions);

  export default adapter;
```

10. **Update the main `src/index.mjs`**

   Import your new adapter and add it to the `allAdapters` object and `chainIdToAdapters` array.


```js
   import yourAggregator from './your-aggregator-name/index.mjs';

   export const allAdapters = {
     // ... other adapters
     yourAggregator,
   };

   export const chainIdToAdapters = {
     1: [..., "yourAggregator"],
     // ... other chain IDs you support
   };
```


## Testing Your Integration

1. Ensure all your functions are correctly implemented and exported.
2. Test your adapter with sample swap data to verify it returns the expected results.
3. Check that your adapter works correctly within the larger system by testing quote and swap requests through the main API.

## Notes

- Ensure your API keys or other sensitive information are stored securely and not hard-coded in the adapter files. Reach out directly to the team [here](https://t.me/rorygraman) to get your API key hardcoded in the closed-source API codebase
- Follow the existing code style and error handling patterns for consistency.
- If your aggregator requires specific configuration or setup, document it clearly in a README file within your adapter folder.

For any questions or issues during integration, please contact the maintainers of this project.
