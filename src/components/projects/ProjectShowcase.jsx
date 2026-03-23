import { motion } from 'framer-motion';
import { ExternalLink, Folder, Github } from 'lucide-react';
import { useState } from 'react';
import ProjectPreview from './ProjectPreview';

const ProjectShowcase = ({ project, onOpen, reverse = false }) => {
  const [activeShot, setActiveShot] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const shots = project.gallery?.length ? project.gallery : project.image ? [project.image] : [];
  const showNav = shots.length > 1;

  const triggerFade = () => {
    setIsFading(true);
    setTimeout(() => setIsFading(false), 250);
  };

  const goNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!showNav) return;
    triggerFade();
    setActiveShot((prev) => (prev + 1) % shots.length);
  };

  const goPrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!showNav) return;
    triggerFade();
    setActiveShot((prev) => (prev - 1 + shots.length) % shots.length);
  };

  const openModal = () => {
    onOpen?.(project, activeShot);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className="group terminal-window menu-panel"
    >
      <div className="p-7">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className={reverse ? 'lg:order-2' : 'lg:order-1'}>
            <ProjectPreview
              project={project}
              activeShot={activeShot}
              isFading={isFading}
              onOpen={openModal}
              onPrev={goPrev}
              onNext={goNext}
            />
          </div>

          <div className={reverse ? 'lg:order-1' : 'lg:order-2'}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="hud-chip">{project.featured ? 'selected' : 'project'}</span>
                <span className="hud-chip">case study</span>
              </div>
              {project.featured && (
                <span className="text-xs font-mono text-accent-blue">★ selected</span>
              )}
            </div>

            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="min-w-0">
                <h3 className="text-xl md:text-2xl font-sans font-bold text-txt-primary group-hover:text-accent-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-txt-secondary mt-2 leading-relaxed max-w-xl">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center gap-3 text-txt-muted shrink-0">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent-blue transition-colors"
                    aria-label={`GitHub repo for ${project.title}`}
                  >
                    <Github size={18} />
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
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>

            {project.highlights?.length > 0 && (
              <div className="rounded-lg border border-border bg-bg-surface/35 p-5 mb-5">
                <p className="text-xs font-mono text-txt-muted uppercase tracking-[0.28em] mb-3">Highlights</p>
                <ul className="space-y-2 text-sm text-txt-secondary">
                  {project.highlights.slice(0, 3).map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-accent-blue/80 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.slice(0, 10).map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-bg-surface border border-border text-txt-muted"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 10 && (
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-bg-surface border border-border text-txt-muted">
                  +{project.tech.length - 10}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="btn btn-primary" onClick={openModal}>
                <Folder size={16} />
                <span className="font-mono text-xs uppercase tracking-[0.18em]">Open Screenshots</span>
              </button>
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn">
                  <Github size={16} className="text-accent-blue" />
                  <span className="font-mono text-xs uppercase tracking-[0.18em]">Repo</span>
                </a>
              )}
              {project.liveUrl && project.liveUrl !== '#' && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn">
                  <ExternalLink size={16} className="text-accent-blue" />
                  <span className="font-mono text-xs uppercase tracking-[0.18em]">Live</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectShowcase;
