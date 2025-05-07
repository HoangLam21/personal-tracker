// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await auth();

  // Chỉ bảo vệ các path cụ thể
  const protectedRoutes = [ "/settings", "/admin"];

  const isProtected = protectedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isProtected && !session?.user) {
    return NextResponse.redirect(new URL("sign-in", req.url));
  }

  return NextResponse.next();
}

// cấu hình matcher
export const config = {
  matcher: [ "/settings/:path*", "/admin/:path*"],
};
