import React from "react";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer- className="border-t">
      <div className="container mx-auto p-4 text-center flex flex-col gap-4  lg:flex-row   lg:justify-between">
        <p>© All right reserved 2025.</p>
        <div className="flex items-center  gap-4 justify-center  text-2xl   ">
          <a href="" className="hover:text-primary-100  ">
            <FaFacebook />
          </a>
          <a href="" className="hover:text-primary-100  ">
            <FaSquareInstagram />
          </a>
          <a href="" className="hover:text-primary-100  ">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer->
  );
};

export default Footer;
