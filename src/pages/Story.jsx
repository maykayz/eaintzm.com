import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Chilling from "../assets/images/cat/Chilling.png";
import Running from "../assets/images/cat/Running.png";
import Happy from "../assets/images/cat/Happy.png";
import Excited from "../assets/images/cat/Excited.png";

import dopaImg from "../assets/images/portfolio/dopa.png";
import memorialImg from "../assets/images/portfolio/mymemorial.jpg";
import datawowImg from "../assets/images/portfolio/datawow.png";
import datawowBlogImg from "../assets/images/portfolio/datawow-blog.png";
import drivesafeImg from "../assets/images/portfolio/drivesafe.png";
import drivesafeMapImg from "../assets/images/portfolio/drivesafe-map.jpg";
import easypayImg from "../assets/images/portfolio/easypay.jpg";
import telenorImg from "../assets/images/portfolio/telenor.jpg";
import pizzahutImg from "../assets/images/portfolio/pizzahut.jpg";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
    { label: "Years Experience", value: "9+" },
    { label: "Countries Served", value: "5+" },
    { label: "Companies", value: "13+" },
    { label: "Projects Shipped", value: "32+" },
];

const CHAPTERS = [
    {
        episode: "Episode 01",
        year: "2017 — 2019",
        company: "CREATiVE",
        role: "Senior Software Engineer, UI/UX",
        place: "Myanmar",
        caption:
            "Where it all began. Designing and building interfaces in Myanmar, learning that good UI isn't decoration — it's how a product earns trust.",
        quote: "“Every pixel is a decision.”",
        tech: ["HTML", "CSS", "JavaScript", "UI/UX"],
        mood: Chilling,
    },
    {
        episode: "Episode 02",
        year: "2019 — 2021",
        company: "rgo47",
        role: "Senior Software Engineer",
        place: "Myanmar",
        caption:
            "Leveling up. More ownership, more complexity, more late-night debugging sessions that somehow always ended in a working build.",
        quote: "“Ship it, then make it beautiful.”",
        tech: ["JavaScript", "Frontend", "UI/UX"],
        mood: Running,
    },
    {
        episode: "Episode 03",
        year: "2021 — 2022",
        company: "AGDBank",
        role: "Software Engineer",
        place: "Myanmar",
        caption:
            "Into fintech. Banking software taught a different kind of discipline — the kind where a careless bug isn't just annoying, it's expensive.",
        quote: "“Measure twice, deploy once.”",
        tech: ["Fintech", "Frontend"],
        mood: Chilling,
    },
    {
        episode: "Episode 04",
        year: "2022 — 2024",
        company: "DRVR",
        role: "Senior SWE, Full-Stack & UI/UX",
        place: "Thailand",
        caption:
            "A fleet of trucks, a live map, and a WebSocket feed that never stops talking. Built DriveSafe's real-time tracking portal and designed its UI/UX end to end, working hand in hand with the CEO.",
        quote: "“Somewhere out there, a truck just blinked on my map.”",
        tech: ["React", "WebSocket", "WordPress", "Figma"],
        mood: Running,
    },
    {
        episode: "Episode 05",
        year: "2024 — 2025",
        company: "Datawow",
        role: "Software Engineer, Frontend",
        place: "Thailand",
        caption:
            "Bangkok. Japanese clients, internal products, and a growing obsession with the parts most engineers skip — analytics, SEO, the stuff that decides whether anyone finds the thing you built.",
        quote: "“If it doesn't rank, did it even ship?”",
        tech: ["React", "Next.js", "SEO", "GA4", "GTM"],
        mood: Excited,
    },
    {
        episode: "Episode 06",
        year: "2026 — Present",
        company: "Dbot",
        role: "Software Engineer",
        place: "Thailand, for the DACH region",
        caption:
            "The current arc. Building a Funeral ERP and a Memorial Page for families across Germany and Norway — and building most of it alongside Claude, treating AI less like a tool and more like a teammate.",
        quote: "“The mind runs alongside the machine.”",
        tech: ["Next.js", "C#.NET", "PostgreSQL", "Azure", "Claude Code"],
        mood: Happy,
    },
];

const QUESTS = [
    { title: "Dopa", tag: "Gacha Web App · Japan", img: dopaImg, blurb: "Mobile-first gacha reveals, built for play." },
    { title: "MyMemorial", tag: "Memorial Page · Germany", img: memorialImg, blurb: "Built almost entirely through AI-driven development." },
    { title: "Datawow", tag: "Company Site · Thailand", img: datawowImg, blurb: "Studio site, case studies, SEO baked in." },
    { title: "Datawow Blog", tag: "Engineering Blog", img: datawowBlogImg, blurb: "Fast publishing, Search Console tracked." },
    { title: "DriveSafe", tag: "Fleet Portal · Thailand/Japan", img: drivesafeImg, blurb: "UI/UX and frontend, end to end." },
    { title: "DriveSafe Map", tag: "Live Map View", img: drivesafeMapImg, blurb: "Real-time tracking over WebSocket." },
    { title: "EasyPay", tag: "Mobile Money · Myanmar", img: easypayImg, blurb: "Burmese-first, cash-in cash-out flows." },
    { title: "Telenor Myanmar", tag: "Telecom Campaign", img: telenorImg, blurb: "Mobile packages, device bundles." },
    { title: "Pizza Hut Myanmar", tag: "Food Delivery", img: pizzahutImg, blurb: "Ordering, delivery, checkout." },
];

const CatCameo = ({ src, size = 80 }) => (
    <div
        className="shrink-0"
        style={{
            width: 64,
            height: 64,
            backgroundImage: `url(${src})`,
            backgroundPosition: "0 0",
            imageRendering: "pixelated",
            transform: `scale(${size / 64})`,
            transformOrigin: "top left",
        }}
    />
);

const ChapterPanel = ({ chapter, index }) => {
    const flipped = index % 2 === 1;

    return (
        <div className="reveal relative w-full max-w-4xl mx-auto px-5 md:px-0">
            <div
                className={`relative flex flex-col ${flipped ? "md:flex-row-reverse" : "md:flex-row"} items-stretch gap-0 border-[3px] border-[#1C1410] bg-[#FBF4E6] shadow-[8px_8px_0_#1C1410] rounded-sm overflow-hidden`}
            >
                <div className="md:w-[180px] shrink-0 flex items-center justify-center bg-[#F0DCC0] border-b-[3px] md:border-b-0 md:border-r-[3px] border-[#1C1410] py-8 md:py-0">
                    <div style={{ width: 80, height: 80, position: "relative", overflow: "hidden" }}>
                        <CatCameo src={chapter.mood} size={80} />
                    </div>
                </div>

                <div className="flex-1 p-6 md:p-8 flex flex-col gap-3">
                    <div className="flex items-baseline justify-between flex-wrap gap-2">
                        <span className="font-signature text-2xl text-maroon">{chapter.episode}</span>
                        <span className="font-raleway text-xs tracking-[0.15em] uppercase text-muted">{chapter.year}</span>
                    </div>

                    <h3 className="hero__title font-saunde uppercase text-secondary leading-none text-2xl md:text-3xl">
                        {chapter.company}
                    </h3>
                    <p className="font-raleway text-xs tracking-[0.1em] uppercase text-muted">
                        {chapter.role} — {chapter.place}
                    </p>

                    <p className="font-raleway text-sm text-secondary leading-relaxed mt-1">{chapter.caption}</p>

                    <div className="relative mt-2 self-start max-w-sm bg-white border-2 border-[#1C1410] rounded-2xl px-4 py-2">
                        <span className="font-signature text-lg text-maroon leading-none">{chapter.quote}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                        {chapter.tech.map((t) => (
                            <span
                                key={t}
                                className="font-raleway text-[0.65rem] tracking-[0.05em] uppercase text-secondary border border-[#1C1410] rounded-full px-3 py-1 bg-[#F0DCC0]"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuestCard = ({ quest }) => (
    <div className="reveal border-[3px] border-[#1C1410] bg-[#FBF4E6] shadow-[6px_6px_0_#1C1410] overflow-hidden flex flex-col">
        <div className="w-full aspect-[16/10] overflow-hidden border-b-[3px] border-[#1C1410] bg-[#F0DCC0]">
            <img src={quest.img} alt={quest.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-4 flex flex-col gap-1">
            <span className="font-raleway text-[0.65rem] tracking-[0.1em] uppercase text-muted">{quest.tag}</span>
            <h4 className="hero__title font-saunde uppercase text-secondary text-lg leading-none">{quest.title}</h4>
            <p className="font-raleway text-xs text-secondary leading-relaxed mt-1">{quest.blurb}</p>
        </div>
    </div>
);

const ChapterDivider = ({ kicker, title }) => (
    <div className="reveal relative w-full max-w-4xl mx-auto px-5 md:px-0 flex flex-col items-center text-center gap-2 py-4">
        <span className="font-raleway text-xs tracking-[0.3em] uppercase text-muted">{kicker}</span>
        <h2 className="hero__title font-saunde uppercase text-maroon text-4xl md:text-6xl leading-none text-outline">
            {title}
        </h2>
        <div className="w-16 h-1 bg-maroon rounded-full mt-2" />
    </div>
);

const Story = () => {
    const rootRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray(".reveal").forEach((el) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 60 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 88%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={rootRef}
            className="min-h-screen bg-[#F0DCC0] bg-primary"
            style={{
                backgroundImage:
                    "radial-gradient(rgba(28,20,16,0.08) 1px, transparent 1px), radial-gradient(rgba(28,20,16,0.08) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                backgroundPosition: "0 0, 11px 11px",
            }}
        >
            {/* Cover */}
            <section className="relative flex flex-col items-center justify-center gap-6 px-6 py-24 md:py-32 text-center">
                <span className="font-raleway text-xs tracking-[0.35em] uppercase text-muted">An Origin Story</span>
                <h1 className="hero__title font-saunde uppercase text-maroon text-outline leading-none text-6xl md:text-[8rem]">
                    Eaint
                </h1>
                <p className="font-raleway text-sm md:text-base text-secondary max-w-md">
                    Frontend Developer crafting elegant, performant, user-centered web experiences — one chapter at a time.
                </p>

                <div className="mt-2" style={{ width: 96, height: 96, position: "relative", overflow: "hidden" }}>
                    <CatCameo src={Chilling} size={96} />
                </div>

                <div className="mt-6 inline-block bg-white border-2 border-[#1C1410] rounded-2xl px-5 py-3 max-w-md">
                    <span className="font-signature text-xl text-maroon leading-snug">
                        &ldquo;Craft was never the easy part. It is letting the mind run alongside the machine, in search of greater
                        creations.&rdquo;
                    </span>
                </div>

                <span className="font-raleway text-xs tracking-[0.2em] uppercase text-muted mt-8 animate-pulse">
                    Scroll to begin ↓
                </span>
            </section>

            {/* Stats */}
            <section className="reveal max-w-4xl mx-auto px-6 pb-20 grid grid-cols-2 md:grid-cols-4 gap-4">
                {STATS.map((stat) => (
                    <div
                        key={stat.label}
                        className="flex flex-col items-center gap-1 border-[3px] border-[#1C1410] bg-[#FBF4E6] shadow-[5px_5px_0_#1C1410] py-5 px-2 text-center"
                    >
                        <span className="hero__title font-saunde text-3xl leading-none" style={{ color: "#D1352B" }}>{stat.value}</span>
                        <span className="font-raleway text-[0.65rem] tracking-[0.1em] uppercase text-muted">{stat.label}</span>
                    </div>
                ))}
            </section>

            {/* Origin blurb */}
            <section className="reveal max-w-2xl mx-auto px-6 pb-24 text-center">
                <p className="font-raleway text-sm md:text-base text-secondary leading-relaxed">
                    Based in Thailand, working worldwide. Nine years deep into frontend and design-focused engineering, with a
                    growing full-stack range across e-commerce, fintech, and telecom. These are the chapters so far.
                </p>
            </section>

            {/* Chapters */}
            <ChapterDivider kicker="Part One" title="The Journey" />
            <div className="flex flex-col gap-10 py-14">
                {CHAPTERS.map((chapter, i) => (
                    <ChapterPanel key={chapter.company} chapter={chapter} index={i} />
                ))}
            </div>

            {/* Quests */}
            <ChapterDivider kicker="Part Two" title="Side Quests" />
            <section className="max-w-5xl mx-auto px-5 md:px-0 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {QUESTS.map((quest) => (
                    <QuestCard key={quest.title} quest={quest} />
                ))}
            </section>

            {/* Allies / world */}
            <ChapterDivider kicker="Part Three" title="Allies" />
            <section className="reveal max-w-3xl mx-auto px-6 py-14 text-center flex flex-col items-center gap-4">
                <p className="font-raleway text-sm text-secondary">Worked across 5 countries, shoulder to shoulder with:</p>
                <div className="flex flex-wrap justify-center gap-3">
                    {["Myanmar", "Thailand", "Japan", "Germany", "Norway"].map((c) => (
                        <span
                            key={c}
                            className="font-raleway text-xs tracking-[0.1em] uppercase text-secondary border-2 border-[#1C1410] rounded-full px-4 py-2 bg-[#FBF4E6]"
                        >
                            {c}
                        </span>
                    ))}
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {["Telenor Myanmar", "Pizza Hut Myanmar", "Nagase Thailand", "Rapid Data GmbH", "BAM Thailand"].map((c) => (
                        <span key={c} className="font-raleway text-xs text-muted">
                            {c}
                        </span>
                    ))}
                </div>
            </section>

            {/* Finale */}
            <section className="reveal relative flex flex-col items-center justify-center gap-6 px-6 py-28 text-center">
                <div style={{ width: 90, height: 90, position: "relative", overflow: "hidden" }}>
                    <CatCameo src={Happy} size={90} />
                </div>
                <h2 className="hero__title font-saunde uppercase text-maroon text-outline leading-none text-4xl md:text-6xl">
                    To Be Continued
                </h2>
                <p className="font-raleway text-sm text-secondary max-w-md">
                    The next chapter is still unwritten — maybe it's one we write together.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                    <a
                        href="/"
                        className="font-raleway text-xs tracking-[0.15em] uppercase border-2 border-[#1C1410] rounded-full px-6 py-3 bg-[#FBF4E6] text-secondary hover:bg-maroon hover:text-white transition-colors"
                    >
                        Back to Portfolio
                    </a>
                    <a
                        href="mailto:eaintzm@gmail.com"
                        className="font-raleway text-xs tracking-[0.15em] uppercase border-2 border-[#1C1410] rounded-full px-6 py-3 bg-maroon text-white hover:bg-[#1C1410] transition-colors"
                    >
                        Say Hi
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Story;
