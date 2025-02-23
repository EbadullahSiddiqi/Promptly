import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";

function Hero() {
  return (
    <div className="hero py-5 overflow-hidden">
      <Navbar/>
      <Home />
    </div>
  );
}

export default Hero;
