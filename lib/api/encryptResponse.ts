import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";

export function encryptResponse(data: any, secret: string) {
  const json = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(json, secret).toString();
  return NextResponse.json({ encrypted });
}