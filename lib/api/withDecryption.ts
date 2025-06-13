// lib/api/withDecryption.ts
import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";

type Handler<T = any> = (
  data: T | undefined,
  req: NextRequest
) => Promise<NextResponse> | NextResponse;

export function withDecryption<T = any>(
  handler: Handler<T>,
  options?: { secret?: string }
) {
  return async function (req: NextRequest): Promise<NextResponse> {
    try {
      const secret = options?.secret || process.env.NEXT_PUBLIC_API_AES_SECRET!;
      const encrypted = await req.text();
      if (!encrypted){
        return await handler(undefined, req);
      }

      const bytes = CryptoJS.AES.decrypt(encrypted, secret);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) throw new Error("Decryption failed");

      const parsed = JSON.parse(decryptedText);
      return await handler(parsed, req);
    } catch (err) {
      return NextResponse.json(
        {
          error: "Failed to decode or decrypt request body",
          details: err instanceof Error ? err.message : err,
        },
        { status: 400 }
      );
    }
  };
}
