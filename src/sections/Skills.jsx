import { useLayoutEffect, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

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

const SkillCard = ({ skill, registerRef }) => {
    const Icon = ICONS[skill] || FiCpu;
    const color = BRAND_COLORS[skill] || "#C98A93";
    const cardRef = useRef(null);
    const setCardRef = (el) => {
        cardRef.current = el;
        if (registerRef) registerRef(el);
    };
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
            ref={setCardRef}
            style={{
                "--accent": color,
                transformStyle: "preserve-3d",
            }}
            className="group relative h-32 md:h-36 flex flex-col items-center justify-center gap-4 px-2 transition-transform duration-200 ease-out will-change-transform"
        >
            <div
                className="relative flex items-center justify-center w-16 h-16 rounded-full shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{
                    transform: "translateZ(28px)",
                    backgroundColor: `${color}26`,
                    boxShadow: `0 6px 18px -6px ${color}66`,
                }}
            >
                <Icon style={{ color }} size={34} />
            </div>
            <span
                className="relative font-raleway text-sm md:text-base uppercase tracking-[0.05em] text-[#EDE6DC] text-center leading-tight line-clamp-2"
                style={{ transform: "translateZ(14px)" }}
            >
                {skill}
            </span>
        </div>
    );
};

const UNITS_PER_CATEGORY = 1.4; // 1 unit = 100vh of scroll per category

const Skills = () => {
    const sectionRef = useRef(null);
    const wrapperRef = useRef(null);
    const pinRef = useRef(null);
    const panelRefs = useRef([]);
    const labelRefs = useRef([]);
    const tickRefs = useRef([]);
    const cardRefs = useRef([]);
    const onOverlayRef = useRef(null);
    const offOverlayRef = useRef(null);
    const hintRef = useRef(null);

    useEffect(() => {
        const mouse = { x: null, y: null };

        const applyLightState = (on) => {
            if (onOverlayRef.current) onOverlayRef.current.style.opacity = on ? "1" : "0";
            if (offOverlayRef.current) offOverlayRef.current.style.opacity = on ? "0" : "1";
            if (hintRef.current) hintRef.current.style.opacity = on ? "0" : "1";
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
                const isPinned = Math.abs(rect.top) < 2;
                if (isPinned) {
                    const x = mouse.x - rect.left;
                    const y = mouse.y - rect.top;
                    overlay.style.background = `radial-gradient(260px circle at ${x}px ${y}px, transparent 0%, rgba(6,3,3,0.96) 65%)`;
                }
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

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                gsap.set(panelRefs.current, { opacity: 0, pointerEvents: "none" });
                gsap.set(panelRefs.current[0], { opacity: 1, pointerEvents: "auto" });
                gsap.set(labelRefs.current, { opacity: 0 });
                gsap.set(labelRefs.current[0], { opacity: 1 });
                gsap.set(tickRefs.current, { backgroundColor: "#8C8178" });
                gsap.set(tickRefs.current[0], { backgroundColor: "#7A2430" });
                gsap.set(cardRefs.current.slice(1).flat(), { clipPath: "inset(100% 0% 0% 0%)" });
                gsap.set(cardRefs.current[0], { clipPath: "inset(0% 0% 0% 0%)" });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.8,
                        pin: pinRef.current,
                        pinSpacing: false,
                        anticipatePin: 1,
                    },
                });

                skillCategories.forEach((_, i) => {
                    if (i === 0) return;

                    tl.addLabel(`cat${i}`)
                        .set(panelRefs.current[i - 1], { pointerEvents: "none" }, `cat${i}`)
                        .to(panelRefs.current[i - 1], { opacity: 0, duration: 0.5 }, `cat${i}`)
                        .to(cardRefs.current[i - 1], { clipPath: "inset(0% 0% 100% 0%)", duration: 0.15, stagger: 0.01 }, `cat${i}+=0.4`)
                        .to(labelRefs.current[i - 1], { opacity: 0, duration: 0.5 }, `cat${i}`)
                        .to(tickRefs.current[i - 1], { backgroundColor: "#8C8178", duration: 0.3 }, `cat${i}`)
                        .set(panelRefs.current[i], { pointerEvents: "auto" }, `cat${i}+=0.5`)
                        .to(panelRefs.current[i], { opacity: 1, duration: 0.5 }, `cat${i}+=0.5`)
                        .to(cardRefs.current[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.15, stagger: 0.01 }, `cat${i}+=0.85`)
                        .to(labelRefs.current[i], { opacity: 1, duration: 0.5 }, `cat${i}+=0.5`)
                        .to(tickRefs.current[i], { backgroundColor: "#7A2430", duration: 0.3 }, `cat${i}+=0.5`);
                });

                return () => {
                    if (tl.scrollTrigger) tl.scrollTrigger.kill();
                    tl.kill();
                };
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="theme-dark section relative"
            style={{ background: "var(--hero-gradient)" }}
            onClick={toggleLights}
        >
            <div className="reveal md:hidden relative z-10 flex flex-row justify-between items-start section-marker text-muted px-6 pt-8">
                <span>Skills</span>
            </div>

            {/* Desktop: pinned, scroll-locked category cards */}
            <div
                ref={wrapperRef}
                className="hidden md:block relative"
                style={{ height: `${(skillCategories.length + 0.4) * UNITS_PER_CATEGORY * 100}vh` }}
            >
                <div ref={pinRef} className="h-screen relative flex flex-col items-center justify-center overflow-hidden px-12 gap-10">
                    <div className="reveal absolute z-10 top-8 left-12 right-12 flex flex-row justify-between items-start section-marker text-muted">
                        <span>Skills</span>
                        <span>Area of Expertise</span>
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                        <h1 className="hero__title text-tan font-saunde uppercase leading-none text-5xl lg:text-6xl">
                            Skills
                        </h1>
                        <p className="font-raleway text-sm text-muted max-w-lg">
                            Frontend-first engineer who builds across the stack, from pixel-perfect UI to AI-assisted backend tooling.
                        </p>
                    </div>

                    <div className="relative z-10 w-full max-w-6xl flex flex-row items-start gap-8">
                        <div className="relative flex-1 min-h-[20rem]">
                            {skillCategories.map((category, index) => (
                                <div
                                    key={category.title}
                                    ref={(el) => (panelRefs.current[index] = el)}
                                    className="absolute inset-0 flex flex-col gap-4"
                                >
                                    <div
                                        ref={(el) => (labelRefs.current[index] = el)}
                                        className="flex flex-col gap-3 text-left"
                                    >
                                        <h3 className="hero__title text-secondary font-saunde uppercase text-base lg:text-lg">
                                            {category.title}
                                        </h3>
                                        <div className="border-b border-stone-700 w-full" />
                                    </div>
                                    <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
                                        {category.skills.map((skill, skillIndex) => (
                                            <SkillCard
                                                key={skill}
                                                skill={skill}
                                                registerRef={(el) => {
                                                    if (!cardRefs.current[index]) cardRefs.current[index] = [];
                                                    cardRefs.current[index][skillIndex] = el;
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-3 shrink-0 pt-14">
                            {skillCategories.map((_, index) => (
                                <span
                                    key={index}
                                    ref={(el) => (tickRefs.current[index] = el)}
                                    className="w-1 h-6 rounded-sm"
                                />
                            ))}
                        </div>
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
                        ref={hintRef}
                        className="relative z-30 text-center font-raleway text-xs tracking-[0.2em] uppercase text-[#EDE6DC] animate-pulse transition-opacity duration-500 ease-out"
                    >
                        Try moving your cursor around, or click to turn the light on / off
                    </p>
                </div>
            </div>

            {/* Mobile: simple static stack, no pin/scrub */}
            <div className="md:hidden relative z-10 flex flex-col gap-10 px-6 py-10">
                <div className="flex flex-col items-center gap-4 text-center">
                    <h1 className="hero__title text-tan font-saunde uppercase leading-none text-4xl">
                        Skills
                    </h1>
                    <p className="font-raleway text-sm text-muted">
                        Frontend-first engineer who builds across the stack, from pixel-perfect UI to AI-assisted backend tooling.
                    </p>
                </div>

                <div className="flex flex-col gap-10">
                    {skillCategories.map((category) => (
                        <div key={category.title} className="flex flex-col gap-4">
                            <h3 className="hero__title text-secondary font-saunde uppercase text-xl">
                                {category.title}
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {category.skills.map((skill) => (
                                    <SkillCard key={skill} skill={skill} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
