import { authMiddleware } from "@clerk/nextjs/server";
const publicPaths = ["/", "/sign-in", "/sign-up", "/api/watchlist/(.*)"];

export default authMiddleware({
  ignoredRoutes: [],
  publicRoutes: publicPaths,
});

export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
