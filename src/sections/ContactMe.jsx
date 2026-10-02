import {OutlineButton} from "../components/Buttons";
import SideNav from "../components/sidenav";

const ContactMe = () => {
	return (
		<section className="min-h-screen section flex flex-col justify-between px-6 md:px-12 py-20">
			<div className="reveal flex flex-row justify-between items-start section-marker text-muted">
				<span>Contact</span>
				<span className="hidden md:block">Say Hi</span>
			</div>

			<div className="flex-1 flex flex-col justify-center gap-6 md:gap-10">
				<h1 className="reveal hero__title text-muted font-raleway text-xs md:text-sm tracking-[0.3em] uppercase">
					Interested in working together?
				</h1>
				<h1 className="reveal hero__title text-outline text-tan font-saunde leading-[0.85] lg:text-[7rem] md:text-6xl text-4xl uppercase">
					Let's start
				</h1>
				<h1 className="reveal hero__title text-maroon font-saunde leading-[0.85] lg:text-[7rem] md:text-6xl text-4xl uppercase md:ml-16">
					from here
				</h1>
				<div className="reveal mt-4">
					<OutlineButton>
						<a href="mailto:ms.eaintthazinmyint@gmail.com" className="text-secondary font-saunde text-center">
							Say Hi
						</a>
					</OutlineButton>
				</div>
			</div>

			<div className="block md:hidden mt-10">
				<SideNav />
			</div>
		</section>
	);
};

export default ContactMe;
