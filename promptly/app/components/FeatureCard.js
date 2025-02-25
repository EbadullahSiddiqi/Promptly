import Image from "next/image";
import React from "react";

function FeatureCard({ title, description, img }) {
  return (
    <div>
      <div className="p-5 pb-7 w-[15rem] h-[35rem] lg:w-[30rem] lg:h-[30rem] flex flex-col gap-8 rounded-2xl shadow-lg shadow-slate-200 overflow-hidden">
        <Image src={img} alt="diamond" />
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="text">
          <p className="text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;
