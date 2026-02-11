import { UiUser } from "@/src/types/types";
import { decodeJwtPayload } from "@/src/utilities/token/decodeJwtPayload";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("token")?.value ?? null;
  if (!token) return NextResponse.json({ user: null }, { status: 200 });

  const payload = decodeJwtPayload(token);
  const user: UiUser | null = payload?.user ?? null;

  return NextResponse.json({ user }, { status: 200 });
}
