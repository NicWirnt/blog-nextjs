import React from "react";
import BlogDetail from "~/app/_components/BlogDetail";

const getBlogById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      new Error("Failed to fetch BLogs");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }: any) => {
  const { id } = params;
  const { blog } = await getBlogById(id);

  return (
    <div>
      <BlogDetail blog={blog} />
    </div>
  );
};

export default page;
