import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { target: 9, suffix: "+", label: "Years Experience" },
    { target: 5, suffix: "+", label: "Countries Served" },
    { target: 13, suffix: "+", label: "Companies Worked Closely" },
    { target: 32, suffix: "+", label: "Websites & Projects" },
];

const Stats = () => {
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
        <section ref={sectionRef} className="px-6 md:px-12 py-16 md:py-20 border-y border-stone-300">
            <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 max-w-6xl mx-auto">
                {stats.map((stat, index) => (
                    <div key={stat.label} className="flex flex-col gap-2">
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

export default Stats;
