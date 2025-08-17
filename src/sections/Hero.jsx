import React from "react";
import FlowerImage from "../assets/images/Flower.svg";

const Hero = () => {
  return (
    <section className="hero h-screen flex flex-col justify-center align-center md:gap-4 gap-0 section">
      <h1 className="hero__title text-white font-saunde lg:text-8xl md:text-6xl text-[3rem]" data-aos="fade-up" data-aos-delay="100">SENIOR</h1>
      <div className="flex flex-row justify-center items-center gap-3" data-aos="fade-up" data-aos-delay="300">
        <h1 className="hero__title text-secondary font-saunde lg:text-8xl md:text-6xl text-[3rem] h-fit md:mt-7">FRONTEND</h1>
        <img src={FlowerImage} alt="flower" className="md:w-5 md:h-5 h-2 w-2 hidden md:block" />
        <div className="hidden flex-col items-start md:flex">
          <h5 className="text-white font-saunde lg:text-xl md:text-md text-xs">Based In</h5>
          <h5 className="text-white font-saunde lg:text-4xl md:text-3xl text-xl">Thailand</h5>
        </div>
      </div>
      <h1 className="hero__title text-white font-saunde lg:text-8xl md:text-6xl text-[3rem] md:mt-7" data-aos="fade-up" data-aos-delay="500">DEVELOPER</h1>
      <div className="grid md:grid-cols-4 grid-cols-1" data-aos="fade-up" data-aos-delay="700">
        <div className="md:col-start-2 col-span-2 mx-12 mt-5 md:mt-0 md:mx-auto md:translate-x-48 z-0">
          <p className="border-l-2 text-sm md:text-lg border-white text-white text-left pl-5 font-raleway z-0">Creative thinking and problem solving <br /> are where my mind wanders, using my knowledge <br /> and passion for coding as my medium.</p>
        </div>
      </div>
    </section>
  );
};
export default Hero;
