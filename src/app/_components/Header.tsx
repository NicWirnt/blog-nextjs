import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="flex w-full max-w-7xl items-center justify-between p-5 md:px-10 lg:mx-auto xl:px-0">
        <Link href="/">
          <p className="font-bold text-blue-500 shadow-sm">Blogger</p>
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <li>
              <Link href="/">Home</Link>
            </li>
          </nav>
        </SignedIn>
        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="rounded-full bg-blue-700 p-2 font-semibold text-white"
            >
              Login
            </Link>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
