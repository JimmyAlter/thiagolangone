import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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
        <p className="game-subtitle text-txt-muted">Profile</p>
        <h3 className="text-2xl font-semibold text-txt-primary">{PERSONAL_INFO.name}</h3>
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
  const [hasCvEs, setHasCvEs] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/CV_ES.pdf', { method: 'HEAD' })
      .then((r) => {
        if (!cancelled) setHasCvEs(Boolean(r.ok));
      })
      .catch(() => {
        if (!cancelled) setHasCvEs(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden game-shell"
    >
      <div className="absolute inset-0 bg-city-map opacity-70 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-20 w-full relative">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="space-y-8 menu-reveal">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="game-subtitle text-txt-muted">Overview</p>
              <h1 className="game-title text-txt-primary">
                {PERSONAL_INFO.name.toUpperCase()}
              </h1>
              <p className="mt-3 text-txt-secondary max-w-lg">
                Full-stack developer building monitoring platforms and internal tools with React, Node, and PostgreSQL.
              </p>
            </motion.div>

            <div className="menu-stack">
              <a href="#work" className="menu-item">
                <span className="menu-index">01</span>
                <div className="flex items-center gap-3">
                  Projects
                  <ChevronRight size={18} />
                </div>
              </a>
              <a href="#skills" className="menu-item">
                <span className="menu-index">02</span>
                <div className="flex items-center gap-3">
                  Stack
                  <ChevronRight size={18} />
                </div>
              </a>
              <a href="#contact" className="menu-item">
                <span className="menu-index">03</span>
                <div className="flex items-center gap-3">
                  Contact
                  <ChevronRight size={18} />
                </div>
              </a>
            </div>

            <div className="flex items-center gap-3 text-xs text-txt-muted uppercase tracking-[0.3em]">
              <span className="hud-chip">CTRL + K</span>
              <span>Quick Commands</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/CV_EN.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-bg-surface/60 text-txt-secondary hover:text-txt-primary hover:border-border-hover transition-colors"
              >
                <Download size={16} className="text-accent-green" />
                <span className="font-mono text-xs uppercase tracking-[0.22em]">CV (EN)</span>
              </a>
              {hasCvEs && (
                <a
                  href="/CV_ES.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-bg-surface/60 text-txt-secondary hover:text-txt-primary hover:border-border-hover transition-colors"
                >
                  <Download size={16} className="text-accent-blue" />
                  <span className="font-mono text-xs uppercase tracking-[0.22em]">CV (ES)</span>
                </a>
              )}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-bg-surface/40 text-txt-muted hover:text-txt-primary hover:border-border-hover transition-colors"
              >
                <Github size={16} />
                <span className="font-mono text-xs uppercase tracking-[0.22em]">GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-bg-surface/40 text-txt-muted hover:text-txt-primary hover:border-border-hover transition-colors"
              >
                <Linkedin size={16} />
                <span className="font-mono text-xs uppercase tracking-[0.22em]">LinkedIn</span>
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
