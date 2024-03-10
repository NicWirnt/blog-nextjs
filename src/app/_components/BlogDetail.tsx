import Image from "next/image";
import React from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencil } from "react-icons/hi";
import { auth } from "@clerk/nextjs";

interface Blog {
  _id: string;
  title: string;
  description: string;
  createdBy: string;
  userId: string;
  thumbnail: string;
  image: string;
  createdAt: string;
}

interface BlogDetailProps {
  blog: Blog;
}
const BlogDetail: React.FC<BlogDetailProps> = ({ blog }) => {
  const { userId }: { userId: string | null } = auth();
  return (
    <div>
      <div className=" flex w-full flex-col items-center justify-start">
        <Image src={blog.image} alt={blog.title} width={400} height={400} />
        <div className="flex flex-col justify-center gap-8">
          <h1 className="text-[40px] font-bold leading-[48px] lg:text-[48px] lg:leading-[60px]  xl:text-[58px] xl:leading-[74px]">
            {blog.title}
          </h1>
        </div>
      </div>
      <div className="w-full max-w-7xl p-5 md:px-10 lg:mx-auto xl:px-0">
        <div className="m-10">
          <p>{blog.description}</p>
          <div className=" flex flex-row items-center gap-4">
            <Link href={`/editBlog/${blog._id}`}>
              <HiPencil />
            </Link>
            {userId === blog.userId && <RemoveBtn id={blog._id} />}
          </div>
        </div>

        <div className="flex items-center justify-center text-xs">
          <span className="text-gray-500">Created by {blog.createdBy}</span>
          <span className="text-gray-500">&bull;</span>
          <span className="text-gray-500">
            Created at {new Date(blog.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
