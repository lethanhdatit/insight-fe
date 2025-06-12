import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/server";

export const POST = async (req: NextRequest) => {
  let session = await getSession();
  const accessToken = session.accessToken;

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const res = await fetch("https://api.insight.ai.vn/api/account/init", {
    method: "POST",
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  const data = (await res.json()).data;

  if (!res.ok) return NextResponse.json({ error: data[0].description }, { status: 500 });

  session.accessToken = data.token;
  session.username = data.username;
  session.isGuest = data.isGuest;

  const response = NextResponse.json(session);

  await session.save();

  return response;
};