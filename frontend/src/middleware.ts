import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  if (
    token && (pathname === "/" ||
    pathname === "/login" ||
    pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

// matcher
export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
