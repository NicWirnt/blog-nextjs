import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import Blog, { IBlog, TBlog } from "~/app/models/blog.schema";
import dbConnect from "~/app/libs/mongodb";
import { z } from "zod";

const db = dbConnect();

export const blogRouter = createTRPCRouter({
  getBlogs: publicProcedure.query(async () => {
    try {
      const post: TBlog = await Blog.find();

      return post;
    } catch (error) {
      console.log(error);
    }
  }),
  postBlog: publicProcedure
    // .input((v) => {
    //   const schema = z.object({
    //     title: z.string(),
    //     description: z.string(),
    //   });
    //   const result = schema.safeParse(v);
    //   if (!result.success) {
    //     throw result.error;
    //   }
    //   return result.data;
    // })
    .mutation(async (params) => {
      try {
        const { title, description, createdBy, userId, thumbnail, image } =
          params.rawInput.input;

        const post: TBlog = await Blog.create({
          title,
          description,
          createdBy,
          userId,
          thumbnail,
          image,
        });

        return {
          status: "Success",
          message: "Post successfully added",
        };
      } catch (error) {
        console.log(error);
      }
    }),
  getBlogById: publicProcedure.query(async () => {
    try {
    } catch (error) {}
  }),
});
