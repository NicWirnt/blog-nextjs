"use client";

import React, { useState } from "react";

import BlogCard from "./BlogCard";
import { trpc } from "../_trpc/client";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

// const addPost = await api.blog.postBlog.mutation();
const TestInput = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createPost.mutate({
        input: {
          title: "Example Title",
          description: "Example Description",
          userId: "123",
          createdBy: "Nico",
        },
      });
      console.log("Mutation triggered");
    } catch (error) {
      console.error("Error triggering mutation:", error);
    }
  };

  const createPost = trpc.blog.postBlog.useMutation();
  console.log(createPost);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          //   disabled={createPost.isLoading}
        >
          {/* {createPost.isLoading ? "Submitting..." : "Submit"} */}
          submit
        </button>
      </form>
    </div>
  );
};

export default TestInput;
