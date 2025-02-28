import React from "react";
import FeatureCard from "./FeatureCard";
import diamond from "../../public/diamond.avif";
import cross from "../../public/cross.avif";
import cube from "../../public/cube.avif";
import donut from "../../public/donut.avif";

function Features() {
  const features = [
    {
      title: "AI Writing Assistant",
      description:
        "An AI powered writing assistant that generates LinkedIn Posts, YouTube Scripts, Blog Posts, and much more! The AI Model is trained on the best performing content meaning, it'll create the best performing content for you!",
      img: diamond,
    },
    {
      title: "Content Research Assistant",
      description:
        "Before writing content, you need to do research. Researching becomes much easier with our Research Assistant that combines the results with the best content online and generates your required results",
      img: cross,
    },
    {
      title: "Template Library",
      description:
        "To make sure your mind only focuses on deep work, we provide a Template Library containing many structured content formats that are ready to use for you! Choose a format, moidfy the text, and post away.",
      img: donut,
    },
    {
      title: "SEO Optimization",
      description:
        "SEO is your online presence. Our SEO optimization tool helps you put your business in front of your target audience and make more money. Advanced AI capabilities makes our tool better from other tools in the market.",
      img: cube,
    },
  ];

  return (
    <div className="py-20">
      <div className="flex flex-col justify-center items-center">
        <h1 className="lg:text-5xl text-3xl font-bold leading-[2.5rem] text-center">
          Features That'll <br /> Change Your World!
        </h1>
      </div>

      <div className="flex flex-wrap justify-around gap-5 px-5 py-10">
        {features.map((feature, index) => {
          return (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              img={feature.img}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Features;
