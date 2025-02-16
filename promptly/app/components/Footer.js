import React from "react";
import logo from "../../public/logo.png";
import Image from "next/image";
import { Instagram, Linkedin, Github } from "lucide-react";

function Footer() {
  const socials = [
    {
      icon: Instagram,
    },
    {
      icon: Linkedin,
    },
    {
      icon: Github,
    },
  ];

  return (
    <footer className="bg-black p-5 flex flex-col sm:flex-row sm:justify-around items-center sm:items-start gap-6 sm:gap-0 text-center sm:text-left">
      {/* Left Section - Logo & Description */}
      <div className="relative flex flex-col items-center sm:items-start w-full sm:w-1/3">
        {/* Glowing Gradient Behind Logo */}
        <div className="absolute inset-0 h-20 w-20 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-xl opacity-50"></div>

        {/* Logo Wrapper */}
        <div className="relative h-14 w-14 rounded-lg bg-black flex items-center justify-center">
          <Image
            src={logo}
            height={50}
            width={50}
            alt="logo"
            className="object-contain"
          />
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mt-4 max-w-[280px]">
          Celebrate the joy of creating amazing content without having to work
          hard while an AI Agent does it all for you.
        </p>

        {/* Social Media Icons */}
        <div className="text-gray-500 flex gap-6 mt-6 sm:mt-[6rem]">
          {socials.map((social, index) => (
            <div
              className="hover:text-gray-400 cursor-pointer transition-all duration-300"
              key={index}
            >
              <social.icon className="w-6 h-6" />
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Founder Info */}
      <div className="w-full sm:w-auto">
        <h1 className="text-gray-500 text-lg sm:text-xl font-semibold">
          Founder:
        </h1>
        <p className="text-gray-300 text-base sm:text-lg">
          <i>Ebadullah Siddiqi</i>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
