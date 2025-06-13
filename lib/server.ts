"use server";

import { UserSession, sessionOptions } from "@/lib/sessionOptions";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function getSession() {
  return getIronSession<UserSession>(await cookies(), sessionOptions);
}

export const POST = async (req: NextRequest) => {
  const { lang } = await req.json();
  const session = await getSession();
  session.lang = lang;
  await session.save();
  return NextResponse.json({ success: true });
};

export async function getLangFromSession() {
  const session = await getSession();
  let lang = undefined;

  if (session) {
    try {
      if (session.lang) lang = session.lang;
    } catch {}
  }
  return lang;
}
