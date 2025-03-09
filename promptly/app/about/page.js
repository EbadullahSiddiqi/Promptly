"use client";

import React from "react";
import { Rocket, Lightbulb, User, Code, Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

function AboutPage() {
  const features = [
    {
      heading: "Innovation-Driven",
      description:
        "We’re constantly exploring new ways to make content creation faster, smarter, and more efficient.",
      icon: Rocket,
    },
    {
      heading: "User-Centric Design",
      description:
        "Our tools are built with you in mind, ensuring a seamless and intuitive experience.",
      icon: User,
    },
    {
      heading: "Cutting-Edge Technology",
      description:
        "Leveraging the latest advancements in AI to deliver powerful features.",
      icon: Code,
    },
    {
      heading: "Passion for Creativity",
      description:
        "We believe in empowering creators to bring their ideas to life.",
      icon: Heart,
    },
  ];

  return (
    <>
      <Navbar />
      <div className="about-page flex justify-center items-center py-32 px-4 sm:px-8 bg-gray-50">
        <div className="flex flex-col gap-10 max-w-6xl w-full">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 font-semibold">
              About Content Co-Pilot
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-4">
              Empowering creators to turn ideas into engaging content with the
              help of AI.
            </p>
          </div>

          {/* Founder Section */}
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Meet Ebadullah Siddiqi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hi, I’m Ebadullah Siddiqi, the founder of Content Co-Pilot. As a
              passionate developer and content creator, I understand the
              challenges of turning ideas into polished content. That’s why I
              built Content Co-Pilot—to make content creation faster, smarter,
              and more accessible for everyone.
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              With a background in software development and a love for
              storytelling, I’ve combined my skills to create a tool that
              empowers creators like you to focus on what matters most: your
              ideas.
            </p>
          </div>

          {/* Mission Section */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">
              Our Mission
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              At Content Co-Pilot, our mission is to simplify content creation
              by providing powerful AI-driven tools that help you write better,
              faster, and more effectively. We believe that everyone has a story
              to tell, and we’re here to help you tell it.
            </p>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <feature.icon className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.heading}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Call-to-Action */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              Ready to Create?
            </h2>
            <p className="text-gray-600 mt-4">
              Join thousands of creators who are already using Content Co-Pilot
              to transform their ideas into reality.
            </p>
            <Link
              href="/pricing"
              className="inline-block mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg font-medium transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
