import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { BiLeftArrow } from "react-icons/bi";
import EditBlogForm from "~/app/_components/EditBlogForm";

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

const gettrpc = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/trpc");
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const page = async ({ params }: any) => {
  const trpc = await gettrpc();

  const { id } = params;
  const { blog } = await getBlogById(id);
  const { userId }: { userId: string | null } = auth();
  if (userId !== blog.userId) {
    return (
      <div className="mx-auto mt-8 max-w-md rounded-lg bg-white p-8 shadow-lg">
        <p className="mb-4 text-xl font-bold text-red-500">
          Oops! You are not allowed to edit this post.
        </p>
        <p className="mb-4 text-gray-700">
          It seems you don't have the necessary permissions to edit this post.
          Please check your account or contact the author for assistance.
        </p>
        <Link href="/">
          <BiLeftArrow className="mr-2 text-red-500" />
          Go Back to Home
        </Link>
      </div>
    );
  }
  const { title, description } = blog;
  return <EditBlogForm id={id} title={title} description={description} />;
};

export default page;
