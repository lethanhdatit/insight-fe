import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/server";
import { withDecryption } from "@/lib/api/withDecryption";
import { encryptResponse } from "@/lib/api/encryptResponse";

export const POST = withDecryption(async (body, req: NextRequest) => {
  let session = await getSession();
  const accessToken = session.accessToken;

  if (process.env.NODE_ENV !== "production")
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const userAgent = req.headers.get("user-agent");
  const referer = req.headers.get("referer");
  const origin = req.headers.get("origin");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/account/init`,
    {
      method: "POST",
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(userAgent ? { "user-agent": userAgent } : {}),
        ...(referer ? { referer } : {}),
        ...(origin ? { origin } : {}),
      },
    }
  );

  const data = (await res.json()).data;

  if (!res.ok)
    return NextResponse.json({ error: data[0].description }, { status: 500 });

  session.accessToken = data.token;
  session.username = data.username;
  session.isGuest = data.isGuest;

  await session.save();

  const secret = process.env.NEXT_PUBLIC_API_AES_SECRET!;
  return encryptResponse(session, secret);
});
