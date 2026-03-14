import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects } from '../constants';
import { Github, ExternalLink, Folder } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const [activeShot, setActiveShot] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const shots = project.gallery?.length ? project.gallery : project.image ? [project.image] : [];
  const showNav = shots.length > 1;
  const currentShot = shots[activeShot] || project.image;

  const triggerFade = () => {
    setIsFading(true);
    setTimeout(() => setIsFading(false), 250);
  };

  const goNext = (e) => {
    e.preventDefault();
    if (!showNav) return;
    triggerFade();
    setActiveShot((prev) => (prev + 1) % shots.length);
  };

  const goPrev = (e) => {
    e.preventDefault();
    if (!showNav) return;
    triggerFade();
    setActiveShot((prev) => (prev - 1 + shots.length) % shots.length);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group terminal-window menu-panel menu-card"
    >
      {/* Card content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="hud-chip">featured</span>
          {project.featured && (
            <span className="text-xs font-mono text-accent-green">★ featured</span>
          )}
        </div>
        {/* Icon + Title */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent-blue/10 text-accent-blue">
              <Folder size={20} />
            </div>
            <div>
              <h3 className="text-lg font-sans font-bold text-txt-primary group-hover:text-accent-blue transition-colors">
                {project.title}
              </h3>
              <span className="text-xs font-mono text-txt-muted uppercase tracking-[0.3em]">
                {project.tech.slice(0, 2).join(' · ')}
              </span>
            </div>
          </div>
          {/* Links */}
            <div className="flex items-center gap-3 text-txt-muted">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent-blue transition-colors"
                  aria-label={`GitHub repo for ${project.title}`}
                >
                  <Github size={16} />
                </a>
              )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent-blue transition-colors"
                aria-label={`Live demo for ${project.title}`}
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Preview */}
        {currentShot && (
          <div className="mb-5 relative rounded-lg border border-border overflow-hidden bg-bg">
            <img
              src={currentShot}
              alt={`${project.title} preview`}
              className={`w-full h-40 object-cover transition-opacity duration-500 ease-out ${
                isFading ? 'opacity-60' : 'opacity-100'
              }`}
              loading="lazy"
            />
            {showNav && (
              <div className="absolute inset-0 flex items-center justify-between px-2">
                <button
                  className="hud-chip bg-bg/80 border-border hover:border-accent-blue/50 hover:text-accent-blue transition-all"
                  aria-label="Previous screenshot"
                  onClick={goPrev}
                >
                  ←
                </button>
                <button
                  className="hud-chip bg-bg/80 border-border hover:border-accent-blue/50 hover:text-accent-blue transition-all"
                  aria-label="Next screenshot"
                  onClick={goNext}
                >
                  →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-txt-secondary leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-bg-surface border border-border text-txt-muted group-hover:text-accent-green group-hover:border-accent-green/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <motion.section
      id="work"
      className="py-24 px-6 relative section-screen"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-green/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-txt-primary mt-3">
            Projects
          </h2>
          <p className="text-txt-secondary mt-3 max-w-md mx-auto text-sm">
            Real builds with clear outcomes. Focused on reliability, automation,
            and clean UX.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
