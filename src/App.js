import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import AOS from "aos";

import Hero from "./sections/Hero";
import WhoAmI from "./sections/WhoAmI";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import ContactMe from "./sections/ContactMe";
import Header from "./components/header";
import SideNav from "./components/sidenav";
import SpinningCircle from "./components/spinningCircle";
import "./App.scss";

import "aos/dist/aos.css"; // make sure AOS styles are imported

gsap.registerPlugin(ScrollToPlugin);

function App() {
	const sectionsRef = useRef([]);
	const [currentSection, setCurrentSection] = useState(0);
	const isScrollingRef = useRef(false);
	const scrollTimeoutRef = useRef(null);

	useEffect(() => {
		AOS.init({
			duration: 1000,
			once: true, // animation triggers only once
		});
	}, []);

	useEffect(() => {
		const handleWheel = (e) => {
			e.preventDefault(); // prevent default scroll

			if (isScrollingRef.current) return;

			// Trackpad can fire many small events, so ignore tiny deltas
			if (Math.abs(e.deltaY) < 20) return;

			if (e.deltaY > 0 && currentSection < sectionsRef.current.length - 1) {
				scrollToSection(currentSection + 1);
			} else if (e.deltaY < 0 && currentSection > 0) {
				scrollToSection(currentSection - 1);
			}
		};

		const scrollToSection = (index) => {
			isScrollingRef.current = true;
			gsap.to(window, {
				duration: 1,
				scrollTo: {y: sectionsRef.current[index], autoKill: false},
				onComplete: () => {
					isScrollingRef.current = false;
					setCurrentSection(index);
				},
			});
		};

		window.addEventListener("wheel", handleWheel, {passive: false});

		// Capture the timeout ref value to use in cleanup
		const timeoutRef = scrollTimeoutRef.current;

		return () => {
			window.removeEventListener("wheel", handleWheel);
			if (timeoutRef) {
				clearTimeout(timeoutRef);
			}
		};
	}, [currentSection]);

	return (
		<div className="App bg-primary">
			<Header />
			<div className="hidden md:block">
				<SideNav />
				<SpinningCircle />
			</div>

			{[Hero, WhoAmI, Skills, Experience, ContactMe].map((Section, index) => (
				<div
					key={index}
					ref={(el) => (sectionsRef.current[index] = el)}
					style={{height: "100vh"}}
				>
					<Section />
				</div>
			))}
		</div>
	);
}

export default App;
