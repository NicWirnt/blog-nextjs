"use client";

import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

import { useRouter } from "next/navigation";

const RemoveBtn = ({ id, userId }: any) => {
  const router = useRouter();

  const removeBlog = async () => {
    const confirmed = confirm("Are you sure to delete this blog?");
    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/blogs?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <>
      <button onClick={removeBlog}>
        <HiOutlineTrash size={20} className="text-red-400" />
      </button>
    </>
  );
};

export default RemoveBtn;
