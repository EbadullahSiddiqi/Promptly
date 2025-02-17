"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import logo from "../../public/logo.png";

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
      if (isOpen && !e.target.closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-none backdrop-blur-md" : "bg-transparent shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center p-4">
          {/* Logo and Brand */}
          <div className="flex gap-2 items-center">
            <Image
              src={logo}
              alt="Logo"
              width={60}
              height={60}
              className="bg-white rounded-full"
            />
            <h1 className="font-bold text-xl text-gray-800">
              <i>Promptly</i>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-10 text-gray-800 font-[450]">
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
            <Link 
              href="/" 
              className="hover:text-gray-600 transition-colors duration-200"
            >
              Product
            </Link>
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
            isOpen 
              ? "max-h-[500px] opacity-100" 
              : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-2 bg-white/80 backdrop-blur-md rounded-lg mb-4 space-y-4">
            <Link
              href="/"
              className="block py-2 text-gray-800 hover:text-gray-600 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/"
              className="block py-2 text-gray-800 hover:text-gray-600 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/"
              className="block py-2 text-gray-800 hover:text-gray-600 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              Product
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;