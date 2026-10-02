import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const JourneyMap = () => {
    const containerRef = useRef(null);
    const pathRef = useRef(null);
    const dotRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const path = pathRef.current;
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
            gsap.set(dotRef.current, { opacity: 1 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.to(path, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }).to(
                dotRef.current,
                {
                    motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
                    duration: 1.6,
                    ease: "power2.inOut",
                },
                0
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="flex justify-center py-6">
            <svg width="240" height="170" viewBox="0 0 240 170" fill="none">
                <path
                    ref={pathRef}
                    d="M45,35 C110,15 150,95 190,135"
                    stroke="#7A2430"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                />
                <circle cx="45" cy="35" r="5" fill="#E3C7A0" />
                <circle cx="190" cy="135" r="5" fill="#E3C7A0" />
                <circle ref={dotRef} cx="45" cy="35" r="4" fill="#7A2430" style={{ opacity: 0 }} />
                <text x="45" y="20" textAnchor="middle" fontSize="11" fill="#8C8178" fontFamily="Raleway, sans-serif">
                    Myanmar
                </text>
                <text x="190" y="155" textAnchor="middle" fontSize="11" fill="#8C8178" fontFamily="Raleway, sans-serif">
                    Thailand
                </text>
            </svg>
        </div>
    );
};

export default JourneyMap;
