import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex-center flex w-screen flex-col items-center justify-center">
      <SignUp />
      <Link href="/">Back to homepage</Link>
    </div>
  );
};

export default page;
