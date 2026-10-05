import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OPEN_TO = ["Frontend", "Full-Stack", "UI/UX", "WordPress"];

const stats = [
    { target: 9, suffix: "+", label: "Years Experience" },
    { target: 5, suffix: "+", label: "Countries Served" },
    { target: 13, suffix: "+", label: "Companies Worked Closely" },
    { target: 32, suffix: "+", label: "Websites & Projects" },
];

const Summary = () => {
    const sectionRef = useRef(null);
    const numberRefs = useRef([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            numberRefs.current.forEach((el, index) => {
                if (!el) return;
                const { target, suffix } = stats[index];
                const counter = { value: 0 };

                gsap.to(counter, {
                    value: target,
                    duration: 1.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reset",
                    },
                    onUpdate: () => {
                        el.textContent = `${Math.round(counter.value)}${suffix}`;
                    },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section relative px-6 md:px-12 py-16 md:py-24 flex flex-col justify-center">
            <div className="reveal flex flex-row justify-between items-start section-marker text-muted">
                <span>Summary</span>
                <span className="hidden md:block">About Me</span>
            </div>

            <div className="reveal flex flex-col items-center text-center gap-6 max-w-3xl mx-auto mt-10 md:mt-14">
                <h1 className="hero__title text-maroon font-saunde leading-[0.9] text-3xl md:text-5xl lg:text-6xl uppercase">
                    About Me
                </h1>

                <p className="font-raleway text-secondary text-sm md:text-base leading-relaxed">
                    Software Engineer with a frontend focus, 9+ years building elegant,
                    performant web experiences across fintech, e-commerce, telecom, and ERP —
                    for clients spanning Myanmar, Thailand, Japan, Germany, and Norway.
                </p>

                <p className="font-raleway text-secondary text-sm md:text-base leading-relaxed">
                    I've shipped everything from gacha-style reward apps to real-time
                    fleet-tracking dashboards to AI-driven ERP systems, working primarily
                    across React, Vue, and Next.js, and I'm now aiming for full-stack
                    with Node.js, NestJS, and PostgreSQL on the backend. Along the way
                    I've designed the UI/UX I build, mentored junior developers, and
                    cared as much about accessibility and analytics as I do about
                    pixel-perfect layouts.
                </p>

                <p className="font-raleway text-secondary text-sm md:text-base leading-relaxed">
                    Based in Thailand, open to remote work or relocation across Asia and
                    worldwide.
                </p>

                <div className="flex flex-row flex-wrap justify-center gap-2 mt-2 w-full">
                    {OPEN_TO.map((tag) => (
                        <span
                            key={tag}
                            className="font-raleway text-xs tracking-[0.05em] uppercase text-muted border border-stone-400 rounded-full px-3 py-1"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 w-full text-center mt-14 md:mt-16">
                {stats.map((stat, index) => (
                    <div key={stat.label} className="flex flex-col items-center gap-2">
                        <span
                            ref={(el) => (numberRefs.current[index] = el)}
                            className="font-saunde italic text-maroon text-4xl md:text-5xl lg:text-6xl leading-none"
                        >
                            0{stat.suffix}
                        </span>
                        <span className="font-raleway text-[0.65rem] md:text-xs tracking-[0.2em] uppercase text-muted">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Summary;
