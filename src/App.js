import './App.css';
import Hero from './sections/Hero';
import WhoAmI from './sections/WhoAmI';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Portfolio from './sections/Portfolio';
import ContactMe from './sections/ContactMe';
import Footer from './components/footer';

function App() {
  return (
    <div className="App bg-primary">
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
