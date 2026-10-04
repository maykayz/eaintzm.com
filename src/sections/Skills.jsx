import { useMemo } from "react";
import { renderToStaticMarkup } from "react-dom/server";
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
    SiHtml5,
    SiCss,
    SiSass,
    SiShadcnui,
    SiJquery,
    SiWebpack,
    SiNpm,
    SiExpress,
    SiSwagger,
    SiJsonwebtokens,
    SiJest,
    SiCloudflare,
} from "react-icons/si";
import { FiLayers, FiSearch, FiEye, FiShare2, FiCpu } from "react-icons/fi";
import { MdAccessibility } from "react-icons/md";
import { FaCookieBite, FaAws } from "react-icons/fa6";
import { BsOpenai } from "react-icons/bs";
import { TbBrandAzure } from "react-icons/tb";
import { VscAzureDevops } from "react-icons/vsc";
import { skillCategories } from "../data/skills";
import DomeGallery from "../components/DomeGallery";
import Aurora from "../components/Aurora";

const ICONS = {
    "React": SiReact,
    "Next.js": SiNextdotjs,
    "Nuxt.js": SiNuxt,
    "React Native": SiReact,
    "TypeScript": SiTypescript,
    "JavaScript": SiJavascript,
    "Vue": SiVuedotjs,
    "HTML": SiHtml5,
    "CSS": SiCss,
    "SCSS": SiSass,
    "Tailwind CSS": SiTailwindcss,
    "Material UI": SiMui,
    "shadcn/ui": SiShadcnui,
    "jQuery": SiJquery,
    "Webpack": SiWebpack,
    "npm": SiNpm,
    "GSAP": SiGreensock,
    "AOS": FiLayers,
    "Scroll-driven UI": FiLayers,
    "Node.js": SiNodedotjs,
    "NestJS": SiNestjs,
    "Express.js": SiExpress,
    "Prisma": SiPrisma,
    "MySQL": SiMysql,
    "Docker": SiDocker,
    "Azure": TbBrandAzure,
    "AWS": FaAws,
    "Cloudflare": SiCloudflare,
    "REST API": FiShare2,
    "Swagger": SiSwagger,
    "JWT / OAuth": SiJsonwebtokens,
    "Jest": SiJest,
    "Claude Code": SiAnthropic,
    "Claude Design": SiAnthropic,
    "ADO AI": VscAzureDevops,
    "GitHub Copilot": SiGithubcopilot,
    "OpenAI API": BsOpenai,
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
    "HTML": "#E34F26",
    "CSS": "#1572B6",
    "SCSS": "#CF649A",
    "Tailwind CSS": "#38BDF8",
    "Material UI": "#007FFF",
    "shadcn/ui": "#8C8178",
    "jQuery": "#0769AD",
    "Webpack": "#8DD6F9",
    "npm": "#CB3837",
    "Node.js": "#5FA04E",
    "NestJS": "#E0234E",
    "Express.js": "#8C8178",
    "Prisma": "#5A4FCF",
    "MySQL": "#4479A1",
    "Docker": "#2496ED",
    "Azure": "#0078D4",
    "AWS": "#FF9900",
    "Cloudflare": "#F38020",
    "REST API": "#9C4C57",
    "Swagger": "#85EA2D",
    "JWT / OAuth": "#D63AFF",
    "Jest": "#C21325",
    "Claude Code": "#D97757",
    "Claude Design": "#D97757",
    "ADO AI": "#0078D7",
    "GitHub Copilot": "#8957E5",
    "OpenAI API": "#10A37F",
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


const ALL_SKILLS = skillCategories.flatMap((c) => c.skills);

const MOBILE_SKILLS = [
    "React", "Next.js", "Vue", "TypeScript", "JavaScript", "Tailwind CSS",
    "Node.js", "MySQL", "Docker", "AWS", "Azure",
    "Google Analytics", "Jest", "Claude Code", "GitHub Copilot", "Sentry",
];

const escapeXml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const skillToDataUri = (skill) => {
    const Icon = ICONS[skill] || FiCpu;
    const color = BRAND_COLORS[skill] || "#C98A93";
    const iconMarkup = renderToStaticMarkup(<Icon color={color} size={56} />);
    const label = skill.length > 16 ? `${skill.slice(0, 15)}…` : skill;

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
        <rect width="220" height="220" fill="#15161A"/>
        <circle cx="110" cy="88" r="40" fill="${color}26"/>
        <g transform="translate(82,60)">${iconMarkup}</g>
        <text x="110" y="162" font-family="Raleway, sans-serif" font-size="16" fill="#EDE6DC" text-anchor="middle">${escapeXml(label)}</text>
    </svg>`;

    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const Skills = () => {
    const images = useMemo(
        () => ALL_SKILLS.map((skill) => ({ src: skillToDataUri(skill), alt: skill })),
        []
    );

    return (
        <section
            className="theme-dark relative px-6 md:px-12 py-10 md:py-6 md:h-screen overflow-hidden flex flex-col justify-center"
            style={{ backgroundColor: "#0B0B0C" }}
        >
            <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
                <Aurora
                    colorStops={["#3A1116", "#7A2430", "#C98A93"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.5}
                />
            </div>

            <div className="reveal relative md:absolute top-0 md:top-8 left-0 md:left-12 right-0 md:right-12 z-10 flex flex-row justify-between items-start section-marker text-muted">
                <span>Tech & Tools</span>
                <span className="hidden md:block">Area of Expertise</span>
            </div>

            <div className="reveal relative z-10 flex flex-col items-center gap-2 max-w-2xl mx-auto text-center shrink-0 mt-6 md:mt-0">
                <h1 className="hero__title text-tan font-saunde uppercase leading-none text-4xl md:text-5xl lg:text-6xl">
                    Tech & Tools
                </h1>
            </div>

            <div className="hidden md:block reveal relative z-10 mt-4 md:mt-6" style={{ height: "500px" }}>
                <DomeGallery
                    images={images}
                    fit={0.35}
                    minRadius={220}
                    padFactor={0.1}
                    grayscale={false}
                    overlayBlurColor="transparent"
                    imageBorderRadius="20px"
                    openedImageBorderRadius="20px"
                    openedImageWidth="260px"
                    openedImageHeight="260px"
                    segments={ALL_SKILLS.length <= 16 ? 16 : 30}
                    autoRotateSpeed={4}
                />
            </div>

            <div className="md:hidden reveal relative z-10 flex flex-wrap justify-center gap-2 mt-8">
                {MOBILE_SKILLS.map((skill) => {
                    const Icon = ICONS[skill] || FiCpu;
                    const color = BRAND_COLORS[skill] || "#C98A93";
                    return (
                        <span
                            key={skill}
                            className="flex items-center gap-2 font-raleway text-xs text-[#EDE6DC] bg-white/5 border border-white/10 rounded-full px-3 py-1.5"
                        >
                            <Icon color={color} size={14} />
                            {skill}
                        </span>
                    );
                })}
            </div>
        </section>
    );
};

export default Skills;
