export const chainToId = {
  1: "ethereum",
  56: "bsc",
  137: "polygon",
  10: "optimism",
  42161: "arbitrum",
  8453: "base",
};

export const supportedProtocols = {
  1: {
    "balancer-v1": "balancer-v1",
    "balancer-v2-composable-stable": "balancer-v2-composable-stable",
    "balancer-v2-stable": "balancer-v2-stable",
    "balancer-v2-weighted": "balancer-v2-weighted",
    "bancor-v3": "bancor-v3",
    blueprint: "blueprint",
    "crowdswap-v2": "crowdswap-v2",
    curve: "curve",
    "curve-stable-ng": "curve-stable-ng",
    "curve-stable-plain": "curve-stable-plain",
    defiswap: "defiswap",
    dodo: "dodo",
    "ethena-susde": "ethena-susde",
    "etherfi-eeth": "etherfi-eeth",
    "etherfi-weeth": "etherfi-weeth",
    fraxswap: "fraxswap",
    "gyroscope-2clp": "gyroscope-2clp",
    "gyroscope-3clp": "gyroscope-3clp",
    "gyroscope-eclp": "gyroscope-eclp",
    "kelp-rseth": "kelp-rseth",
    lido: "lido",
    "lido-steth": "lido-steth",
    "maker-psm": "maker-psm",
    "maker-savingsdai": "maker-savingsdai",
    "maverick-v1": "maverick-v1",
    pancake: "pancakeswap-v2",
    "pancake-v3": "pancakeswap-v3",
    "pol-matic": "pol-matic",
    "rocketpool-reth": "rocketpool-reth",
    shibaswap: "shibaswap",
    smardex: "smardex",
    "solidly-v3": "solidly-v3",
    sushiswap: "sushiswap",
    "sushiswap-v3": "sushiswap-v3",
    synapse: "synapse",
    "traderjoe-v21": "traderjoe-v21",
    uniswap: "uniswap",
    uniswapv3: "uniswap-v3",
    verse: "verse",
    wagmi: "wagmi",
    wombat: "wombat",
    kyberswap: "kyberswap",
    "kyberswap-static": "kyberswap-static",
    "kyberswap-limit-order": "kyberswap-limit-order",
    "kyberswap-limit-order-v2": "kyberswap-limit-order-v2",
    "kyber-pmm": "kyber-pmm",
  },
  42161: {
    "arbi-dex": "arbi-dex",
    "arbidex-v3": "arbidex-v3",
    "arbswap-amm": "arbswap-amm",
    "balancer-v2-composable-stable": "balancer-v2-composable-stable",
    "balancer-v2-stable": "balancer-v2-stable",
    "balancer-v2-weighted": "balancer-v2-weighted",
    camelot: "camelot",
    "camelot-v3": "camelot-v3",
    chronos: "chronos",
    "chronos-v3": "chronos-v3",
    "crowdswap-v2": "crowdswap-v2",
    curve: "curve",
    "curve-stable-ng": "curve-stable-ng",
    "curve-stable-plain": "curve-stable-plain",
    dodo: "dodo",
    fraxswap: "fraxswap",
    gmx: "gmx",
    "gyroscope-2clp": "gyroscope-2clp",
    "gyroscope-3clp": "gyroscope-3clp",
    "gyroscope-eclp": "gyroscope-eclp",
    horiza: "horiza",
    iziswap: "iziswap",
    mmf: "mmf",
    "mmf-v3": "mmf-v3",
    "mummy-finance": "mummy-finance",
    pancake: "pancakeswap-v2",
    "pancake-v3": "pancakeswap-v3",
    ramses: "ramses",
    "ramses-v2": "ramses-v2",
    smardex: "smardex",
    "solidly-v3": "solidly-v3",
    "sparta-dex": "sparta-dex",
    sushiswap: "sushiswap",
    "sushiswap-v3": "sushiswap-v3",
    swapr: "swapr",
    synapse: "synapse",
    "traderjoe-v20": "traderjoe-v20",
    "traderjoe-v21": "traderjoe-v21",
    uniswap: "uniswap",
    uniswapv3: "uniswap-v3",
    wombat: "wombat",
    "zyberswap-v3": "zyberswap-v3",
    "kyberswap-limit-order": "kyberswap-limit-order",
    "kyberswap-limit-order-v2": "kyberswap-limit-order-v2",
    "kyberswap-static": "kyberswap-static",
  },
  10: {
    "balancer-v2-composable-stable": "balancer-v2-composable-stable",
    "balancer-v2-stable": "balancer-v2-stable",
    "balancer-v2-weighted": "balancer-v2-weighted",
    curve: "curve",
    "curve-stable-ng": "curve-stable-ng",
    "curve-stable-plain": "curve-stable-plain",
    fraxswap: "fraxswap",
    fxdx: "fxdx",
    "gyroscope-2clp": "gyroscope-2clp",
    "gyroscope-3clp": "gyroscope-3clp",
    "gyroscope-eclp": "gyroscope-eclp",
    iziswap: "iziswap",
    "mummy-finance": "mummy-finance",
    opx: "opx",
    "solidly-v3": "solidly-v3",
    "sushiswap-v3": "sushiswap-v3",
    synapse: "synapse",
    uniswap: "uniswap",
    uniswapv3: "uniswap-v3",
    velodrome: "velodrome",
    "velodrome-v2": "velodrome-v2",
    wombat: "wombat",
    zipswap: "zipswap",
    "zyberswap-v3": "zyberswap-v3",
    "kyberswap-limit-order": "kyberswap-limit-order",
    "kyberswap-limit-order-v2": "kyberswap-limit-order-v2",
    "kyberswap-static": "kyberswap-static",
  },
  56: {
    apeswap: "apeswap",
    biswap: "biswap",
    "crowdswap-v2": "crowdswap-v2",
    dodo: "dodo",
    ellipsis: "ellipsis",
    fraxswap: "fraxswap",
    iziswap: "iziswap",
    jetswap: "jetswap",
    "maverick-v1": "maverick-v1",
    mdex: "mdex",
    nerve: "nerve",
    nomiswap: "nomiswap",
    oneswap: "oneswap",
    pancake: "pancakeswap-v2",
    "pancake-legacy": "pancakeswap-legacy",
    "pancake-stable": "pancakeswap-stable",
    "pancake-v3": "pancakeswap-v3",
    pantherswap: "pantherswap",
    smardex: "smardex",
    sushiswap: "sushiswap",
    "sushiswap-v3": "sushiswap-v3",
    synapse: "synapse",
    thena: "thena",
    "thena-fusion": "thena-fusion",
    "traderjoe-v21": "traderjoe-v21",
    uniswap: "uniswap",
    uniswapv3: "uniswap-v3",
    usdfi: "usdfi",
    wault: "wault",
    wombat: "wombat",
    "kyberswap-limit-order": "kyberswap-limit-order",
    "kyberswap-limit-order-v2": "kyberswap-limit-order-v2",
    "kyberswap-static": "kyberswap-static",
  },
  8453: {
    aerodrome: "aerodrome",
    "alien-base": "alien-base",
    "alien-base-stableswap": "alien-base-stableswap",
    "balancer-v2-composable-stable": "balancer-v2-composable-stable",
    "balancer-v2-stable": "balancer-v2-stable",
    "balancer-v2-weighted": "balancer-v2-weighted",
    baldex: "baldex",
    baseswap: "baseswap",
    "baseswap-v3": "baseswap-v3",
    baso: "baso",
    bmx: "bmx",
    "bmx-glp": "bmx-glp",
    bvm: "bvm",
    curve: "curve",
    "curve-stable-ng": "curve-stable-ng",
    "curve-stable-plain": "curve-stable-plain",
    "dackie-v2": "dackie-v2",
    "dackie-v3": "dackie-v3",
    fxdx: "fxdx",
    "horizon-dex": "horizon-dex",
    iziswap: "iziswap",
    "kokonut-cpmm": "kokonut-cpmm",
    "kokonut-crypto": "kokonut-crypto",
    "maverick-v1": "maverick-v1",
    moonbase: "moonbase",
    "mummy-finance": "mummy-finance",
    pancake: "pancakeswap-v2",
    "pancake-v3": "pancakeswap-v3",
    "rocketswap-v2": "rocketswap-v2",
    scale: "scale",
    smardex: "smardex",
    "solidly-v3": "solidly-v3",
    sushiswap: "sushiswap",
    "sushiswap-v3": "sushiswap-v3",
    swapbased: "swapbased",
    "swapbased-perp": "swapbased-perp",
    "swapbased-v3": "swapbased-v3",
    synapse: "synapse",
    synthswap: "synthswap",
    "synthswap-perp": "synthswap-perp",
    "synthswap-v3": "synthswap-v3",
    uniswap: "uniswap",
    uniswapv3: "uniswap-v3",
    vodoo: "vodoo",
    wombat: "wombat",
    "kyberswap-limit-order-v2": "kyberswap-limit-order-v2",
    "kyberswap-limit-order": "kyberswap-limit-order",
  },
  137: {
    apeswap: "apeswap",
    "balancer-v2-composable-stable": "balancer-v2-composable-stable",
    "balancer-v2-stable": "balancer-v2-stable",
    "balancer-v2-weighted": "balancer-v2-weighted",
    cometh: "cometh",
    "crowdswap-v2": "crowdswap-v2",
    curve: "curve",
    "curve-stable-ng": "curve-stable-ng",
    "curve-stable-plain": "curve-stable-plain",
    dfyn: "dfyn",
    dinoswap: "dinoswap",
    dodo: "dodo",
    dystopia: "dystopia",
    fraxswap: "fraxswap",
    gravity: "gravity",
    "gyroscope-2clp": "gyroscope-2clp",
    "gyroscope-3clp": "gyroscope-3clp",
    "gyroscope-eclp": "gyroscope-eclp",
    "iron-stable": "iron-stable",
    iziswap: "iziswap",
    jetswap: "jetswap",
    madmex: "madmex",
    mantisswap: "mantisswap",
    metavault: "metavault",
    mmf: "mmf",
    oneswap: "oneswap",
    pearl: "pearl",
    "pearl-v2": "pearl-v2",
    polycat: "polycat",
    polydex: "polydex",
    quickswap: "quickswap",
    "quickswap-v3": "quickswap-v3",
    retro: "retro",
    "retro-v3": "retro-v3",
    smardex: "smardex",
    sushiswap: "sushiswap",
    "sushiswap-v3": "sushiswap-v3",
    synapse: "synapse",
    uniswap: "uniswap",
    uniswapv3: "uniswap-v3",
    wault: "wault",
    wombat: "wombat",
    kyberswap: "kyberswap",
    "kyberswap-static": "kyberswap-static",
    "kyberswap-limit-order-v2": "kyberswap-limit-order-v2",
    "kyberswap-limit-order": "kyberswap-limit-order",
  },
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
