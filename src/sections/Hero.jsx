import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Portrait from "../assets/images/EaintPortrait.png";
import FloralCorner from "../assets/images/FloralCorner.png";

gsap.registerPlugin(ScrollTrigger);

const FLORAL_ROTATIONS = [270, 354, 180, 90];

const GlobeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="9" stroke="#8C8178" strokeWidth="1" />
    <ellipse cx="11" cy="11" rx="4" ry="9" stroke="#8C8178" strokeWidth="1" />
    <path d="M2 11H20" stroke="#8C8178" strokeWidth="1" />
  </svg>
);

const Hero = () => {
  const wrapperRef = useRef(null);
  const pinRef = useRef(null);
  const bottomRef = useRef(null);
  const headlineRef = useRef(null);
  const hiRef = useRef(null);
  const portraitRef = useRef(null);
  const floralRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        floralRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, { scale: 1.3, rotation: FLORAL_ROTATIONS[i] });
        });
      });

      mm.add("(min-width: 768px)", () => {
        gsap.set(headlineRef.current, { y: -100 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.3,
            pin: pinRef.current,
            pinSpacing: false,
            anticipatePin: 1,
          },
        });

        tl.fromTo(
          bottomRef.current,
          { y: 420, opacity: 0 },
          { y: -100, opacity: 1, ease: "none" },
          0
        );

        floralRefs.current.forEach((el, i) => {
          if (!el) return;
          tl.fromTo(
            el,
            { scale: 4, rotation: FLORAL_ROTATIONS[i] },
            { scale: 2.5, rotation: FLORAL_ROTATIONS[i], ease: "none" },
            0
          );
        });

        // headline starts at its natural size and keeps growing as you scroll
        tl.fromTo(
          headlineRef.current,
          { scale: 0.8 },
          { scale: 1.6, ease: "none" },
          0
        );

        // intro label fades out quickly once scrolling begins
        tl.fromTo(
          hiRef.current,
          { opacity: 1 },
          { opacity: 0, ease: "none", duration: 0.3 },
          0
        );

        // photo darkens/desaturates further so it blends into the background
        tl.fromTo(
          portraitRef.current,
          { filter: "brightness(0.68) contrast(1.05) saturate(1)" },
          { filter: "brightness(0.58) contrast(0.96) saturate(0.55)", ease: "none" },
          0
        );

        return () => {
          if (tl.scrollTrigger) tl.scrollTrigger.kill();
          tl.kill();
        };
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative md:h-[213vh]">
      <section
        ref={pinRef}
        className="hero theme-dark h-screen section overflow-hidden relative flex flex-col justify-between py-6 px-6 md:px-12"
        style={{ background: "var(--hero-gradient)" }}
      >
        <img ref={(el) => (floralRefs.current[0] = el)} src={FloralCorner} alt="" aria-hidden="true" className="hidden md:block absolute top-0 left-0 md:w-56 lg:w-80 opacity-80 mix-blend-screen pointer-events-none select-none z-0" />
        <img ref={(el) => (floralRefs.current[1] = el)} src={FloralCorner} alt="" aria-hidden="true" className="hidden md:block absolute right-0 top-10 md:top-[68px] md:w-56 lg:w-80 opacity-80 mix-blend-screen pointer-events-none select-none z-0" />
        <img ref={(el) => (floralRefs.current[2] = el)} src={FloralCorner} alt="" aria-hidden="true" className="hidden md:block absolute bottom-0 left-0 md:w-56 lg:w-80 opacity-80 mix-blend-screen pointer-events-none select-none z-0" />
        <img ref={(el) => (floralRefs.current[3] = el)} src={FloralCorner} alt="" aria-hidden="true" className="hidden md:block absolute bottom-0 right-0 md:w-56 lg:w-80 opacity-80 mix-blend-screen pointer-events-none select-none z-0" />

        <div className="reveal flex flex-row justify-between items-start section-marker text-muted relative z-20">
          <span>Creative Portfolio</span>
          <span className="hidden md:block">Eaint Thazin Myint</span>
        </div>

        <div className="relative flex-1 flex items-center justify-center min-h-0 translate-y-0 md:translate-y-[60px] lg:translate-y-[100px] xl:translate-y-[150px] 2xl:translate-y-[220px]">
          <span
            ref={hiRef}
            className="hidden md:block absolute inset-x-0 top-0 text-center text-muted font-raleway text-sm md:text-base tracking-[0.3em] uppercase select-none pointer-events-none"
          >
            Hey It's me
          </span>

          <h1
            ref={headlineRef}
            className="hero__title absolute inset-x-0 z-0 text-center text-tan font-saunde uppercase leading-none select-none pointer-events-none text-[7rem] md:text-[8rem] lg:text-[10rem] xl:text-[13rem] 2xl:text-[26rem]"
          >
            Eaint
          </h1>

          <img
            ref={portraitRef}
            src={Portrait}
            alt="Eaint Thazin Myint"
            className="relative z-10 h-[92%] md:h-[98%] w-auto object-contain object-bottom translate-x-0 md:translate-x-[6%] -translate-y-20 md:translate-y-0"
            style={{ filter: "brightness(0.68) contrast(1.05) saturate(1)" }}
          />
        </div>

        <div
          ref={bottomRef}
          className="relative z-20 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 md:gap-10 shrink-0"
        >
          <div className="hidden md:flex flex-col gap-3 max-w-xs">
            <p className="border-l-2 text-sm md:text-base border-maroon text-secondary text-left pl-5 font-raleway">
              Craft was never the easy part. It is letting the mind run
              alongside the machine, in search of greater creations.
            </p>
            <span className="font-signature text-rose text-3xl pl-5 -mt-1">Eaint Thazin Myint</span>
          </div>

          <div className="flex flex-col gap-3 max-w-xs items-center text-center md:items-end md:text-right">
            <p className="text-secondary font-raleway text-sm md:text-base">
              I'm a Frontend Developer crafting elegant, performant and
              user-centered web experiences.
            </p>
            <div className="hidden md:flex flex-row items-center gap-3">
              <div className="flex flex-col md:items-end">
                <h5 className="text-muted font-raleway text-xs tracking-[0.2em] uppercase">Based In Thailand</h5>
                <h5 className="text-muted font-raleway text-xs tracking-[0.2em] uppercase">Working Worldwide</h5>
              </div>
              <GlobeIcon />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Hero;
