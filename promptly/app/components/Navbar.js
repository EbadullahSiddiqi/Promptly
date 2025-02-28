"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "../../public/logo.png";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (isOpen && !e.target.closest("nav")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 py-3 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-none backdrop-blur-sm" : "bg-transparent shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center p-4">
          {/* Logo and Brand */}
          <div className="flex gap-2 items-center">
            <h1 className="font-bold text-xl lg:text-3xl text-black">
              <span className="text-[#764ca3]">C</span>ontent{" "}
              <span className="text-[#35aad7]">C</span>o-
              <span className="text-[#606cb5]">P</span>ilot
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex h-full justify-center items-center gap-10 text-gray-800 font-[450]">
            <Link
              href="/"
              className="hover:text-gray-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-gray-600 transition-colors duration-200"
            >
              About
            </Link>
            {/* <Link
              href="/dashboard"
              className="text-center p-2 bg-gray-900 hover:bg-black transition-all duration-300 text-white font-normal rounded-xl w-full lg:w-28"
            >
              Get Started
            </Link> */}

            <SignedOut>
              <SignInButton className="text-center p-2 bg-gray-900 hover:bg-black transition-all duration-300 text-white font-normal rounded-xl w-full lg:w-28" />
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className="text-gray-800" />
            ) : (
              <Menu size={24} className="text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-2 flex flex-col  bg-white/80 backdrop-blur-md rounded-lg mb-4 space-y-4">
            <Link
              href="/"
              className="block py-2 text-gray-800 hover:text-gray-600 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-800 hover:text-gray-600 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            {/* <Link
              href="/dashboard"
              className="text-center p-2 bg-gray-900 hover:bg-black transition-all duration-300 text-white font-normal rounded-xl w-full lg:w-28"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link> */}

            <SignedOut>
              <SignInButton className="text-center p-2 bg-gray-900 hover:bg-black transition-all duration-300 text-white font-normal rounded-xl w-full lg:w-28" />
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
