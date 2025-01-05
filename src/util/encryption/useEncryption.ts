import { useRecoilState } from "recoil";
import { cryptoKey } from "@src/store/key/cryptoKey";
import { generateKey } from "./keyGeneration";
import { encryptData } from "./encryption";
import { decryptData } from "./decryption";
import { LOGIN_IV, LOGIN_DATA } from "@src/constants/crypto/crypto.constants";
import { Login } from "@src/types/login/login.type";
import authRepository from "@src/repository/auth/auth.repository";
import token from "@src/lib/token/token";
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@src/constants/token/token.constant";
import { useEffect } from "react";
import cookie from "@src/lib/cookie/cookie";

export const useEncryption = () => {
  const [key, setKey] = useRecoilState(cryptoKey);

  // 초기화 시 키를 생성하고 설정
  useEffect(() => {
    const initializeKey = async () => {
      const generatedKey = await generateKey();
      setKey(generatedKey);
    };

    if (!key) {
      initializeKey();
    }
  }, [key, setKey]);

  const saveEncryptedLoginInfo = async (loginInfo: Login) => {
    if (!key) {
      throw new Error("Encryption key is not initialized");
    }

    const { iv, encryptedData } = await encryptData(key, JSON.stringify(loginInfo));

    const ivBase64 = btoa(String.fromCharCode(...new Uint8Array(iv)));
    const encryptedDataBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));

    cookie.setCookie(LOGIN_IV, ivBase64);
    cookie.setCookie(LOGIN_DATA, encryptedDataBase64);

    return key;
  };

  const getDecryptedLoginInfo = async () => {
    if (!key) {
      throw new Error("Decryption key is not initialized");
    }

    const ivBase64 = cookie.getCookie(LOGIN_IV);
    const encryptedDataBase64 = cookie.getCookie(LOGIN_DATA);

    if (!ivBase64 || !encryptedDataBase64) {
      return null;
    }

    const iv = Uint8Array.from(atob(ivBase64), (c) => c.charCodeAt(0));
    const encryptedData = Uint8Array.from(atob(encryptedDataBase64), (c) => c.charCodeAt(0)).buffer;

    const decryptedData = await decryptData(key, encryptedData, iv);
    const loginParam: Login = JSON.parse(decryptedData);

    try {
      const { data } = await authRepository.login(loginParam);

      token.setToken(ACCESS_TOKEN_KEY, data.accessToken);
      token.setToken(REFRESH_TOKEN_KEY, data.refreshToken);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return { saveEncryptedLoginInfo, getDecryptedLoginInfo };
};
