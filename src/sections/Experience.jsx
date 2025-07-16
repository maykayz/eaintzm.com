import FlowerImage from "../assets/images/Flower.svg";
import {OutlineButton} from "../components/Buttons";
import CVPDF from '../assets/files/EaintThazinMyint.pdf';

const jobList = [
    {
        company: "Datawow",
        position: "Frontend Developer",
        duration: "April 2024 - Present"
    },
    {
        company: "DRVR",
        position: "Senior Frontend Engineer",
        duration: "July 2022 - April 2024"
    },
    {
        company: "Onepay",
        position: "React Engineer",
        duration: "July 2021 - July 2022"
    },
    {
        company: "rgo47",
        position: "Senior Frontend Developer",
        duration: "October 2019 - May 2021"
    },
    {
        company: "CREATiVE",
        position: "Senior Frontend Developer",
        duration: "March 2017 - October 2019"
    }
];

const JobCard = ({ company, position, duration, index }) => (
           <div className={`relative border p-4 ${index === 0 ? "border-secondary" : "border-stone-500"}`} data-aos="fade-right" data-aos-duration="1000">
           <div className="flex flex-row justify-between md:items-center items-stretch mb-4">
            <h5 className="text-white md:text-[18px] text-[1rem] font-raleway" data-aos="fade-up" data-aos-delay="300">
                {company}
            </h5>
               <h5 className="text-white md:text-[18px] text-[1rem]  font-raleway md:block hidden" data-aos="fade-up" data-aos-delay="300">
                {duration}
            </h5>
           </div>
              <div className="flex">
                <h5 className="text-white md:text-[22px] text-[1rem] font-bold font-raleway text-left" data-aos="fade-up" data-aos-delay="300">
                {position}
            </h5>
              </div>
        </div>
)

const Experience = () => {
      const handlePDFDownload = () => {
        const link = document.createElement('a');
        link.href = CVPDF; // Path to your PDF file
        link.target = '_blank'; // Open in a new tab
        link.rel = 'noopener noreferrer'; // Security best practice
        link.download = CVPDF;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    return (
    <section className="flex flex-col justify-center align-center md:gap-4 gap-1 section">
     <div className="container mx-auto px-4">
         <div className="grid md:grid-cols-2 grid-cols-1 mb-12">
        <div className="" data-aos="fade-right" data-aos-duration="1000">
            <h1 className="hero__title text-white font-saunde lg:text-xl md:text-6xl text-xl text-left" data-aos="fade-up" data-aos-duration="1000">
                Recent Work
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:mt-10 mt-4">
                <div>
                    <h5 className="text-white font-saunde lg:text-6xl md:text-2xl text-[3rem] md:mb-8 mb-4" data-aos="fade-up" data-aos-delay="300">
                    PROFESSIONAL
                </h5>
                <h5 className="text-secondary font-saunde lg:text-6xl md:text-2xl text-[3rem]" data-aos="fade-up" data-aos-delay="300">
                    EXPERIENCE
                </h5>
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center items-start" data-aos="fade-left" data-aos-duration="1000">
           <div className="max-h-[100px] md:mt-12 md:mb-12 mb-4 mt-4">
            <img src={FlowerImage} alt="flower" className="md:w-8 md:h-8 w-4 h-4"/>
          </div>
          <p className="text-justify text-white font-raleway leading-loose" data-aos="fade-up" data-aos-delay="600">
            Experienced Frontend Developer with 8 years in web development. Strong experience in e-commerce, fintech, and telecom sectors. Currently working for a software agency supporting for clients in Thailand & Japan.
            </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {
            jobList.map((job, index) => (
                <JobCard 
                    index={index}
                    key={index}
                    company={job.company}
                    position={job.position}
                    duration={job.duration}
                />
            ))
        }
      </div>
           <div className="flex justify-center items-center mt-6" data-aos="fade-up" data-aos-delay="800">
        <OutlineButton
        onClick={handlePDFDownload}
        >
        Download Resume
     </OutlineButton>
     </div>
     </div>

    </section>
    )
}

export default Experience;