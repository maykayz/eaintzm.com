import ProfileLine from "../assets/images/ProfileLine.svg"
import SideProfile from "../assets/images/FrontProfile2.png"

const WhoAmI = () => {
  return (
    <section className="flex flex-col justify-center align-center md:gap-4 gap-1 section">
      <div className="grid md:grid-cols-4 grid-cols-1">
        <div className="col-span-1 col-start-2 relative" data-aos="fade-right" data-aos-duration="1000">
          <div className="absolute flex flex-col items-start gap-2 left-0 top-0 -translate-x-1/2 -translate-y-1/2 z-10" data-aos="zoom-in" data-aos-delay="200">
            <h5 className="text-white font-saunde text-xl">Since</h5>
            <h5 className="text-white font-saunde text-5xl">20<span className="text-secondary">17</span></h5>
          </div>
          <div className="absolute left-0 bottom-0 -translate-x-1/2 -translate-y-[50px]" data-aos="fade-up" data-aos-delay="400">
            <img src={ProfileLine} alt="Profile Line"/>
          </div>
          <div className="max-h-96 ">
            <img src={SideProfile} alt="flower" className="rounded-[20px] h-[40vh] bg-gradient-to-tl from-[#1F1F1F] to-[#cdcdcd]" />
          </div>
        </div>
        <div className="col-span-2 col-start-3 flex flex-col justify-center items-start ml-16 w-2/3 gap-10" data-aos="fade-left" data-aos-duration="1000">
          <h6 className="text-white font-saunde text-xl" data-aos="fade-up" data-aos-delay="200">Bio</h6>
          <h6 className="text-secondary font-saunde text-5xl" data-aos="fade-up" data-aos-delay="400">WHO I AM</h6>
          <h6 className="text-justify text-white font-raleway leading-loose" data-aos="fade-up" data-aos-delay="600">
            I'm Eaint Thazin Myint @ May K, a frontend developer originally from Myanmar, currently based in Thailand. 
      
            I have a passion for creating beautiful and functional web applications. With over 8 years of experience, I have honed my skills in React, JavaScript and willing to learn new technologies to stay up-to-date with the latest trends in web development.
            <br /> <br /> I have worked on various projects, including e-commerce, fintech, telecom and telematics applications in the past years. I am currently working for a software agency supporting clients in Thailand and Japan.
              <br /> <br />I am always looking for new challenges and opportunities to grow as a developer. In my free time, I love to play cozy games, read books, and explore new technologies. I believe that continuous learning is key to success in this ever-evolving field.
          </h6>
        </div>
      </div>
    </section>
  );
};

export default WhoAmI;
