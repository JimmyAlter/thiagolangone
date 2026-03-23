import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';

function App() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('portfolio-theme');
  }, []);

  return (
    <div className="bg-bg min-h-screen font-sans text-txt-primary transition-colors duration-300">
      <CommandPalette />
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
