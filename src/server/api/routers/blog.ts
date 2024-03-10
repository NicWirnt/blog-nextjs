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
    .input(() => {
      z.object({
        title: z.string(),
        description: z.string(),
        userId: z.string(),
        createdBy: z.string(),
        image: z.string(),
      });
    })
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
          status: "success",
          message: "Post successfully added",
        };
      } catch (error) {
        console.log(error);
      }
    }),
  getBlogById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const { id } = input;

        const post: TBlog = await Blog.findById(id);
        return post;
      } catch (error) {
        console.log(error);
      }
    }),
  deletePost: publicProcedure
    .input(() => {
      z.object({ _id: z.string() });
    })
    .mutation(async (opts) => {
      const { _id } = opts.rawInput.input;
      const res = await Blog.findByIdAndDelete(_id);
      console.log(res);
      if (res) {
        return {
          status: "success",
          message: "post sucessfully deleted",
        };
      }
    }),
  updatePost: publicProcedure
    .input(() =>
      z.object({
        id: z.string(),
        newTitle: z.string(),
        newDescription: z.string(),
      }),
    )
    .mutation(async (input) => {
      try {
        const {
          newTitle: title,
          newDescription: description,
          id,
        } = input.rawInput.input;
        const res = await Blog.findByIdAndUpdate(id, { title, description });
        if (res) {
          return {
            status: "success",
            message: "post successfully updated",
          };
        }
      } catch (error) {
        console.log(error);
      }
    }),
});
