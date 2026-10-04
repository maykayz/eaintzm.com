import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import CatCorner from "../components/CatCorner";
import CVPDF from "../assets/files/EaintThazinMyint.pdf";

const EMAIL = "eaintzm@gmail.com";

const CornerDots = () => (
    <div className="grid grid-cols-2 gap-[3px]">
        <span className="w-1.5 h-1.5 bg-[#EDE6DC]" />
        <span className="w-1.5 h-1.5 bg-[#EDE6DC]/30" />
        <span className="w-1.5 h-1.5 bg-[#EDE6DC]/30" />
        <span className="w-1.5 h-1.5 bg-[#EDE6DC]/30" />
    </div>
);

const ContactMe = () => {
    const [catVisible, setCatVisible] = useState(false);
    const sectionRef = useRef(null);
    const leftBlockRef = useRef(null);
    const rightBlockRef = useRef(null);
    const [playBounds, setPlayBounds] = useState(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return undefined;
        const observer = new IntersectionObserver(
            ([entry]) => setCatVisible(entry.isIntersecting),
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const measure = () => {
            const section = sectionRef.current;
            const left = leftBlockRef.current;
            const right = rightBlockRef.current;
            if (!section || !left || !right) return;
            const sectionRect = section.getBoundingClientRect();
            const leftRect = left.getBoundingClientRect();
            const rightRect = right.getBoundingClientRect();
            setPlayBounds({
                left: leftRect.right - sectionRect.left + 24,
                right: rightRect.left - sectionRect.left - 24,
                bottom: sectionRect.bottom - leftRect.bottom,
            });
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="theme-dark min-h-screen section relative flex flex-col justify-between px-6 md:px-12 py-6 md:py-16"
            style={{ background: "var(--hero-gradient)" }}
        >
            <span className="reveal font-raleway text-xs tracking-[0.3em] uppercase text-muted shrink-0">
                Let's start the conversation
            </span>

            <div className="flex-1 flex items-center py-4 md:py-10 min-h-0">
                <h1 className="reveal hero__title text-tan font-saunde leading-[1.15] md:leading-[0.9] text-3xl md:text-6xl lg:text-7xl uppercase max-w-4xl text-left">
                    Have an idea in mind? Let's make it happen.
                </h1>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-10 shrink-0">
                <div ref={rightBlockRef} className="flex flex-col gap-3 md:gap-4 max-w-sm order-1 md:order-2 md:ml-auto">
                    <p className="font-raleway text-xs md:text-sm text-secondary leading-relaxed">
                        Based in Thailand, open to remote/relocate with teams across Asia and any timezone. Fintech, e-commerce, ERP, telecom, or something I haven't tried yet — I'm in.
                    </p>

                    <a
                        href={`mailto:${EMAIL}`}
                        className="group flex items-center justify-between gap-4 border-t border-stone-700 pt-3 font-raleway text-sm uppercase tracking-[0.1em] text-secondary transition-colors duration-200 hover:text-maroon"
                    >
                        {EMAIL}
                        <FiArrowUpRight className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>

                    <a
                        href={CVPDF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-4 border-t border-stone-700 pt-3 font-raleway text-sm uppercase tracking-[0.1em] text-secondary transition-colors duration-200 hover:text-maroon"
                    >
                        Download CV
                        <FiArrowUpRight className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                </div>

                <div ref={leftBlockRef} className="flex flex-col gap-2 md:gap-3 order-2 md:order-1">
                    <div className="hidden md:block">
                        <CornerDots />
                    </div>
                    <div className="flex flex-row gap-5 font-raleway text-xs uppercase tracking-[0.1em]">
                        <a href="https://www.linkedin.com/in/eaintthazinmyint" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-maroon transition-colors duration-300">
                            LinkedIn
                        </a>
                        <a href="https://github.com/maykayz" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-maroon transition-colors duration-300">
                            GitHub
                        </a>
                        <a href={`mailto:${EMAIL}`} className="text-muted hover:text-maroon transition-colors duration-300">
                            Email
                        </a>
                    </div>
                    <span className="font-raleway text-xs text-muted">
                        © {new Date().getFullYear()} Eaint Thazin Myint
                    </span>
                </div>
            </div>

            <div className="hidden md:block">
                <CatCorner visible={catVisible} playBounds={playBounds} />
            </div>
        </section>
    );
};

export default ContactMe;
