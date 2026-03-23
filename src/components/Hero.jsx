import { motion } from 'framer-motion';
import { ArrowDown, ChevronRight, Download, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const ProfilePanel = () => (
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="menu-panel rounded-2xl p-6"
  >
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-xs font-mono text-txt-muted uppercase tracking-[0.26em]">Profile</p>
        <h3 className="text-2xl font-semibold text-txt-primary mt-2">{PERSONAL_INFO.name}</h3>
      </div>
      <div className="hud-chip">{PERSONAL_INFO.available ? 'available' : 'unavailable'}</div>
    </div>
    <div className="space-y-4 text-sm text-txt-secondary">
      <div className="flex items-center justify-between">
        <span className="text-txt-muted uppercase tracking-[0.3em] text-xs">Role</span>
        <span className="text-txt-primary font-semibold">{PERSONAL_INFO.role}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-txt-muted uppercase tracking-[0.3em] text-xs">Location</span>
        <span className="text-txt-primary">{PERSONAL_INFO.location}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-txt-muted uppercase tracking-[0.3em] text-xs">Status</span>
        <span className="text-accent-green">{PERSONAL_INFO.available ? 'Available' : 'Unavailable'}</span>
      </div>
    </div>
    <div className="mt-6 border-t border-border pt-5">
      <p className="text-txt-secondary text-sm leading-relaxed">
        {PERSONAL_INFO.bio}
      </p>
    </div>
  </motion.div>
);

const Hero = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden game-shell"
    >
      <div className="absolute inset-0 bg-city-map opacity-40 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20 w-full relative">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="space-y-8 menu-reveal">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2">
                <span className="hud-chip">full stack developer</span>
                <span className="hud-chip">react · node · postgres</span>
              </div>

              <h1 className="game-title text-txt-primary mt-5">
                {PERSONAL_INFO.name}
              </h1>

              <p className="mt-4 text-txt-secondary max-w-xl text-base leading-relaxed">
                I build monitoring dashboards and internal tools that feel fast, reliable, and easy to operate.
              </p>
            </motion.div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-2">
              <a href="#work" className="btn btn-primary w-full sm:w-auto">
                <ChevronRight size={16} />
                <span className="font-mono text-xs uppercase tracking-[0.18em]">View Projects</span>
              </a>

              <a href="#contact" className="btn w-full sm:w-auto">
                <span className="font-mono text-xs uppercase tracking-[0.18em]">Contact</span>
              </a>

              <a href="/CV_EN.pdf" target="_blank" rel="noreferrer" className="btn w-full sm:w-auto">
                <Download size={16} className="text-accent-blue" />
                <span className="font-mono text-xs uppercase tracking-[0.18em]">Download CV</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                <Github size={16} />
                <span className="font-mono text-xs uppercase tracking-[0.18em]">GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                <Linkedin size={16} />
                <span className="font-mono text-xs uppercase tracking-[0.18em]">LinkedIn</span>
              </a>
            </div>
          </div>

          <ProfilePanel />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-txt-muted"
        >
          <span className="text-xs font-mono uppercase tracking-[0.4em]">scroll</span>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
