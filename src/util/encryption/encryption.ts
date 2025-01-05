export const encryptData = async (
    key: CryptoKey,
    data: string
  ): Promise<{ iv: Uint8Array; encryptedData: ArrayBuffer }> => {
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12)); 
    const encodedData = encoder.encode(data);
  
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      encodedData
    );
  
    return { iv, encryptedData };
  };
  