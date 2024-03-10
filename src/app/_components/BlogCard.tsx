import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiDocumentRemove, HiPencil } from "react-icons/hi";

import RemoveBtn from "./RemoveBtn";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "~/trpc/server";

interface iBlog {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  thumbnail: string;
  image: string;
  userId: string;
  createdAt: string;
}

// const getBlogs = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/blogs", {
//       cache: "no-store",
//     });
//     // console.log(res);

//     return res.json();
//   } catch (error) {
//     console.log("Error loading BLogs", error);
//   }
// };

const res = await api.blog.getBlogs.query();

const BlogCard = async () => {
  const { userId }: { userId: string | null } = auth();

  // const { result: blogs } = await getBlogs();
  const blogs = res;
  return (
    <div className="space-y-6 ">
      {blogs.length > 0 ? (
        blogs.map((blog: iBlog) => (
          <div
            className="rounded-xl border bg-white p-4 shadow-md"
            key={blog._id.toString()}
          >
            <div className="flex items-start gap-4">
              {blog.image && (
                <div className="flex-shrink-0">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={100}
                    height={100}
                  />
                </div>
              )}
              <div className="flex-grow">
                <h2 className="text-xl font-bold">{blog.title}</h2>
                <div className="text-gray-600">
                  {blog.description &&
                    (blog.description.length > 50
                      ? `${blog.description.substring(0, 50)}...`
                      : blog.description)}
                </div>
                <Link href={`/posts/${blog._id}`}>
                  <button className="mt-2 rounded-md bg-blue-500 px-3 py-1 text-sm text-white">
                    View More
                  </button>
                </Link>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {userId === blog.userId && (
                  <RemoveBtn id={blog._id.toString()} />
                )}
                <Link href={`/editBlog/${blog._id}`}>
                  <HiPencil />
                </Link>
              </div>
              <div className="text-xs text-gray-500">
                <p>Created by: {blog.createdBy}</p>
                <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No Posts available</div>
      )}
    </div>
  );
};

export default BlogCard;
