import Link from "next/link";
import React from "react";
import { HiDocumentRemove, HiPencil } from "react-icons/hi";

import RemoveBtn from "./RemoveBtn";
import { auth } from "@clerk/nextjs";
import Image from "next/image";

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

interface BlogCardProps {
  posts: iBlog[] | void;
}

const BlogCard = async ({ posts }: any) => {
  const { userId }: { userId: string | null } = auth();

  // const { result: blogs } = await getBlogs();
  const blogs = posts;
  return (
    <>
      {blogs.length > 0 ? (
        blogs.map((blog: iBlog) => (
          <div className=" space-y-6 lg:px-2" key={blog._id.toString()}>
            <div className="w-full rounded-xl border bg-neutral-200 p-4 shadow-md">
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
                    <Link href={`/posts/${blog._id}`}>
                      <p className="rounded-mdpx-3 mt-2 w-fit py-1  text-xs text-blue-500">
                        View More
                      </p>
                    </Link>
                  </div>
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
          </div>
        ))
      ) : (
        <div>No Posts available</div>
      )}
    </>
  );
};

export default BlogCard;
