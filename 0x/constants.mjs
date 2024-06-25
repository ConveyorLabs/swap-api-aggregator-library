export const supportedProtocols = {
  1: {
    "0x": "0x",
    Aave_V2: "aave-v2",
    Balancer: "balancer-v1",
    Balancer_V2: "balancer-v2",
    BancorV3: "bancor-v3",
    Compound: "compound",
    CryptoCom: "crypto-com",
    Curve: "curve",
    Curve_V2: "curve-v2",
    DODO: "dodo",
    DODO_V2: "dodo-v2",
    KyberDMM: "kyber-dmm",
    KyberElastic: "kyber-elastic",
    Lido: "lido",
    MakerPsm: "maker-psm",
    Maverick_V1: "maverick-v1",
    MultiHop: "multi-hop",
    PancakeSwap_V3: "pancake-v3",
    ShibaSwap: "shibaswap",
    SushiSwap: "sushiswap",
    Synapse: "synapse",
    Synthetix: "synthetix",
    Uniswap: "uniswap",
    Uniswap_V2: "uniswap-v2",
    Uniswap_V3: "uniswap-v3",
  },
  10: {
    Aave_V3: "aave-v3",
    Beethovenx: "beethovenx",
    Curve: "curve",
    Curve_V2: "curve-v2",
    MultiHop: "multi-hop",
    Synapse: "synapse",
    Synthetix: "synthetix",
    Uniswap_V3: "uniswap-v3",
    Velodrome: "velodrome",
    Velodrome_V2: "velodrome-v2",
    WOOFi: "woofi",
  },
  137: {
    "0x": "0x",
    Aave_V2: "aave-v2",
    Aave_V3: "aave-v3",
    ApeSwap: "apeswap",
    Balancer_V2: "balancer-v2",
    Curve: "curve",
    Curve_V2: "curve-v2",
    Dfyn: "dfyn",
    DODO: "dodo",
    DODO_V2: "dodo-v2",
    FirebirdOneSwap: "firebird-one-swap",
    IronSwap: "ironswap",
    KyberDMM: "kyber-dmm",
    KyberElastic: "kyber-elastic",
    MeshSwap: "meshswap",
    MultiHop: "multi-hop",
    QuickSwap: "quickswap",
    QuickSwap_V3: "quickswap-v3",
    SushiSwap: "sushiswap",
    Synapse: "synapse",
    Uniswap_V2: "uniswap-v2",
    Uniswap_V3: "uniswap-v3",
    WaultSwap: "waultswap",
    WOOFi: "woofi",
  },
  42161: {
    "0x": "0x",
    Aave_V3: "aave-v3",
    Balancer_V2: "balancer-v2",
    Camelot_V3: "camelot-v3",
    Curve_V2: "curve-v2",
    GMX: "gmx",
    MultiHop: "multi-hop",
    SushiSwap: "sushiswap",
    Synapse: "synapse",
    TraderJoe_V2_1: "traderjoe-v2-1",
    Uniswap_V2: "uniswap-v2",
    Uniswap_V3: "uniswap-v3",
    WOOFi: "woofi",
  },
  56: {
    ACryptoS: "acs",
    ApeSwap: "apeswap",
    BakerySwap: "bakeryswap",
    Belt: "belt",
    BiSwap: "biswap",
    DODO: "dodo",
    DODO_V2: "dodo-v2",
    Ellipsis: "ellipsis",
    FirebirdOneSwap: "firebird-one-swap",
    KnightSwap: "knightswap",
    KyberDMM: "kyber-dmm",
    MDex: "mdex",
    MultiHop: "multi-hop",
    Nerve: "nerve",
    PancakeSwap: "pancake",
    PancakeSwap_V2: "pancake-v2",
    PancakeSwap_V3: "pancake-v3",
    SushiSwap: "sushiswap",
    Synapse: "synapse",
    Uniswap_V2: "uniswap-v2",
    Uniswap_V3: "uniswap-v3",
    WaultSwap: "waultswap",
    WOOFi: "woofi",
  },
  8453: {
    Aerodrome: "aerodrome",
    Alienbase: "alienbase",
    Balancer_V2: "balancer-v2",
    BaseSwap: "baseswap",
    Maverick_V1: "maverick-v1",
    MultiHop: "multi-hop",
    SushiSwap: "sushiswap",
    SwapBased: "swapbased",
    Uniswap_V2: "uniswap-v2",
    Uniswap_V3: "uniswap-v3",
  },
};

export const chainToApi = {
  1: "https://api.0x.org/",
  56: "https://bsc.api.0x.org/",
  137: "https://polygon.api.0x.org/",
  10: "https://optimism.api.0x.org/",
  42161: "https://arbitrum.api.0x.org/",
  8453: "https://base.api.0x.org/",
};

export function constructQuery(chainId, includeProtocols, excludeProtocols) {
  const allDEXS = supportedProtocols[chainId];
  let includeDEXS = [];
  let excludeDEXS = [];

  if (includeProtocols) {
    const included = includeProtocols
      .split(",")
      .map((protocol) => protocol.trim());
    includeDEXS = Object.keys(allDEXS).filter((key) =>
      included.includes(allDEXS[key])
    );
    excludeDEXS = Object.keys(allDEXS).filter(
      (key) => !includeDEXS.includes(key)
    );
  } else if (excludeProtocols) {
    const excluded = excludeProtocols
      .split(",")
      .map((protocol) => protocol.trim());
    excludeDEXS = Object.keys(allDEXS).filter((key) =>
      excluded.includes(allDEXS[key])
    );
    includeDEXS = Object.keys(allDEXS).filter(
      (key) => !excludeDEXS.includes(key)
    );
  } else {
    includeDEXS = Object.keys(allDEXS);
  }

  return {
    includeDEXS: includeDEXS.join(","),
    excludeDEXS: excludeDEXS.join(","),
  };
}
