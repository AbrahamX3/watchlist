import { authMiddleware } from "@clerk/nextjs";

const publicPaths = ["/", "/api/watchlist/(.*)", "/icon.png", "/manifest.json"];

export default authMiddleware({
  ignoredRoutes: [],
  publicRoutes: publicPaths,
  debug: true,
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/dashboard",
    "/(api|trpc)(.*)",
    "/dashboard",
  ],
};
