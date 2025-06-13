import { type NextRequest, NextResponse } from "next/server";
import { withDecryption } from "@/lib/api/withDecryption";
import { getSession } from "@/lib/server";
import { encryptResponse } from "@/lib/api/encryptResponse";

export const POST = withDecryption(async (body, req: NextRequest) => {
  try {
    const session = await getSession();
    const accessToken = session.accessToken;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/LuckyNumber/theology`,
      {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) 
      throw new Error(data[0].description);

    const secret = process.env.NEXT_PUBLIC_API_AES_SECRET!;
    return encryptResponse(data.data, secret);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch theology data" },
      { status: 500 }
    );
  }
});

export const GET = withDecryption(async (_body, req: NextRequest) => {
  try {
    const session = await getSession();
    const accessToken = session.accessToken;
    const id = req.nextUrl.searchParams.get("id");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/LuckyNumber/theology/${id}`,
      {
        method: "GET",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const secret = process.env.NEXT_PUBLIC_API_AES_SECRET!;
    return encryptResponse(data.data, secret);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch theology data" },
      { status: 500 }
    );
  }
});
