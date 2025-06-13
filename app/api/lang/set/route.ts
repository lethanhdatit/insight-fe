import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/server";

export const POST = async (req: NextRequest) => {
  let lang = "vi";
  let callbackUrl = "/";
  if (req.headers.get("content-type")?.includes("application/json")) {
    const body = await req.json();
    lang = body.lang || "vi";
    callbackUrl = body.callbackUrl || "/";
  } else {
    const formData = await req.formData();
    lang = formData.get("lang")?.toString() || "vi";
    callbackUrl = formData.get("callbackUrl")?.toString() || "/";
  }
  const session = await getSession();
  session.lang = lang;
  await session.save();
  
  return NextResponse.json({ success: true });
};