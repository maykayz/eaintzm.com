
import AOS from "aos";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";

import Hero from "./sections/Hero";
import WhoAmI from "./sections/WhoAmI";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import ContactMe from "./sections/ContactMe";
import Header from "./components/header";
import SideNav from "./components/sidenav";
import SpinningCircle from "./components/spinningCircle";
import "./App.scss";

function App() {

	return (
		<div className="App bg-primary">
			<Header />
			<SideNav />
			<SpinningCircle />
			<div>
				<Hero />
			</div>
			<div>
				<WhoAmI />
			</div>
			<div>
				<Skills />
			</div>
			<div>
				<Experience />
			</div>
			<div>
				<ContactMe />
			</div>
		</div>
	);
}

export default App;
