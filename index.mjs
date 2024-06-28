import * as paraswap from "./paraswap/index.mjs";
import * as kyber from "./kyber/index.mjs";
import * as oneInch from "./1inch/index.mjs";
import * as zeroX from "./0x/index.mjs";
import * as odos from "./odos/index.mjs";
import * as openocean from "./openocean/index.mjs";

export const allAdapters = {
  paraswap,
  kyber,
  oneInch,
  zeroX,
  odos,
  openocean,
};

export const chainIdToAdapters = {
  1: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean"],
  56: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean"],
  137: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean"],
  42161: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean"],
  10: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean"],
  8453: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean"],
};
