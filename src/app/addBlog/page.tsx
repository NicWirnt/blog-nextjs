import { auth, currentUser } from "@clerk/nextjs";
import React, { useState } from "react";
import BlogForm from "../_components/BlogForm";

const page = async () => {
  const res = await currentUser();

  const username = res?.username ?? null;
  const userId = res?.id ?? null;

  return (
    <>
      <BlogForm userId={userId} username={username} />
    </>
  );
};

export default page;
