import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/server";

export const POST = async (req: NextRequest) => {
  const session = await getSession();

  const response = NextResponse.json(session);

  await session.destroy();

  return response;
};