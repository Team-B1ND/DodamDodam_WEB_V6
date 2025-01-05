export const decryptData = async (
    key: CryptoKey,
    encryptedData: ArrayBuffer,
    iv: Uint8Array
  ): Promise<string> => {
    const decoder = new TextDecoder();
  
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      encryptedData
    );
  
    return decoder.decode(decryptedData);
  };
  