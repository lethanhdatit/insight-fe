import CryptoJS from "crypto-js";

export async function apiCall(
  url: string,
  method: string,
  body: any,
  shouldEncrypt: boolean = true
) {
  if (body) body = JSON.stringify(body);

  if (shouldEncrypt && body) {
    body = CryptoJS.AES.encrypt(body, process.env.NEXT_PUBLIC_API_AES_SECRET!).toString();
  }

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();

    if (data && data.encrypted) {
      const bytes = CryptoJS.AES.decrypt(data.encrypted, process.env.NEXT_PUBLIC_API_AES_SECRET!);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
