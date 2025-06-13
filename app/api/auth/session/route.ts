import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/server";
import { withDecryption } from "@/lib/api/withDecryption";
import { encryptResponse } from "@/lib/api/encryptResponse";

export const POST = withDecryption(async (body, req: NextRequest) => {
  let session = await getSession();
  const accessToken = session.accessToken;

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/account/init`, {
    method: "POST",
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  const data = (await res.json()).data;

  if (!res.ok) 
    return NextResponse.json({ error: data[0].description }, { status: 500 });

  session.accessToken = data.token;
  session.username = data.username;
  session.isGuest = data.isGuest;

  const secret = process.env.NEXT_PUBLIC_API_AES_SECRET!;
  return encryptResponse(session, secret);
});