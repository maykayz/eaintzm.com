import { useEffect, useRef } from "react";
import {
    SiReact,
    SiNextdotjs,
    SiNuxt,
    SiTypescript,
    SiJavascript,
    SiVuedotjs,
    SiTailwindcss,
    SiMui,
    SiGreensock,
    SiNodedotjs,
    SiNestjs,
    SiPrisma,
    SiMysql,
    SiDocker,
    SiAnthropic,
    SiGithubcopilot,
    SiGoogleanalytics,
    SiGoogletagmanager,
    SiMatomo,
    SiGooglesearchconsole,
    SiSentry,
} from "react-icons/si";
import { FiCloud, FiLayers, FiSearch, FiCpu, FiEye } from "react-icons/fi";
import { MdAccessibility } from "react-icons/md";
import { FaCookieBite } from "react-icons/fa6";
import { skillCategories } from "../data/skills";
import { getLightsOn, subscribeLights, toggleLights } from "../utils/lightBus";

const ICONS = {
    "React": SiReact,
    "Next.js": SiNextdotjs,
    "Nuxt.js": SiNuxt,
    "React Native": SiReact,
    "TypeScript": SiTypescript,
    "JavaScript": SiJavascript,
    "Vue": SiVuedotjs,
    "Tailwind CSS": SiTailwindcss,
    "Material UI": SiMui,
    "GSAP": SiGreensock,
    "AOS": FiLayers,
    "Scroll-driven UI": FiLayers,
    "Node.js": SiNodedotjs,
    "NestJS": SiNestjs,
    "Prisma": SiPrisma,
    "MySQL": SiMysql,
    "Docker": SiDocker,
    "Azure": FiCloud,
    "Claude Code": SiAnthropic,
    "Claude Design": SiAnthropic,
    "ADO AI": FiCpu,
    "GitHub Copilot": SiGithubcopilot,
    "Google Analytics": SiGoogleanalytics,
    "Matomo": SiMatomo,
    "Google Search Console": SiGooglesearchconsole,
    "SEO": FiSearch,
    "Accessibility (a11y)": MdAccessibility,
    "CookieYes": FaCookieBite,
    "Google Tag Manager": SiGoogletagmanager,
    "Microsoft Clarity": FiEye,
    "Sentry": SiSentry,
};

const BRAND_COLORS = {
    "React": "#61DAFB",
    "Next.js": "#2E2A27",
    "Nuxt.js": "#00DC82",
    "React Native": "#61DAFB",
    "TypeScript": "#3178C6",
    "JavaScript": "#D7B500",
    "Vue": "#42B883",
    "Tailwind CSS": "#38BDF8",
    "Material UI": "#007FFF",
    "Node.js": "#5FA04E",
    "NestJS": "#E0234E",
    "Prisma": "#5A4FCF",
    "MySQL": "#4479A1",
    "Docker": "#2496ED",
    "Azure": "#0078D4",
    "Claude Code": "#D97757",
    "Claude Design": "#D97757",
    "ADO AI": "#0078D7",
    "GitHub Copilot": "#8957E5",
    "Google Analytics": "#E37400",
    "Google Tag Manager": "#246FDB",
    "Matomo": "#3152A0",
    "Google Search Console": "#458CF5",
    "SEO": "#9C4C57",
    "Accessibility (a11y)": "#3E8E5C",
    "CookieYes": "#8B5E3C",
    "Microsoft Clarity": "#6264A7",
    "Sentry": "#362D59",
};

const MAX_TILT = 14;
const TILT_EASE = 0.08;

const SkillCard = ({ skill }) => {
    const Icon = ICONS[skill] || FiCpu;
    const color = BRAND_COLORS[skill] || "#C98A93";
    const cardRef = useRef(null);
    const tiltState = useRef({ rx: 0, ry: 0 });
    const mousePos = useRef({ x: null, y: null });

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return undefined;

        const handleMove = (e) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMove, { passive: true });

        let rafId;
        const tick = () => {
            const card = cardRef.current;
            if (card && mousePos.current.x !== null) {
                const rect = card.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = mousePos.current.x - cx;
                const dy = mousePos.current.y - cy;
                const dist = Math.hypot(dx, dy) || 1;
                const nx = dx / dist;
                const ny = dy / dist;
                const targetRy = nx * MAX_TILT;
                const targetRx = -ny * MAX_TILT;
                tiltState.current.rx += (targetRx - tiltState.current.rx) * TILT_EASE;
                tiltState.current.ry += (targetRy - tiltState.current.ry) * TILT_EASE;
                card.style.transform = `perspective(700px) rotateX(${tiltState.current.rx}deg) rotateY(${tiltState.current.ry}deg)`;
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div
            ref={cardRef}
            style={{
                "--accent": color,
                transformStyle: "preserve-3d",
            }}
            className="group relative h-14 md:h-16 flex flex-col items-center justify-center gap-1 px-2 transition-transform duration-200 ease-out will-change-transform"
        >
            <div
                className="relative flex items-center justify-center w-6 h-6 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{
                    transform: "translateZ(16px)",
                    backgroundColor: `${color}26`,
                    boxShadow: `0 4px 12px -5px ${color}66`,
                }}
            >
                <Icon style={{ color }} size={13} />
            </div>
            <span
                className="relative font-raleway text-[0.55rem] md:text-[0.65rem] uppercase tracking-[0.03em] text-[#EDE6DC] text-center leading-tight line-clamp-2"
                style={{ transform: "translateZ(8px)" }}
            >
                {skill}
            </span>
        </div>
    );
};

const Skills = () => {
    const sectionRef = useRef(null);
    const onOverlayRef = useRef(null);
    const offOverlayRef = useRef(null);

    useEffect(() => {
        const mouse = { x: null, y: null };

        const applyLightState = (on) => {
            if (onOverlayRef.current) onOverlayRef.current.style.opacity = on ? "1" : "0";
            if (offOverlayRef.current) offOverlayRef.current.style.opacity = on ? "0" : "1";
        };
        applyLightState(getLightsOn());
        const unsubscribe = subscribeLights(applyLightState);

        const handleMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMove, { passive: true });

        let rafId;
        const tick = () => {
            const el = sectionRef.current;
            const overlay = offOverlayRef.current;
            if (el && overlay && mouse.x !== null) {
                const rect = el.getBoundingClientRect();
                const x = mouse.x - rect.left;
                const y = mouse.y - rect.top;
                overlay.style.background = `radial-gradient(260px circle at ${x}px ${y}px, transparent 0%, rgba(6,3,3,0.96) 65%)`;
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("mousemove", handleMove);
            cancelAnimationFrame(rafId);
            unsubscribe();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="theme-dark section relative"
            style={{ background: "var(--hero-gradient)" }}
            onClick={toggleLights}
        >
            <div className="reveal relative z-10 flex flex-row justify-between items-start section-marker text-muted px-6 md:px-12 pt-8 md:pt-10">
                <span>Skills</span>
                <span className="hidden md:block">Area of Expertise</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6 py-10 md:py-14">
                <h1 className="hero__title text-tan font-saunde uppercase leading-none text-4xl md:text-5xl lg:text-6xl">
                    Skills
                </h1>
                <p className="font-raleway text-sm text-muted max-w-lg">
                    Frontend-first engineer who builds across the stack, from pixel-perfect UI to AI-assisted backend tooling.
                </p>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-12 md:gap-y-10 px-6 md:px-12 pb-20 max-w-6xl mx-auto">
                {skillCategories.map((category) => (
                    <div key={category.title} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3 text-left">
                            <h3 className="hero__title text-secondary font-saunde uppercase text-base lg:text-lg">
                                {category.title}
                            </h3>
                            <div className="border-b border-stone-700 w-full" />
                        </div>
                        <div className="grid grid-cols-3 gap-3 md:gap-4">
                            {category.skills.map((skill) => (
                                <SkillCard key={skill} skill={skill} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div
                ref={onOverlayRef}
                className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700 ease-out"
                style={{
                    opacity: 0,
                    background: "radial-gradient(circle at 50% 42%, rgba(74,22,29,0.85) 0%, rgba(74,22,29,0.25) 70%, rgba(74,22,29,0) 100%)",
                }}
            />

            <div
                ref={offOverlayRef}
                className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-700 ease-out"
                style={{ opacity: 0 }}
            />

            <p
                className="relative z-30 text-center font-raleway text-xs tracking-[0.2em] uppercase text-[#EDE6DC] animate-pulse pb-10"
            >
                Try moving your cursor around, or click to turn the light on / off
            </p>
        </section>
    );
};

export default Skills;
