import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Menu, X, Command, Search } from 'lucide-react';
import { NAV_LINKS, PERSONAL_INFO } from '../constants';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/80 backdrop-blur-xl border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#about" className="flex items-center gap-3 shrink-0">
            <span className="hud-chip">profile</span>
            <span className="menu-title text-txt-primary tracking-[0.3em]">THIAGO</span>
          </a>

          {/* Desktop Links & Command Palette */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-4">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="menu-link"
                >
                  <span className="text-txt-muted">
                    {String(i).padStart(2, '0')}.
                  </span>
                  {' '}{link.title}
                </a>
              ))}
            </div>

            {/* CMD K Button */}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-bg-surface hover:border-accent-blue/40 text-txt-muted hover:text-accent-blue transition-all"
            >
              <Search size={14} />
              <span className="text-xs font-mono">Cmd</span>
              <div className="flex items-center gap-0.5 ml-1 px-1.5 py-0.5 rounded bg-bg text-[10px] font-mono border border-border">
                <Command size={10} />
                <span>K</span>
              </div>
            </button>
          </div>

          {/* Social + Mobile toggle */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-4 text-txt-muted">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-accent-green transition-colors" aria-label="GitHub">
                <Github size={16} />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent-purple transition-colors" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
            {/* Mobile search / hamburger */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
                className="text-txt-secondary hover:text-accent-green transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="text-txt-secondary hover:text-accent-green transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl pt-20 lg:hidden"
          >
            <div className="flex flex-col items-center gap-6 p-8">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileOpen(false)}
                  className="menu-item w-full max-w-xs"
                >
                  <span className="menu-index">{String(i).padStart(2, '0')}</span>
                  <span>{link.title}</span>
                </a>
              ))}
              <div className="flex gap-6 mt-8 text-txt-muted">
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-accent-green transition-colors">
                  <Github size={20} />
                </a>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent-purple transition-colors">
                  <Linkedin size={20} />
                </a>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-accent-blue transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
