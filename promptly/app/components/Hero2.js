"use client";

import Link from "next/link";
import React from "react";
import { MoveRight, BrainCircuit, Bot, BookOpen, Hammer } from "lucide-react";
import Image from "next/image";
import prodImg from "../../public/promptly-dashboard.png";

function Hero2() {
  const features = [
    {
      heading: "AI-Powered Writing Assistant",
      description:
        "Core feature that differentiates our tool with AI-powered content generation and readability improvements.",
      icon: BrainCircuit,
    },
    {
      heading: "Content Research Assistant",
      description:
        "Helps you find relevant topics and keywords, making it easier to create engaging content.",
      icon: Bot,
    },
    {
      heading: "Template Library",
      description:
        "Reduces writer’s block by offering structured content formats.",
      icon: BookOpen,
    },
    {
      heading: "Basic SEO Optimization Tools",
      description:
        "Boosts content discoverability; essential but can start with basic keyword density suggestions.",
      icon: Hammer,
    },
  ];

  return (
    <div className="hero2 flex justify-center items-center py-20 px-4 sm:px-8">
      <div className="flex flex-col gap-7 max-w-5xl w-full">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-center text-gray-800 font-semibold leading-tight">
          A more effective way
          <br className="hidden sm:block" /> to create content
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-2xl text-center font-light text-gray-600">
          Effortlessly turn your ideas into engaging,
          <br className="hidden sm:block" /> better, attractive content in just
          minutes with
          <br className="hidden sm:block" /> the set of Promptly's Tools.
        </p>

        <div className="py-8">
          <Image
            className="bg-cover rounded-2xl shadow-xl backdrop-blur-md"
            src={prodImg}
            alt="product dashboard image"
          />
        </div>

        {/* Features Section */}
        <div className="flex flex-col sm:flex-row lg:gap-10 justify-center items-center h-full gap-5 sm:gap-3 ">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4 sm:max-w-[250px]"
            >
              <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-700" />
              <h2 className="font-semibold text-lg sm:text-xl">
                {feature.heading}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {feature.description}
              </p>
              <Link
                className="flex gap-1 h-full items-center text-blue-500 hover:text-blue-700 transition-all duration-300"
                href="/"
              >
                Learn More <MoveRight />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero2;
