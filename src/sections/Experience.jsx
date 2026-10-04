import CardSwap, { Card } from '../components/CardSwap';
import Carousel from '../components/Carousel';
import DbotLogo from '../assets/images/logos/dbot.png';
import DatawowLogo from '../assets/images/logos/datawow.svg';
import DrvrLogo from '../assets/images/logos/drvr.png';
import AgdBankLogo from '../assets/images/logos/agdbank.svg';
import Rgo47Logo from '../assets/images/logos/rgo47.webp';
import CreativeLogo from '../assets/images/logos/creative.png';

const jobList = [
    {
        company: "Dbot",
        logo: DbotLogo,
        position: "Software Engineer",
        duration: "November 2026 - Present",
        durationNumber: "2026 - Present",
        year: "2026",
        summary: "Building a Funeral ERP system and Memorial Page for Rapid Data GmbH, from day-to-day funeral operations to AI-driven development, following accessibility and EU standards, with Matomo for tracking.",
        techStack: ["Next.js", "TypeScript", "C#.NET", "PostgreSQL", "Azure", "Claude Code", "Matomo"]
    },
    {
        company: "Datawow",
        logo: DatawowLogo,
        position: "Frontend Developer",
        duration: "April 2024 - October 2025",
        durationNumber: "2024 - 2025",
        year: "2024",
        summary: "Developed and maintained front-end web applications with Next.js, from reproducing issues and fixing bugs to integrating Google Analytics and Google Tag Manager for behavior tracking, and upheld code quality through reviews and testing.",
        techStack: ["Next.js", "React", "TypeScript", "Google Analytics", "Google Tag Manager", "Sentry", "Microsoft Clarity"]
    },
    {
        company: "DRVR",
        logo: DrvrLogo,
        position: "Software Engineer, Frontend and UI/UX",
        duration: "July 2022 - April 2024",
        durationNumber: "2022 - 2024",
        year: "2022",
        summary: "Built and maintained internal platforms for tracking and analyzing driving behavior using React.js and MUI, integrating Mapbox and HERE Maps for real-time tracking, data-centric dashboards, and customizable reports. Designed the UI/UX across products and mentored junior developers.",
        techStack: ["React.js", "MUI", "Mapbox", "HERE Maps", "WordPress"]
    },
    {
        company: "AGDBank",
        logo: AgdBankLogo,
        position: "React Developer",
        duration: "July 2021 - July 2022",
        durationNumber: "2021 - 2022",
        year: "2021",
        summary: "Engineered and maintained the web-based wallet management portal with React.js, and played a key role building the Business Wallet App with React Native. Identified and fixed bugs, and contributed to requirements and feature discussions through Agile practices.",
        techStack: ["React", "React Native", "Agile"]
    },
    {
        company: "rgo47",
        logo: Rgo47Logo,
        position: "Senior Frontend Developer",
        duration: "October 2019 - May 2021",
        durationNumber: "2019 - 2021",
        year: "2019",
        summary: "Designed UI/UX and built frontend for Seller Center, Sale Manager portal, ERP system, and delivery portal using Vue.js and Vuex. Built an internal UI component library and an npm package for shared micro-service components.",
        techStack: ["Vue.js", "Nuxt.js", "Vuex", "Webpack"]
    },
    {
        company: "CREATiVE",
        logo: CreativeLogo,
        position: "Senior Frontend Developer",
        duration: "March 2017 - October 2019",
        durationNumber: "2017 - 2019",
        summary: "Turned design mockups into production websites for clients including Telenor Myanmar, Pizza Hut Myanmar, and Mango Media. Built a CSS theme library and jQuery plugins, developed the Telenor Myanmar website along with its MyAccount and SIM Registration portals, and tracked user behavior with Google Tag Manager and Google Analytics.",
        techStack: ["jQuery", "CSS", "Google Tag Manager", "Google Analytics"],
        year: "2017"
    }
];

const JobCardContent = ({ job, index }) => (
    <div
        className="relative h-full w-full flex flex-col"
        style={{ backgroundColor: "#2A0F13" }}
    >
        <div className="shrink-0 w-full flex items-center gap-3 px-4" style={{ backgroundColor: "#F8F2EA", height: "40px" }}>
            <span className="font-raleway text-[10px] md:text-xs tracking-[0.2em] text-[#2A0F13] select-none text-left">
                {String(index).padStart(2, "0")}
            </span>
            <span className="font-raleway text-xs font-bold tracking-[0.15em] uppercase text-[#6B2A33]">
                {job.company} ({job.durationNumber})
            </span>
        </div>

        <div className="flex flex-col flex-1 p-6 md:p-7 pt-4">

        <p className="font-raleway text-[#F7F2EA] text-sm md:text-base leading-snug flex-1 flex items-center mt-2 line-clamp-3 overflow-hidden">
            {job.summary || `${job.position} at ${job.company}, ${job.duration}.`}
        </p>

        {job.techStack?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2 pt-4">
                {job.techStack.map((tech) => (
                    <span
                        key={tech}
                        className="font-raleway text-[10px] md:text-xs text-[#2A0F13] bg-[#F8F2EA] rounded-full px-2 py-0.5"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#4A2126] shrink-0">
            <div className="flex flex-col gap-0.5 text-left">
                <span className="font-raleway font-semibold text-sm md:text-base text-[#F7F2EA] text-left">{job.position}</span>
                <span className="font-raleway text-xs md:text-sm text-[#B9A9A4] text-left">{job.duration}</span>
            </div>
            {job.logo && (
                <span className="w-10 h-10 rounded bg-white flex items-center justify-center overflow-hidden shrink-0">
                    <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-contain p-1" />
                </span>
            )}
        </div>
        </div>
    </div>
);

const Experience = () => (
    <section className="md:h-screen bg-grain relative px-6 md:px-12 py-10 md:py-5 overflow-hidden flex flex-col">
      <div className="relative w-full h-full flex flex-col">
        <div className="reveal relative z-10 flex flex-row justify-between items-start section-marker text-muted shrink-0">
            <span>Experience</span>
            <span className="hidden md:block">9 Years</span>
        </div>

        {/* Desktop: card stack */}
        <div className="hidden md:flex relative z-10 flex-1 flex-col items-center justify-center min-h-0 gap-40">
            <div className="reveal relative flex flex-col items-center gap-2 max-w-2xl mx-auto text-center shrink-0">
                <h1 className="hero__title text-maroon font-saunde leading-[0.85] text-3xl md:text-4xl lg:text-5xl uppercase">
                    Experience
                </h1>
                <p className="text-secondary font-raleway leading-snug text-xs md:text-sm">
                    Software Engineer with 9 years across frontend, design, and growing full-stack work.
                </p>
            </div>

            <div className="reveal relative mx-auto w-full shrink-0" style={{ height: "520px", maxWidth: "720px", transform: "translateX(-100px)" }}>
                <CardSwap
                    width={460}
                    height={380}
                    cardDistance={55}
                    verticalDistance={60}
                    delay={0}
                    pauseOnHover
                    easing="elastic"
                    skewAmount={0}
                >
                    {jobList.map((job, i) => (
                        <Card key={job.company} style={{ borderRadius: 14, border: "1px solid rgba(237,230,220,0.12)", overflow: "hidden", boxShadow: "2.5px 2.5px 0 #6B2A33" }}>
                            <JobCardContent job={job} index={jobList.length - i} />
                        </Card>
                    ))}
                </CardSwap>
            </div>
        </div>

        {/* Mobile: swipeable job card carousel */}
        <div className="md:hidden reveal relative z-10 flex flex-col items-center gap-6 mt-6">
            <h1 className="hero__title text-maroon font-saunde leading-[0.85] text-3xl uppercase">
                Experience
            </h1>

            <Carousel
                items={jobList.map((job, i) => ({ ...job, id: job.company, index: jobList.length - i }))}
                baseWidth={300}
                loop
                renderItem={(job) => (
                    <div
                        style={{ border: "1px solid rgba(237,230,220,0.12)", boxShadow: "2.5px 2.5px 0 #6B2A33", height: "440px" }}
                        className="rounded-xl overflow-hidden"
                    >
                        <JobCardContent job={job} index={job.index} />
                    </div>
                )}
            />
        </div>
      </div>
    </section>
);

export default Experience;
