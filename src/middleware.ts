import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "ADMIN";
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Only require auth for checkout and profile routes
        const isCheckoutRoute = req.nextUrl.pathname.startsWith("/checkout");
        const isProfileRoute = req.nextUrl.pathname.startsWith("/profile");
        const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

        if (isCheckoutRoute || isProfileRoute || isAdminRoute) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/checkout/:path*"],
}; 