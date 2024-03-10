import React from "react";
import BlogDetail from "~/app/_components/BlogDetail";
import { api } from "~/trpc/server";

const fetchPost = async (id: string) => {
  try {
    const getPostById = await api.blog.getBlogById.query({ id });

    return getPostById;
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }: any) => {
  const { id } = params;
  const blog = await fetchPost(id);

  return (
    <div>
      <BlogDetail blog={blog} />
    </div>
  );
};

export default page;
