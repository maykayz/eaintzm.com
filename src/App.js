
import AOS from "aos";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";

import Hero from "./sections/Hero";
import WhoAmI from "./sections/WhoAmI";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Portfolio from "./sections/Portfolio";
import ContactMe from "./sections/ContactMe";
import Header from "./components/header";
import SideNav from "./components/sidenav";
import SpinningCircle from "./components/spinningCircle";

import "aos/dist/aos.css";
import "./App.scss";

gsap.registerPlugin(ScrollToPlugin);

function App() {
	const containerRef = useRef(null);
	const sectionsRef = useRef([]);
	const [currentSection, setCurrentSection] = useState(0);
	const [isScrolling, setIsScrolling] = useState(false);
	const scrollTimeoutRef = useRef(null);

	useEffect(() => {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: false,
			mirror: true,
			offset: 120,
			delay: 0,
		});
	}, []);

	useEffect(() => {
		const sections = sectionsRef.current.filter(Boolean);

		const handleWheel = (e) => {
			if (isScrolling || sections.length === 0) return;

			e.preventDefault();

			if (scrollTimeoutRef.current) {
				clearTimeout(scrollTimeoutRef.current);
			}

			scrollTimeoutRef.current = setTimeout(() => {
				const delta = e.deltaY;
				let nextSection = currentSection;

				if (Math.abs(delta) > 10) {
					if (delta > 0 && currentSection < sections.length - 1) {
						nextSection = currentSection + 1;
					} else if (delta < 0 && currentSection > 0) {
						nextSection = currentSection - 1;
					}

					if (nextSection !== currentSection && sections[nextSection]) {
						setIsScrolling(true);
						setCurrentSection(nextSection);

						gsap.to(window, {
							duration: 1,
							scrollTo: {y: sections[nextSection], offsetY: 0},
							ease: "power2.inOut",
							onComplete: () => {
								setTimeout(() => {
									setIsScrolling(false);
									AOS.refresh();
								}, 300);
							},
						});
					}
				}
			}, 100);
		};

		const handleKeyDown = (e) => {
			if (isScrolling || sections.length === 0) return;

			let nextSection = currentSection;

			if (
				(e.key === "ArrowDown" || e.key === "PageDown") &&
				currentSection < sections.length - 1
			) {
				nextSection = currentSection + 1;
			} else if (
				(e.key === "ArrowUp" || e.key === "PageUp") &&
				currentSection > 0
			) {
				nextSection = currentSection - 1;
			}

			if (nextSection !== currentSection && sections[nextSection]) {
				e.preventDefault();
				setIsScrolling(true);
				setCurrentSection(nextSection);

				gsap.to(window, {
					duration: 1,
					scrollTo: {y: sections[nextSection], offsetY: 0},
					ease: "power2.inOut",
					onComplete: () => {
						setTimeout(() => {
							setIsScrolling(false);
							AOS.refresh();
						}, 300);
					},
				});
			}
		};

		const container = containerRef.current;
		if (container) {
			container.addEventListener("wheel", handleWheel, {passive: false});
			document.addEventListener("keydown", handleKeyDown);

			return () => {
				container.removeEventListener("wheel", handleWheel);
				document.removeEventListener("keydown", handleKeyDown);
				if (scrollTimeoutRef.current) {
					clearTimeout(scrollTimeoutRef.current);
				}
			};
		}
	}, [currentSection, isScrolling]);

	const addToRefs = (el) => {
		if (el && !sectionsRef.current.includes(el)) {
			sectionsRef.current.push(el);
		}
	};

	return (
		<div ref={containerRef} className="App bg-primary">
			<Header />
			<SideNav />
			<SpinningCircle />
			<div ref={addToRefs}>
				<Hero />
			</div>
			<div ref={addToRefs}>
				<WhoAmI />
			</div>
			<div ref={addToRefs}>
				<Skills />
			</div>
			<div ref={addToRefs}>
				<Experience />
			</div>
			<div ref={addToRefs}>
				<ContactMe />
			</div>
		</div>
	);
}

export default App;
