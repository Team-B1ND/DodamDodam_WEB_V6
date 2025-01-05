import { atom } from "recoil";

export const cryptoKey = atom<CryptoKey | null>({
  key: "cryptoKey",
  default: null,
});