import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Dopa from "../assets/images/portfolio/dopa.png";
import Datawow from "../assets/images/portfolio/datawow.png";
import DriveSafeDrvr from "../assets/images/portfolio/drivesafe-map.jpg";
import EasyPay from "../assets/images/portfolio/easypay.jpg";
import Telenor from "../assets/images/portfolio/telenor.jpg";
import PizzaHut from "../assets/images/portfolio/pizzahut.jpg";
import Aurora from "../components/Aurora";
import TelenorLogo from "../assets/images/logos/telenor.png";
import PizzaHutLogo from "../assets/images/logos/pizzahut.png";
import NagaseLogo from "../assets/images/logos/nagase.svg";
import RapidDataLogo from "../assets/images/logos/rapiddata.png";
import BamThailandLogo from "../assets/images/logos/bam-thailand.svg";

const clients = [
    { name: "Telenor Myanmar", logo: TelenorLogo },
    { name: "Pizza Hut Myanmar", logo: PizzaHutLogo },
    { name: "Nagase Thailand", logo: NagaseLogo },
    { name: "Rapid Data GmbH", logo: RapidDataLogo, size: "h-10 md:h-48" },
    { name: "BAM Thailand", logo: BamThailandLogo },
];

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        category: "Gacha Web App · Japan",
        status: "Live",
        title: "Dopa",
        url: "dopa.co.jp",
        description: "A gacha-style rewards web app built for a Japanese client, with smooth animated reveals designed for mobile-first play.",
        features: ["Mobile-first gacha UI", "Animated reveal sequences", "Localized for JP audience", "Lightweight, fast load"],
        tech: ["React", "Next.js", "TypeScript"],
        image: Dopa,
    },
    {
        category: "Company Website · Thailand",
        status: "Live",
        title: "Datawow",
        url: "datawow.co",
        description: "Company website for Datawow, a software studio in Bangkok, showcasing products, case studies and team culture.",
        features: ["Product showcase", "Team & culture pages", "SEO-optimized structure", "Google Analytics & GTM"],
        tech: ["Next.js", "Tailwind CSS", "Storybook"],
        image: Datawow,
    },
    {
        category: "Live Map View · Thailand & Japan",
        status: "Live",
        title: "DriveSafe Map",
        url: "drvr.co/map",
        description: "Real-time map view inside DriveSafe, tracking driving status, stops and tire pressure over a live WebSocket feed.",
        features: ["Live map tracking", "Driving status overlay", "Tire pressure display", "Stop & idle detection"],
        tech: ["React", "WebSocket"],
        image: DriveSafeDrvr,
    },
    {
        category: "Mobile Money · Myanmar",
        status: "Live",
        title: "EasyPay",
        url: "easypay.com.mm",
        description: "Marketing website for EasyPay, a mobile money platform in Myanmar, built in Burmese for cash-in, cash-out and agent onboarding.",
        features: ["Burmese localization", "Agent network pages", "USSD how-to guides", "Cash-in / cash-out flows"],
        tech: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "CMS"],
        image: EasyPay,
    },
    {
        category: "Telecom · Myanmar",
        status: "Live",
        title: "Telenor Myanmar",
        url: "telenor.com.mm",
        description: "Campaign microsite for Telenor Myanmar, a telecom operator, promoting mobile packages and device bundles for Myanmar customers.",
        features: ["Package & bundle promos", "Device bundle showcase", "Burmese localization", "Mobile-first layout"],
        tech: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "CMS"],
        image: Telenor,
    },
    {
        category: "Food Delivery · Myanmar",
        status: "Live",
        title: "Pizza Hut Myanmar",
        url: "pizzahut.com.mm",
        description: "Online ordering site for Pizza Hut Myanmar, supporting delivery and pickup orders with promotions across the menu.",
        features: ["Online ordering flow", "Delivery & pickup modes", "Promotions & deals", "Basket & checkout"],
        tech: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "CMS"],
        image: PizzaHut,
    },
];

const UNITS_PER_PROJECT = 2.9; // 1 unit = 100vh of scroll per project

const Portfolio = () => {
    const wrapperRef = useRef(null);
    const pinRef = useRef(null);
    const panelRefs = useRef([]);
    const textRefs = useRef([]);
    const mockupRefs = useRef([]);
    const tickRefs = useRef([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                gsap.set(panelRefs.current, { opacity: 0 });
                gsap.set(panelRefs.current[0], { opacity: 1 });
                gsap.set(textRefs.current, { scale: 1 });
                gsap.set(mockupRefs.current, { rotationY: 5, x: 40, transformPerspective: 800 });
                gsap.set(mockupRefs.current[0], { rotationY: 0, x: 0 });
                gsap.set(tickRefs.current, { backgroundColor: "#8C8178" });
                gsap.set(tickRefs.current[0], { backgroundColor: "#7A2430" });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.1,
                        pin: pinRef.current,
                        pinSpacing: false,
                        anticipatePin: 1,
                    },
                });

                projects.forEach((_, i) => {
                    if (i === 0) return;

                    tl.addLabel(`proj${i}`)
                        .to(panelRefs.current[i - 1], { opacity: 0, duration: 0.6 }, `proj${i}`)
                        .to(textRefs.current[i - 1], { scale: 1.08, duration: 0.6 }, `proj${i}`)
                        .to(mockupRefs.current[i - 1], { rotationY: -5, x: -40, duration: 0.6 }, `proj${i}`)
                        .to(tickRefs.current[i - 1], { backgroundColor: "#8C8178", duration: 0.4 }, `proj${i}`)
                        .to(panelRefs.current[i], { opacity: 1, duration: 0.6 }, `proj${i}+=0.6`)
                        .to(mockupRefs.current[i], { rotationY: 0, x: 0, duration: 0.6 }, `proj${i}+=0.6`)
                        .to(tickRefs.current[i], { backgroundColor: "#7A2430", duration: 0.4 }, `proj${i}+=0.6`);
                });

                const lastIndex = projects.length - 1;
                tl.addLabel("exit-last")
                    .to(panelRefs.current[lastIndex], { opacity: 0, duration: 0.6 }, "exit-last")
                    .to(textRefs.current[lastIndex], { scale: 1.08, duration: 0.6 }, "exit-last")
                    .to(mockupRefs.current[lastIndex], { rotationY: -5, x: -40, duration: 0.6 }, "exit-last")
                    .to(tickRefs.current[lastIndex], { backgroundColor: "#8C8178", duration: 0.4 }, "exit-last");

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
            {/* Desktop: pinned, scroll-locked case studies */}
            <div
                ref={wrapperRef}
                className="hidden md:block relative"
                style={{ height: `${(projects.length + 1) * UNITS_PER_PROJECT * 100}vh` }}
            >
                <div ref={pinRef} className="theme-dark relative h-screen flex flex-col overflow-hidden px-6 md:px-12 bg-primary">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <Aurora
                            colorStops={["#3A1116", "#7A2430", "#C98A93"]}
                            blend={0.5}
                            amplitude={1.0}
                            speed={0.5}
                        />
                    </div>

                    <div className="reveal relative z-10 flex flex-row justify-between items-start section-marker text-muted pt-8 md:pt-10 shrink-0">
                        <span>Portfolio</span>
                        <span className="hidden md:block">Selected Work</span>
                    </div>

                    <div className="relative z-10 flex-1 flex flex-row items-center gap-6 min-h-0">
                <div className="relative flex-1 h-full" style={{ perspective: "1200px" }}>
                    {projects.map((project, index) => (
                        <div
                            key={project.title}
                            ref={(el) => (panelRefs.current[index] = el)}
                            className="absolute inset-0 grid grid-cols-12 gap-10 items-center"
                        >
                            <div
                                ref={(el) => (textRefs.current[index] = el)}
                                className="col-span-5 flex flex-col gap-5 text-left"
                            >
                                <div className="flex flex-row items-center gap-3 font-raleway text-xs tracking-[0.15em] uppercase text-muted">
                                    <span>{project.category}</span>
                                </div>

                                <h3 className="hero__title italic font-saunde text-tan text-4xl lg:text-5xl">
                                    {project.title}
                                </h3>

                                <p className="font-raleway text-sm md:text-base text-secondary leading-relaxed max-w-md">
                                    {project.description}
                                </p>

                                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 max-w-md list-none">
                                    {project.features.map((item) => (
                                        <li
                                            key={item}
                                            className="font-raleway text-xs md:text-sm text-muted pl-4 relative before:content-['◆'] before:absolute before:left-0 before:text-[0.5rem] before:top-1 before:text-maroon"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-row flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="font-raleway text-[0.65rem] tracking-[0.05em] uppercase text-muted border border-stone-700 rounded-full px-3 py-1"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div
                                ref={(el) => (mockupRefs.current[index] = el)}
                                className="col-span-7 flex items-center justify-center"
                            >
                                <div className="theme-dark rounded-xl overflow-hidden border border-stone-700 bg-primary w-full scale-[0.8]">
                                    <div className="flex flex-row items-center gap-3 px-4 py-3 border-b border-stone-700">
                                        <div className="flex flex-row gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#E05B4F]" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#E0B84F]" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#4FE07A]" />
                                        </div>
                                    </div>
                                    <div className="relative w-full max-h-[60vh] overflow-hidden bg-primary">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-auto block"
                                        />
                                        <div className="absolute inset-0 bg-black/35" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                    <div className="flex flex-col items-center gap-3 shrink-0">
                        {projects.map((_, index) => (
                            <span
                                key={index}
                                ref={(el) => (tickRefs.current[index] = el)}
                                className="w-1 h-6 rounded-sm"
                            />
                        ))}
                    </div>
                    </div>
                </div>
            </div>

            {/* Mobile: simple static stack, no pin/scrub */}
            <div className="md:hidden reveal flex flex-row justify-between items-start section-marker text-muted px-6 pt-8">
                <span>Portfolio</span>
                <span>Selected Work</span>
            </div>
            <div className="md:hidden flex flex-col gap-16 px-6 py-10">
                {projects.map((project, index) => (
                    <div key={project.title} className="reveal flex flex-col gap-5 text-left">
                        <div className="flex flex-row items-center gap-3 font-raleway text-xs tracking-[0.15em] uppercase text-muted">
                            <span>{project.category}</span>
                        </div>

                        <h3 className="hero__title italic font-saunde text-tan text-3xl">
                            {project.title}
                        </h3>

                        <div className="theme-dark rounded-xl overflow-hidden border border-stone-700 bg-primary">
                            <div className="flex flex-row items-center gap-3 px-4 py-3 border-b border-stone-700">
                                <div className="flex flex-row gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#E05B4F]" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#E0B84F]" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#4FE07A]" />
                                </div>
                            </div>
                            <div className="relative w-full h-48 overflow-hidden bg-primary">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover block" />
                                <div className="absolute inset-0 bg-black/35" />
                            </div>
                        </div>

                        <p className="font-raleway text-sm text-secondary leading-relaxed">
                            {project.description}
                        </p>

                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 list-none">
                            {project.features.map((item) => (
                                <li
                                    key={item}
                                    className="font-raleway text-xs text-muted pl-4 relative before:content-['◆'] before:absolute before:left-0 before:text-[0.5rem] before:top-1 before:text-maroon"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-row flex-wrap gap-2">
                            {project.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className="font-raleway text-[0.65rem] tracking-[0.05em] uppercase text-muted border border-stone-700 rounded-full px-3 py-1"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="reveal flex flex-col gap-10 md:gap-16 px-6 md:px-12 py-20 overflow-hidden">
                <div className="flex flex-row justify-between items-start section-marker text-muted">
                    <span>Clients</span>
                    <span className="hidden md:block">Worked With</span>
                </div>

                <div className="flex flex-col gap-3">
                    <h1
                        className="hero__title font-saunde leading-[0.85] lg:text-[4rem] md:text-5xl text-4xl uppercase"
                        style={{ color: "transparent", WebkitTextStroke: "1.5px var(--color-tan)" }}
                    >
                        5 Countries
                    </h1>
                    <p className="font-raleway text-sm text-muted">
                        Myanmar · Thailand · Japan · Germany · Norway
                    </p>
                </div>

                <div className="marquee w-full">
                    <div className="marquee__track [animation-duration:12s]">
                        {[...clients, ...clients].map((client, index) => (
                            <div key={index} className="flex items-center px-4 shrink-0">
                                <img src={client.logo} alt={client.name} className={`${client.size || "h-5 md:h-24"} w-auto object-contain`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
