"use client";

import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

import { useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";

const RemoveBtn = ({ id, userId }: any) => {
  const router = useRouter();

  const removeBlog = async () => {
    const confirmed = confirm("Are you sure to delete this blog?");
    if (confirmed) {
      const res = await deletePost.mutate({
        input: {
          _id: id,
        },
      });
      if (deletePost.status === "success") {
        router.refresh();
      }
    }
  };

  const deletePost = trpc.blog.deletePost.useMutation();

  return (
    <>
      <button onClick={removeBlog}>
        <HiOutlineTrash size={20} className="text-red-400" />
      </button>
    </>
  );
};

export default RemoveBtn;
