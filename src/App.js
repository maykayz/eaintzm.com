import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Portfolio from "./sections/Portfolio";
import Client from "./sections/Client";
import ContactMe from "./sections/ContactMe";
import SpinningCircle from "./components/spinningCircle";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/footer";
import "./App.scss";

gsap.registerPlugin(ScrollTrigger);

function App() {
	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.utils.toArray(".reveal").forEach((el) => {
				gsap.fromTo(
					el,
					{ opacity: 0, y: 50 },
					{
						opacity: 1,
						y: 0,
						duration: 1,
						ease: "power3.out",
						scrollTrigger: {
							trigger: el,
							start: "top 85%",
							toggleActions: "play none none reverse",
						},
					}
				);
			});

			gsap.to(".scroll-progress__bar", {
				scaleX: 1,
				ease: "none",
				scrollTrigger: {
					trigger: ".App",
					start: "top top",
					end: "bottom bottom",
					scrub: 0.3,
				},
			});
		});

		return () => ctx.revert();
	}, []);

	return (
		<div className="App bg-primary md:cursor-none">
			<div className="scroll-progress">
				<div className="scroll-progress__bar" />
			</div>
			<div className="hidden md:block">
				<SpinningCircle />
				<CustomCursor />
			</div>

			<Hero />
			<Stats />
			<Skills />
			<Experience />
			<Portfolio />
			<Client />
			<ContactMe />
			<Footer />
		</div>
	);
}

export default App;
