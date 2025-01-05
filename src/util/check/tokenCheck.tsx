import { LOGIN_IV, LOGIN_DATA } from "@src/constants/crypto/crypto.constants";
import cookie from "@src/lib/cookie/cookie";
import token from "@src/lib/token/token";
import {
    ACCESS_TOKEN_KEY,
    REFRESH_TOKEN_KEY,
    REQUEST_TOKEN_KEY,
  } from "@src/constants/token/token.constant";
import { useEncryption } from "../encryption/useEncryption";

interface ProvidersProps {
    children: React.ReactNode;
  }

 const TokenCheck =({ children }: ProvidersProps)=>{
    const {getDecryptedLoginInfo} = useEncryption();
    const LoginKey = cookie.getCookie(LOGIN_IV);
    const LoginData = cookie.getCookie(LOGIN_DATA);
    const usingRefreshToken = token.getToken(ACCESS_TOKEN_KEY);
    if(usingRefreshToken === undefined && LoginKey !== undefined && LoginData!== undefined ){
        getDecryptedLoginInfo();
    }
    return <>{children}</>;
}

export default TokenCheck