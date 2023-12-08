import React from "react";
import FlowerImage from "../assets/images/Flower.svg";

const Hero = () => {
  return (
    <section className="hero h-screen flex flex-col justify-center align-center md:gap-4 gap-1">
      <h1 className="hero__title text-white font-saunde lg:text-8xl md:text-6xl text-6xl">SENIOR</h1>
      <div className="flex flex-row justify-center items-center gap-3">
        <h1 className="hero__title text-secondary font-saunde lg:text-8xl md:text-6xl text-6xl h-fit">FRONTEND</h1>
        <img src={FlowerImage} alt="flower" className="md:w-5 md:h-5 h-2 w-2" />
        <div className="flex flex-col items-start">
          <h5 className="text-white font-saunde lg:text-xl md:text-md text-xs">Based In</h5>
          <h5 className="text-white font-saunde lg:text-4xl md:text-3xl text-xl">Thailand</h5>
        </div>
      </div>
      <h1 className="hero__title text-white font-saunde lg:text-8xl md:text-6xl text-6xl">DEVELOPER</h1>
      <div className="grid md:grid-cols-4 grid-cols-1">
        <div className="md:col-start-3 col-span-2 mx-12 mt-5 md:mt-0 md:mx-auto md:-translate-x-32 -translate-x-0 z-0">
          <p className="border-l-2 border-white text-white text-left pl-5 font-raleway z-0">Creative thinking and problem solving are where my mind wanders, using my knowledge and passion for coding as my medium.</p>
        </div>
      </div>
    </section>
  );
};
export default Hero;
