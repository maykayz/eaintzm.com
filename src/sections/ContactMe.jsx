import { useEffect, useRef, useState } from "react";
import {OutlineButton} from "../components/Buttons";
import SideNav from "../components/sidenav";
import CatCorner from "../components/CatCorner";

const EMAIL = "eaintzm@gmail.com";

const ContactMe = () => {
	const [copied, setCopied] = useState(false);
	const [catVisible, setCatVisible] = useState(false);
	const sectionRef = useRef(null);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return undefined;
		const observer = new IntersectionObserver(
			([entry]) => setCatVisible(entry.isIntersecting),
			{ threshold: 0.2 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(EMAIL);
		} catch {
			const textarea = document.createElement("textarea");
			textarea.value = EMAIL;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand("copy");
			document.body.removeChild(textarea);
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<section ref={sectionRef} className="min-h-screen section flex flex-col justify-between px-6 md:px-12 py-20">
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
				<div className="reveal mt-4 flex flex-row items-center justify-center gap-4">
					<OutlineButton>
						<a href={`mailto:${EMAIL}`} className="text-secondary font-saunde text-center">
							{EMAIL}
						</a>
					</OutlineButton>
					<button
						type="button"
						onClick={handleCopy}
						className="font-raleway text-xs md:text-sm tracking-[0.1em] uppercase text-muted hover:text-maroon transition-colors duration-300"
					>
						{copied ? "Copied!" : `Copy ${EMAIL}`}
					</button>
				</div>
			</div>

			<div className="block md:hidden mt-10">
				<SideNav />
			</div>

			<CatCorner visible={catVisible} />
		</section>
	);
};

export default ContactMe;
