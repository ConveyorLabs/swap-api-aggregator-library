import paraswap from "./paraswap/index.mjs";
import kyber from "./kyber/index.mjs";
import oneInch from "./1inch/index.mjs";
import zeroX from "./0x/index.mjs";
import odos from "./odos/index.mjs";
import openocean from "./openocean/index.mjs";
import okx from "./okx/index.mjs";

export const allAdapters = {
  paraswap,
  kyber,
  oneInch,
  zeroX,
  odos,
  openocean,
  okx,
};

export const chainIdToAdapters = {
  1: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean", "okx"],
  56: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean", "okx"],
  137: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean", "okx"],
  42161: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean", "okx"],
  10: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean", "okx"],
  8453: ["paraswap", "kyber", "oneInch", "zeroX", "odos", "openocean", "okx"],
};
