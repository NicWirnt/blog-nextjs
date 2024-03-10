import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook/clerk",
    "/api/uploadthing",
    "/blogs/:id",
    "/api/blogs",
    "/api/blogs/:id",
    "/api/posts/:id",
    "/posts/:id",
    "/api/trpc/blog",
    "/api/trpc/blog/getBlogs",
    "/api/trpc/blog/postblog",
  ],
  ignoredRoutes: [
    "/api/webhook/clerk",
    "/api/uploadthing",
    "/api/blogs",
    "/api/blogs/:id",
    "/api/posts/:id",
    "posts/:id",
    "/api/trpc/blog",
    "/api/trpc/blog/getBlogs",
    "/api/trpc/blog/postblog",
  ],
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
