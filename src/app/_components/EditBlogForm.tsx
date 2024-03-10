"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";

interface EditBlogFormInterface {
  id: string;
  title: string;
  description: string;
}

const EditBlogForm = ({ id, title, description }: EditBlogFormInterface) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8080/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });
      if (!res.ok) {
        new Error("Failed to update Blog");
      }
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="m-10">
        <Link href="/">
          <HiArrowLeft size={20} />
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="m-10 flex flex-col gap-4">
        <input
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          type="text"
          placeholder="Blog Title"
          className="rounded-md border border-slate-500 px-8 py-2"
        />
        <textarea
          rows={10}
          onChange={(e) => setNewDescription(e.target.value)}
          value={newDescription}
          placeholder="Description"
          className="rounded-md border border-slate-500 px-8 py-2"
        />
        <button className="w-fit rounded-xl bg-green-300 px-6 py-3 font-bold">
          Update Blog
        </button>
      </form>
    </>
  );
};

export default EditBlogForm;
