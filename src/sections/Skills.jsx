import LiquidCircle from "../components/LiquidCircle";

import { firstSkillRows, secondSkillRows } from "../data/skills";

const Skills = () => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    // split secondSkillRows into two rows for mobile view
    const firstRow = secondSkillRows.slice(0, 4);
    const secondRow = secondSkillRows.slice(4, 6);


    return (
        <section className="hero h-screen section flex flex-col justify-center items-center px-4">
            <h1 className="hero__title text-white font-saunde lg:text-xl" data-aos="zoom-in" data-aos-duration="1000">Area of Expertise</h1>
            <div className="md:mt-10 mt-3" data-aos="fade-up" data-aos-delay="300">
                <div className="flex flex-row md:gap-8 gap-3">
                    <h1 className="hero__title text-white font-saunde lg:text-6xl md:text-3xl text-3xl h-fit mt-7">FRONTEND</h1>
                    <h1 className="hero__title text-secondary font-saunde lg:text-6xl md:text-3xl text-3xl h-fit mt-7">DEVELOPER</h1>
                </div>
            </div>
            <div className="md:mt-32 mt-20 mb-10 flex flex-col items-center" data-aos="fade-up" data-aos-delay="400">
              {
                isMobile && <div className="flex flex-row justify-around md:gap-3 gap-1 max-w-[80vw]">
                {
                    secondRow.map((skill, index) => (
                        <div key={index} data-aos="fade-up" data-aos-delay={`${500 + index * 100}`}>
                            <LiquidCircle 
                                label={skill.label}
                                percentage={skill.percentage}
                                variant={skill.variant}
                                startPercentage={skill.startPercentage} 
                            />
                        </div>
                    ))
                }
            </div>
              }
            <div className="flex flex-row justify-around md:gap-3 gap-1 max-w-[80vw]">
                {
                    firstSkillRows.map((skill, index) => (
                        <div key={index} data-aos="fade-up" data-aos-delay={`${500 + index * 100}`}>
                            <LiquidCircle 
                                label={skill.label}
                                percentage={skill.percentage}
                                variant={skill.variant}
                                startPercentage={skill.startPercentage} 
                            />
                        </div>
                    ))
                }
            </div>
            {
                !isMobile ?
                <div className="flex flex-row md:gap-3 gap-1 justify-around max-w-[80vw]">
                {
                    secondSkillRows.map((skill, index) => (
                        <div key={index} data-aos="fade-up" data-aos-delay={`${900 + index * 100}`}>
                            <LiquidCircle 
                                label={skill.label}
                                percentage={skill.percentage}
                                variant={skill.variant}
                                startPercentage={skill.startPercentage} 
                            />
                        </div>
                    ))
                }
            </div>
            : 
            <div className="flex flex-row md:gap-3 gap-1 justify-around max-w-[80vw]">
                {
                    firstRow.map((skill, index) => (
                        <div key={index} data-aos="fade-up" data-aos-delay={`${900 + index * 100}`}>
                            <LiquidCircle 
                                label={skill.label}
                                percentage={skill.percentage}
                                variant={skill.variant}
                                startPercentage={skill.startPercentage} 
                            />
                        </div>
                    ))
                }
            </div>
            }
            </div>
        </section>
    )
}

export default Skills;
