import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DbotLogo from '../assets/images/logos/dbot.png';
import DatawowLogo from '../assets/images/logos/datawow.svg';
import DrvrLogo from '../assets/images/logos/drvr.png';
import AgdBankLogo from '../assets/images/logos/agdbank.svg';
import Rgo47Logo from '../assets/images/logos/rgo47.webp';
import CreativeLogo from '../assets/images/logos/creative.png';

gsap.registerPlugin(ScrollTrigger);

const jobList = [
    {
        company: "Dbot",
        logo: DbotLogo,
        position: "Software Engineer",
        duration: "November 2026 - Present",
        country: "Thailand",
        summary: "Building a Funeral ERP system and Memorial Page for Rapid Data GmbH, from day-to-day funeral operations to AI-driven development.",
        highlights: [
            "Built the Funeral ERP system covering the full funeral process, from picking up the deceased to ceremonies, cremation and urns, integrated with Sweden's death notice and permit system via DGM.",
            "Developed the Memorial Page entirely through AI-driven development with Claude, ADO AI and GitHub Copilot, where families and friends share photos and memories of the deceased.",
            "Built a widget package letting funeral houses customize and white-label their own Memorial Page theme, with Matomo analytics tracking at the company level."
        ],
        techStack: ["Next.js", "TypeScript", "Jest", "Playwright", "Storybook", "C#.NET", "PostgreSQL", "Azure", "Docker", "Azure ADO AI", "GitHub Copilot", "Claude Design", "Claude Code", "Matomo", "CookieYes", "Accessibility (a11y)", "i18n"]
    },
    {
        company: "Datawow",
        logo: DatawowLogo,
        position: "Software Engineer (Frontend)",
        duration: "April 2024 - October 2025",
        country: "Thailand",
        summary: "Supported Japanese and internal Datawow projects as a frontend developer, with a focus on analytics and SEO tooling.",
        highlights: [
            "Supported Dopa JP, a Japanese client, on their gacha website.",
            "Worked across internal projects including CookieWow and LearnPDPA, plus the BAM and disaster system projects.",
            "Set up internal products with Google Tag Manager and Google Analytics, supporting SEO and Google Search Console."
        ],
        techStack: ["React", "Next.js", "TypeScript", "Storybook", "Jest", "Google Analytics", "Google Tag Manager", "Google Search Console", "SEO"]
    },
    {
        company: "DRVR",
        logo: DrvrLogo,
        position: "Senior Software Engineer (Full-Stack & UI/UX)",
        duration: "July 2022 - April 2024",
        country: "Thailand",
        summary: "Built a fleet management system with real-time vehicle tracking, and designed the UI/UX across the DriveSafe portal and web products.",
        highlights: [
            "Developed real-time vehicle tracking over WebSocket, showing active hours, stops, driving status and tire pressure.",
            "Built the DriveSafe portal supporting a client, Nagase Thailand, alongside our own DriveSafe product.",
            "Maintained the DRVR website on WordPress, and designed UI/UX for the application and web portals, working closely with the CEO and PM."
        ],
        techStack: ["React", "WebSocket", "WordPress", "Figma"]
    },
    {
        company: "AGDBank",
        logo: AgdBankLogo,
        position: "Software Engineer",
        duration: "July 2021 - July 2022",
        country: "Myanmar"
    },
    {
        company: "rgo47",
        logo: Rgo47Logo,
        position: "Senior Software Engineer",
        duration: "October 2019 - May 2021",
        country: "Myanmar"
    },
    {
        company: "CREATiVE",
        logo: CreativeLogo,
        position: "Senior Software Engineer (UI/UX)",
        duration: "March 2017 - October 2019",
        country: "Myanmar"
    }
];

const UNITS_PER_JOB = 0.6; // 1 unit = 100vh of scroll per job item

const Experience = () => {
    const wrapperRef = useRef(null);
    const pinRef = useRef(null);
    const positionRefs = useRef([]);
    const dotRefs = useRef([]);
    const extraRefs = useRef([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const naturalHeights = extraRefs.current.map((el) => (el ? el.scrollHeight : 0));

                gsap.set(extraRefs.current, { height: 0, opacity: 0 });
                gsap.set(extraRefs.current[0], { height: naturalHeights[0], opacity: 1 });
                gsap.set(positionRefs.current, { color: "#8C8178" });
                gsap.set(positionRefs.current[0], { color: "#7A2430" });
                gsap.set(dotRefs.current, { backgroundColor: "#8C8178" });
                gsap.set(dotRefs.current[0], { backgroundColor: "#7A2430" });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.3,
                        pin: pinRef.current,
                        pinSpacing: false,
                        anticipatePin: 1,
                    },
                });

                jobList.forEach((_, i) => {
                    if (i === 0) return;

                    tl.addLabel(`job${i}`)
                        .to(extraRefs.current[i - 1], { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" }, `job${i}`)
                        .to(positionRefs.current[i - 1], { color: "#8C8178", duration: 0.2 }, `job${i}`)
                        .to(dotRefs.current[i - 1], { backgroundColor: "#8C8178", duration: 0.2 }, `job${i}`)
                        .to(extraRefs.current[i], { height: naturalHeights[i], opacity: 1, duration: 0.3, ease: "power2.inOut" }, `job${i}+=0.3`)
                        .to(positionRefs.current[i], { color: "#7A2430", duration: 0.2 }, `job${i}+=0.3`)
                        .to(dotRefs.current[i], { backgroundColor: "#7A2430", duration: 0.2 }, `job${i}+=0.3`);
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
    <section className="section relative">
        <div className="reveal flex flex-row justify-between items-start section-marker text-muted px-6 md:px-12 pt-8 md:pt-10">
            <span>Experience</span>
            <span className="hidden md:block">9 Years</span>
        </div>

        {/* Desktop: pinned, scroll-locked sequence */}
        <div
            ref={wrapperRef}
            className="hidden md:block relative"
            style={{ height: `${jobList.length * UNITS_PER_JOB * 100}vh` }}
        >
            <div ref={pinRef} className="h-screen grid grid-cols-12 overflow-hidden">
                <div className="col-span-5 flex flex-col justify-between px-12 py-16 h-full">
                    <h1 className="hero__title text-outline text-tan font-saunde leading-[0.85] lg:text-[4.5rem] md:text-5xl text-4xl uppercase">
                        Professional
                    </h1>
                    <h1 className="hero__title text-maroon font-saunde leading-[0.85] lg:text-[4.5rem] md:text-5xl text-4xl uppercase -mt-4 md:-mt-8">
                        Experience
                    </h1>
                    <p className="text-secondary font-raleway leading-loose max-w-sm">
                        Experienced Software Engineer with 9 years in web development, frontend-focused and design-focused, with growing full-stack range. Strong experience in e-commerce, fintech, and telecom sectors. Currently working as a Software Engineer supporting clients across the DACH region as an outsourced developer, building a Funeral ERP system and Memorial websites.
                    </p>
                </div>

                <div className="col-span-6 col-start-7 h-full overflow-hidden relative border-l border-stone-800 px-12 flex flex-col justify-center">
                    {jobList.map((job, index) => (
                        <div key={job.company} className="border-b border-stone-800">
                            <div className="w-full flex flex-row justify-between items-center py-6">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-row items-center gap-3">
                                        {job.logo && (
                                            <span className="w-9 h-9 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0">
                                                <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-contain p-1" />
                                            </span>
                                        )}
                                        <h3 className="hero__title text-secondary font-saunde lg:text-4xl md:text-2xl text-xl uppercase">
                                            {job.company}
                                        </h3>
                                        <span className="text-muted font-raleway text-xs tracking-[0.1em] uppercase">
                                            {job.country}
                                        </span>
                                    </div>
                                    <div className="flex flex-row items-baseline gap-2">
                                        <span
                                            ref={(el) => (positionRefs.current[index] = el)}
                                            className="font-raleway text-base"
                                        >
                                            {job.position}
                                        </span>
                                        <span className="text-muted font-raleway text-xs shrink-0">
                                            {job.duration}
                                        </span>
                                    </div>
                                </div>
                                <span
                                    ref={(el) => (dotRefs.current[index] = el)}
                                    className="w-2.5 h-2.5 rounded-full shrink-0 ml-4"
                                />
                            </div>
                            <div
                                ref={(el) => (extraRefs.current[index] = el)}
                                className="overflow-hidden"
                                style={{ height: 0, opacity: 0 }}
                            >
                                <div className="flex flex-col gap-3 pb-6">
                                    {job.summary && (
                                        <p className="text-secondary font-raleway text-sm md:text-base leading-relaxed max-w-md text-left">
                                            {job.summary}
                                        </p>
                                    )}
                                    {job.highlights && (
                                        <ul className="flex flex-col gap-1.5 text-left max-w-md list-none">
                                            {job.highlights.map((item) => (
                                                <li
                                                    key={item}
                                                    className="text-muted font-raleway text-sm md:text-base leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-maroon"
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {job.techStack && (
                                        <div className="flex flex-row flex-wrap justify-start gap-2 text-left">
                                            {job.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="font-raleway text-[0.65rem] tracking-[0.05em] uppercase text-muted border border-stone-700 rounded-full px-3 py-1"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Mobile: simple static stack, no pin/scrub */}
        <div className="md:hidden flex flex-col gap-10 px-6 py-10 text-left">
            <h1 className="hero__title text-outline text-tan font-saunde leading-[0.85] text-4xl uppercase">
                Professional
            </h1>
            <h1 className="hero__title text-maroon font-saunde leading-[0.85] text-4xl uppercase -mt-4">
                Experience
            </h1>
            <p className="text-secondary font-raleway leading-loose">
                Experienced Software Engineer with 9 years in web development, frontend-focused and design-focused, with growing full-stack range. Strong experience in e-commerce, fintech, and telecom sectors. Currently working as a Software Engineer supporting clients across the DACH region as an outsourced developer, building a Funeral ERP system and Memorial websites.
            </p>

            <div className="flex flex-col gap-2 mt-6">
                {jobList.map((job, index) => (
                    <div
                        key={job.company}
                        className="grid grid-cols-[3rem_1fr] gap-4 border-t border-stone-700 py-3"
                    >
                        <span className="font-saunde text-muted text-xl">{String(index + 1).padStart(2, "0")}</span>
                        <div className="flex flex-col gap-2">
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center gap-2">
                                    {job.logo && (
                                        <span className="w-7 h-7 rounded-md bg-white flex items-center justify-center overflow-hidden shrink-0">
                                            <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-contain p-0.5" />
                                        </span>
                                    )}
                                    <h5 className="text-secondary text-[1rem] font-bold font-raleway">
                                        {job.company}
                                    </h5>
                                </div>
                                <h5 className="text-muted text-[0.8rem] font-raleway shrink-0">
                                    {job.duration}
                                </h5>
                            </div>
                            <div className="flex flex-row items-baseline gap-2">
                                <h5 className={`text-[1rem] font-raleway ${index === 0 ? "text-maroon" : "text-muted"}`}>
                                    {job.position}
                                </h5>
                                <span className="text-muted font-raleway text-xs tracking-[0.1em] uppercase">
                                    {job.country}
                                </span>
                            </div>
                            {job.summary && (
                                <p className="text-secondary font-raleway text-base leading-relaxed text-left">
                                    {job.summary}
                                </p>
                            )}
                            {job.highlights && (
                                <ul className="flex flex-col gap-1.5 text-left list-none">
                                    {job.highlights.map((item) => (
                                        <li
                                            key={item}
                                            className="text-muted font-raleway text-base leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-maroon"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {job.techStack && (
                                <div className="flex flex-row flex-wrap justify-start gap-2 text-left">
                                    {job.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="font-raleway text-[0.65rem] tracking-[0.05em] uppercase text-muted border border-stone-700 rounded-full px-3 py-1"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
    )
}

export default Experience;
