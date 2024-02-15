import NextAuth from "next-auth";

import {
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  apiWebhookPrefix,
  adminRoutes,
} from "@/routes";
/**
 * This way of configuring the next auth is because Prisma does not support Edge
 */
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiWebhookRoute = nextUrl.pathname.startsWith(apiWebhookPrefix);

  if (isApiAuthRoute || isApiWebhookRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      //if (isAdminRoute && req.auth?.user.role === "ADMIN") return null;

      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/", nextUrl));
  }

  return null;
});

/**
 * This will decide which files will invoke the middleware
 * With this particular regex it will invoke for all files and routes expect for some nextjs specific files
 */
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
