import React from "react";
import Image from "next/image";
import hero from "../../public/hero.avif";
import heroCyl from "../../public/hero-cyl.avif";
import heroSemi from "../../public/hero-semi.avif";
import Link from "next/link";

function Home() {
  return (
    <div className="flex flex-col lg:flex-row justify-around px-4 lg:px-10 gap-8 lg:gap-0">
      <div className="flex flex-col justify-center mt-[10rem] lg:-mt-[10rem] lg:items-start z-0">
        {/* Adjusted cylinder positioning */}
        <Image
          className="hidden lg:block ml-[20rem] mt-[2rem]" // Changed from -mt-[17rem]
          alt="cylinder"
          src={heroCyl}
          width={250}
          height={250}
        />
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl lg:text-[5rem] leading-tight lg:leading-[5rem] font-bold text-gray-900 text-center lg:text-left">
            Your Content
            <br /> Co-Pilot
          </h1>
          <p className="text-lg lg:text-xl font-[350] text-center lg:text-left">
            An AI-powered assistant that helps users research, write, optimize,
            and publish content efficiently. No need to spend countless hours in manual labor!
          </p>
          <Link
            href="/dashboard"
            className="text-center p-4 bg-gray-900 hover:bg-black transition-all duration-300 text-white font-normal rounded-xl w-full lg:w-32"
          >
            Get Started
          </Link>
        </div>
      </div>
      <div className="relative mt-8 lg:mt-0">
        <Image
          src={hero}
          alt="Floating Image"
          width={1500}
          height={1500}
          className="relative moveUpDown w-full lg:w-auto lg:-mr-[3rem] lg:mt-[6rem] max-w-[600px] lg:max-w-none mx-auto"
        />
        {/* Adjusted semi-circle positioning */}
        <Image
          src={heroSemi}
          alt="Floating Image"
          width={250}
          height={250}
          className="hidden lg:block ml-[20rem] rotate-[30deg] -mt-[8rem]" // Changed from ml-[30rem]
        />
      </div>
    </div>
  );
}

export default Home;
