import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="border-t">
      <div className=" flex w-full max-w-7xl flex-col items-center justify-between p-5 sm:flex-row md:px-10 lg:mx-auto xl:px-0">
        <div>
          <p> 2024 Blogger, All Rights Reserved ©️</p>
        </div>
        <div className="flex flex-row items-center gap-4">
          <FaFacebook />
          <FaXTwitter />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
