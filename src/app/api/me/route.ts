import { UiUser } from "@/src/types/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface Payload {
  user: UiUser;
}

function decodeJwtPayload(token: string): Payload | null {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;

    const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    const json = Buffer.from(base64, "base64").toString("utf8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function GET() {
  const token = (await cookies()).get("token")?.value ?? null;
  if (!token) return NextResponse.json({ user: null }, { status: 200 });

  const payload = decodeJwtPayload(token);
  const user: UiUser | null = payload?.user ?? null;

  return NextResponse.json({ user }, { status: 200 });
}
