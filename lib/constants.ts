import { docAbi } from "@/assets/abis/doc";
import { rifAbi } from "@/assets/abis/rif";
import { usdrifAbi } from "@/assets/abis/usdrif";

export const RIF_CONTRACT_ADDRESS =
  "0x19f64674D8a5b4e652319F5e239EFd3bc969a1FE";

// all of these
export const TOKENS = {
  trif: {
    address: "0x19F64674D8A5B4E652319F5e239eFd3bc969A1fE",
    abi: rifAbi,
  },
  doc: {
    address: "0xCB46c0ddc60D18eFEB0E586C17Af6ea36452Dae0",
    abi: docAbi,
  },
  usdrif: {
    address: "0x8dbf326e12a9fF37ED6DDF75adA548C2640A6482",
    abi: usdrifAbi,
  },
};
