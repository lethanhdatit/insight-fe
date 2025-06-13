import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/server";

export const POST = async (req: NextRequest) => {
  const { username, password } = await req.json();

  const session = await getSession();
  const accessToken = session.accessToken;

  if(process.env.NODE_ENV !== 'production')
     process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const userAgent = req.headers.get("user-agent");
  const referer = req.headers.get("referer");
  const origin = req.headers.get("origin");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/account/register`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json" ,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        ...(userAgent ? { "user-agent": userAgent } : {}),
        ...(referer ? { referer } : {}),
        ...(origin ? { origin } : {}),
    },
    body: JSON.stringify({ username, password }),
  });  
  
  const data = (await res.json()).data;

  if (!res.ok) return NextResponse.json({ error: data[0].description }, { status: 400 });

  session.accessToken = data.token;
  session.username = data.username;
  session.isGuest = data.isGuest;

  const response = NextResponse.json(session);

  await session.save();

  return response;
};