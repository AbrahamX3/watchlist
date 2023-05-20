import { authMiddleware } from "@clerk/nextjs/server";
const publicPaths = [
  "/",
  "/sign-in",
  "/sign-up",
  "/api/watchlist/(.*)",
  "/icon.png",
];

export default authMiddleware({
  ignoredRoutes: ["/icon.png"],
  publicRoutes: publicPaths,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
