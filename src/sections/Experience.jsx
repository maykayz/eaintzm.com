import DbotLogo from '../assets/images/logos/dbot.png';
import DatawowLogo from '../assets/images/logos/datawow.svg';
import DrvrLogo from '../assets/images/logos/drvr.png';
import AgdBankLogo from '../assets/images/logos/agdbank.svg';
import Rgo47Logo from '../assets/images/logos/rgo47.webp';
import CreativeLogo from '../assets/images/logos/creative.png';
import JourneyMap from '../components/JourneyMap';

const jobList = [
    {
        company: "Dbot",
        logo: DbotLogo,
        position: "Software Engineer",
        duration: "November 2026 - Present",
        country: "Thailand",
        summary: "Building a Funeral ERP system and Memorial Page for Rapid Data GmbH, from day-to-day funeral operations to AI-driven development.",
        highlights: [
            "Built the Funeral ERP system covering the full funeral process, from picking up the deceased to ceremonies, cremation and urns, integrated with Norway's Digital Gravferdsmelding (DGM) platform for death notices and permits.",
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

const JobContent = ({ job, align = "left" }) => (
    <div className={`flex flex-col gap-3 ${align === "right" ? "text-right items-end" : "text-left items-start"}`}>
        <div className={`flex flex-row flex-wrap items-center gap-3 ${align === "right" ? "flex-row-reverse" : ""}`}>
            {job.logo && (
                <span className="w-9 h-9 rounded-lg bg-white flex items-center justify-center overflow-hidden shrink-0">
                    <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-contain p-1" />
                </span>
            )}
            <h3 className="hero__title text-secondary font-saunde lg:text-3xl md:text-2xl text-xl uppercase">
                {job.company}
            </h3>
            <span className="text-muted font-raleway text-xs tracking-[0.1em] uppercase">
                {job.country}
            </span>
        </div>

        <span className="font-raleway text-base text-maroon">{job.position}</span>

        {job.summary && (
            <p className="text-secondary font-raleway text-sm md:text-base leading-relaxed max-w-md">
                {job.summary}
            </p>
        )}

        {job.highlights && (
            <ul className={`flex flex-col gap-1.5 max-w-md list-none ${align === "right" ? "items-end" : "items-start"}`}>
                {job.highlights.map((item) => (
                    <li
                        key={item}
                        className={`text-muted font-raleway text-sm md:text-base leading-relaxed relative ${
                            align === "right"
                                ? "pr-4 before:content-['•'] before:absolute before:right-0 before:text-maroon"
                                : "pl-4 before:content-['•'] before:absolute before:left-0 before:text-maroon"
                        }`}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        )}

        {job.techStack && (
            <div className={`flex flex-row flex-wrap gap-2 ${align === "right" ? "justify-end" : "justify-start"}`}>
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
);

const MobileTimelineEntry = ({ job, isLast }) => (
    <div className="reveal grid grid-cols-[2.5rem_1fr] gap-4">
        <div className="flex flex-col items-center">
            <span className="w-3 h-3 rounded-full bg-maroon shrink-0 mt-2" />
            {!isLast && <span className="w-px flex-1 bg-stone-800 mt-2" />}
        </div>
        <div className="pb-14">
            <span className="text-muted font-raleway text-xs block mb-2">{job.duration}</span>
            <JobContent job={job} align="left" />
        </div>
    </div>
);

const DesktopTimelineEntry = ({ job, index }) => {
    const alignLeft = index % 2 === 0;
    return (
        <div className="reveal relative grid grid-cols-2 gap-16 pb-20">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center gap-2 z-10">
                <span className="w-3 h-3 rounded-full bg-maroon shrink-0" />
                <span className="text-muted font-raleway text-[0.7rem] whitespace-nowrap text-center">
                    {job.duration}
                </span>
            </div>

            <div className={alignLeft ? "flex justify-end pr-12" : "col-start-2 flex justify-start pl-12"}>
                <JobContent job={job} align={alignLeft ? "right" : "left"} />
            </div>
        </div>
    );
};

const Experience = () => {
    return (
        <section className="section relative px-6 md:px-12 py-16 md:py-24">
            <div className="reveal flex flex-row justify-between items-start section-marker text-muted">
                <span>Experience</span>
                <span className="hidden md:block">9 Years</span>
            </div>

            <div className="reveal flex flex-col gap-4 mt-10 md:mt-14 max-w-2xl">
                <h1 className="hero__title text-outline text-tan font-saunde leading-[0.85] lg:text-[4.5rem] md:text-5xl text-4xl uppercase">
                    Professional
                </h1>
                <h1 className="hero__title text-maroon font-saunde leading-[0.85] lg:text-[4.5rem] md:text-5xl text-4xl uppercase -mt-2 md:-mt-4">
                    Experience
                </h1>
                <p className="text-secondary font-raleway leading-loose">
                    Experienced Software Engineer with 9 years in web development, frontend-focused and design-focused, with growing full-stack range. Strong experience in e-commerce, fintech, and telecom sectors. Currently working as a Software Engineer supporting clients across the DACH region as an outsourced developer, building a Funeral ERP system and Memorial websites.
                </p>
            </div>

            <JourneyMap />

            {/* Mobile: left-aligned stacked timeline */}
            <div className="md:hidden flex flex-col mt-14 max-w-3xl">
                {jobList.map((job, index) => (
                    <MobileTimelineEntry key={job.company} job={job} isLast={index === jobList.length - 1} />
                ))}
            </div>

            {/* Desktop: centered line, alternating left/right, years on the line */}
            <div className="hidden md:block relative mt-20 max-w-4xl mx-auto">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-stone-800 -translate-x-1/2" />
                {jobList.map((job, index) => (
                    <DesktopTimelineEntry key={job.company} job={job} index={index} />
                ))}
            </div>
        </section>
    );
};

export default Experience;
