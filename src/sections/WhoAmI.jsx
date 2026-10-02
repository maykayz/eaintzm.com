import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfileLine from "../assets/images/ProfileLine.svg";
import SideProfile from "../assets/images/FrontProfile2.png";

gsap.registerPlugin(ScrollTrigger);

const WhoAmI = () => {
  const imageWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageWrapRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: imageWrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="section flex flex-col justify-center gap-10 md:gap-16 px-6 md:px-12 py-20">
      <div className="reveal flex flex-row justify-between items-start section-marker text-muted">
        <span>Bio</span>
        <span className="hidden md:block">Since 20<span className="text-maroon">17</span></span>
      </div>

      <div className="grid md:grid-cols-12 grid-cols-1 gap-8 md:gap-4 items-start">
        <div
          ref={imageWrapRef}
          className="reveal md:col-span-4 md:col-start-1 relative mx-auto md:mx-0 md:mt-16"
        >
          <div className="absolute left-0 md:-top-16 -top-10 -translate-x-1/4">
            <img src={ProfileLine} alt="Profile Line" className="w-16 md:w-24 opacity-70" />
          </div>
          <img
            src={SideProfile}
            alt="Eaint Thazin Myint portrait"
            className="rounded-[20px] h-[320px] md:h-[400px] w-full object-cover bg-gradient-to-tl from-forest to-navy"
          />
        </div>

        <div className="reveal md:col-span-7 md:col-start-6 flex flex-col gap-6 md:gap-10">
          <h1 className="hero__title text-outline text-tan font-saunde leading-[0.85] lg:text-[6rem] md:text-6xl text-5xl uppercase">
            Who I Am
          </h1>
          <h6 className="text-justify text-secondary font-raleway leading-loose md:block hidden max-w-xl">
            I'm Eaint Thazin Myint @ May K, a frontend developer originally from Myanmar, currently based in Thailand.
            <br /> <br />
            I have a passion for creating beautiful and functional web applications. With over 9 years of experience, I have honed my skills in React, JavaScript and willing to learn new technologies to stay up-to-date with the latest trends in web development.
            <br /> <br />
            I have worked on various projects, including e-commerce, fintech, telecom and telematics applications in the past years. I am currently working for a software agency supporting clients in Thailand and Japan.
            <br /> <br />
            I am always looking for new challenges and opportunities to grow as a developer. In my free time, I love to play cozy games, read books, and explore new technologies. I believe that continuous learning is key to success in this ever-evolving field.
          </h6>
          <h6 className="text-justify text-secondary font-raleway leading-loose md:hidden block">
            I'm Eaint Thazin Myint @ May K
            <br /> <br />
            Experienced Frontend Developer with 9 years in web development. Currently working for a software agency supporting both Japan and Thai clients.
          </h6>
        </div>
      </div>
    </section>
  );
};

export default WhoAmI;
