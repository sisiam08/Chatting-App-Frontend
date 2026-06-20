import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "./interfaces";
import { getUserInfo } from "./services/userInfo.service";

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const userInfo = await getUserInfo();
  if (!userInfo) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = userInfo.role as UserRole;

  const roleRoutes = {
    [UserRole.ADMIN]: "/admin-dashboard",
    [UserRole.USER]: "/dashboard",
  };

  const allowedBasePath = roleRoutes[userRole];

  if (!pathName.startsWith(allowedBasePath)) {
    return NextResponse.redirect(new URL(allowedBasePath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
