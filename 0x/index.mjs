import { createAdapter } from "../common/adapterTemplate.mjs";
import * as quoteFunctions from "./quote/index.mjs";
import * as swapFunctions from "./swap/index.mjs";

const adapter = createAdapter("0x", quoteFunctions, swapFunctions);

export default adapter;
