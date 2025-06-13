import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/server";

export const POST = async (req: NextRequest) => {
  const { username, password } = await req.json();

  const session = await getSession();
  const accessToken = session.accessToken;

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/account/register`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json" ,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
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