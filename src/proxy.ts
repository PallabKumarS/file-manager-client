import { NextResponse, type NextRequest } from "next/server";
import { getCurrentUser } from "./services/utils";

const authRoutes = ["/auth", "/forgot-password"];

const roleBasedPrivateRoutes = {
  ADMIN: [/^\/dashboard\/admin/],
  USER: [/^\/dashboard\/user/],
};

const sharedRoutes = [/^\/dashboard\/profile/, /^\/$/];

type Role = keyof typeof roleBasedPrivateRoutes;
export const proxy = async (request: NextRequest) => {
  const userInfo = await getCurrentUser();

  const { pathname } = request.nextUrl;

  //   If the user is authenticated and trying to access a private route, redirect to the after login page
  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/auth?redirectPath=${pathname}`, request.url),
      );
    }
  }

  //    Prevent logged in user from accessing auth routes
  if (userInfo && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If shared routes
  if (sharedRoutes.some((route) => pathname.match(route))) {
    return NextResponse.next();
  }

  // If the user is authenticated and trying to access a private route, redirect to the after login page
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/auth", "/forgot-password"],
};
