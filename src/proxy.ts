import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const authPages = ["/authentication", "/login"];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  const isAuthPage = authPages.includes(request.nextUrl.pathname);

  if (!!token && isAuthPage) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/authentication",
    "/login",
    "/create",
    "/myAccount",
    "/mySnippets",
  ],
};
