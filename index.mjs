import paraswap from "./paraswap/index.mjs";
import kyber from "./kyber/index.mjs";
import oneInch from "./1inch/index.mjs";
import zeroX from "./0x/index.mjs";
import odos from "./odos/index.mjs";
import openocean from "./openocean/index.mjs";

export const allAdapters = {
  paraswap,
  kyber,
  oneInch,
  zeroX,
  odos,
  openocean,
};

export const chainIdToAdapters = {
  1: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean", "unizen"],
  56: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean", "unizen"],
  137: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean", "unizen"],
  42161: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean", "unizen"],
  10: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean", "unizen"],
  8453: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean", "unizen"],
  43114: ["unizen"],
  250: ["unizen"],
};
