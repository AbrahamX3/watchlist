import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/watchlist/(.*)",
    "/images/icon.png",
    "/manifest.json",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/dashboard", "/(api|trpc)(.*)"],
};
