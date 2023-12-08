import "./App.scss";
import Hero from "./sections/Hero";
import WhoAmI from "./sections/WhoAmI";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Portfolio from "./sections/Portfolio";
import ContactMe from "./sections/ContactMe";
import Footer from "./components/footer";
import Header from "./components/header";
import SideNav from "./components/sidenav";
import SpinningCircle from "./components/spinningCircle";

function App() {
  return (
    <div className="App bg-primary">
      <Header />
      <SideNav />
      <SpinningCircle />
      <Hero />
      <WhoAmI />
      <Skills />
      <Experience />
      <Portfolio />
      <ContactMe />
      <Footer />
    </div>
  );
}

export default App;
