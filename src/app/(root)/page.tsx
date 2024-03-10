import Image from "next/image";
import Link from "next/link";
import React from "react";
import BlogCard from "../_components/BlogCard";
import { unstable_noStore as noStore } from "next/cache";
import { api } from "~/trpc/server";
import TestInput from "../_components/TestInput";
const page = async () => {
  noStore();
  //   const hello = await api.post.hello.query({ text: "testing" });

  return (
    <>
      <div className="grid w-full max-w-7xl grid-cols-1 gap-5 p-5 md:grid-cols-2 md:px-10 lg:mx-auto xl:px-0 2xl:gap-0">
        <div className="flex flex-col justify-center gap-8">
          <h1 className="text-[40px] font-bold leading-[48px] lg:text-[48px] lg:leading-[60px]  xl:text-[58px] xl:leading-[74px]">
            Blogger : Write, Read, Connect Welcome
          </h1>
          <button className="rounded-xl bg-blue-700 p-2 text-white sm:w-fit">
            <Link href="#post">View Blog</Link>
          </button>
        </div>
        <Image
          src="/assets/images/hero.png"
          alt="hero"
          width={1000}
          height={1000}
        />
      </div>
      <section className="rounded-xl bg-gray-100 bg-contain py-5 md:py-10">
        <div className="w-full max-w-7xl p-5 md:px-10 lg:mx-auto xl:px-0">
          <div className="mb-4 flex w-full flex-row items-center justify-between rounded-xl bg-blue-50">
            <h1 className="text-xl md:text-xl lg:text-2xl">Posts</h1>
            <Link href="/addBlog">
              <button
                type="button"
                className="rounded-xl bg-blue-500 p-1 text-white"
              >
                Create Blog
              </button>
            </Link>
          </div>

          <div id="post">
            <BlogCard />
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
