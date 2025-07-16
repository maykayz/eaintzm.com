import {OutlineButton} from "../components/Buttons";

const ContactMe = () => {
	return (
		<section className="hero h-screen section flex flex-col justify-center items-center">
			<h1
				className="hero__title text-white font-saunde lg:text-xl md:text-6xl text-[1rem] text-left md:mb-12 mb-8"
				data-aos="fade-down"
				data-aos-duration="1000"
			>
				Interested in working together?
			</h1>
			<h1
				className="hero__title text-white font-saunde lg:text-8xl md:text-6xl text-[1.8rem] uppercase"
				data-aos="fade-up"
				data-aos-duration="1000"
			>
				Let's start from <span className="text-secondary">here</span>
			</h1>
			<div className="md:mt-10 mt-8" data-aos="fade-up" data-aos-delay="300">
				<OutlineButton>
                       <a href="mailto:ms.eaintthazinmyint@gmail.com" className="text-white font-saunde text-center">
          H E L L O !
        </a>
                    </OutlineButton>
			</div>
		</section>
	);
};

export default ContactMe;
