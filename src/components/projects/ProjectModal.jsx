import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const ProjectModal = ({ modal, onClose }) => {
  const { project, shotIndex } = modal || {};
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  const shots = useMemo(() => {
    if (!project) return [];
    if (project.gallery?.length) return project.gallery;
    if (project.image) return [project.image];
    return [];
  }, [project]);

  const [activeShot, setActiveShot] = useState(shotIndex || 0);

  useEffect(() => {
    setActiveShot(shotIndex || 0);
  }, [shotIndex]);

  useEffect(() => {
    if (!project) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;
    const t = setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = panelRef.current?.querySelectorAll(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && shots.length > 1) setActiveShot((s) => (s + 1) % shots.length);
      if (e.key === 'ArrowLeft' && shots.length > 1) setActiveShot((s) => (s - 1 + shots.length) % shots.length);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose, shots.length]);

  if (!project) return null;
  if (typeof document === 'undefined') return null;

  const currentShot = shots[activeShot];
  const showNav = shots.length > 1;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120]"
        aria-modal="true"
        role="dialog"
        aria-label={`${project.title} screenshots`}
      >
        <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm" onClick={onClose} />

        <div className="fixed inset-0 p-4 md:p-8 flex items-start justify-center">
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-[1020px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div ref={panelRef} className="menu-panel rounded-2xl border border-border overflow-hidden max-h-[92vh] flex flex-col">
              <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 border-b border-border bg-bg-surface/50 shrink-0">
                <div className="min-w-0">
                  <p className="text-xs font-mono text-txt-muted uppercase tracking-[0.3em]">Project</p>
                  <h3 className="text-lg md:text-xl font-sans font-semibold text-txt-primary truncate">{project.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-ghost"
                    >
                      <span className="font-mono text-xs uppercase tracking-[0.18em]">Repo</span>
                      <Github size={16} className="text-accent-blue" />
                    </a>
                  )}
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-ghost"
                    >
                      <span className="font-mono text-xs uppercase tracking-[0.18em]">Live</span>
                      <ExternalLink size={16} className="text-accent-blue" />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={onClose}
                    ref={closeBtnRef}
                    className="p-2 rounded-lg border border-border bg-bg-surface/40 text-txt-muted hover:text-txt-primary hover:border-border-hover transition-colors"
                    aria-label="Close"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto overscroll-contain max-h-[calc(92vh-64px)]">
                <div className="grid lg:grid-cols-[1.45fr_0.55fr] gap-0">
                  <div className="p-4">
                    <div className="relative rounded-xl border border-border bg-bg overflow-hidden aspect-[16/10]">
                      {currentShot && (
                        <img
                          src={currentShot}
                          alt={`${project.title} screenshot ${activeShot + 1}`}
                          className="w-full h-full object-cover"
                          decoding="async"
                        />
                      )}

                      {showNav && (
                        <div className="absolute inset-0 flex items-center justify-between px-2">
                          <button
                            type="button"
                            className="hud-chip bg-bg/80 border-border hover:border-accent-blue/50 hover:text-accent-blue transition-all min-w-10 min-h-10 flex items-center justify-center"
                            aria-label="Previous screenshot"
                            onClick={() => setActiveShot((s) => (s - 1 + shots.length) % shots.length)}
                          >
                            ←
                          </button>
                          <button
                            type="button"
                            className="hud-chip bg-bg/80 border-border hover:border-accent-blue/50 hover:text-accent-blue transition-all min-w-10 min-h-10 flex items-center justify-center"
                            aria-label="Next screenshot"
                            onClick={() => setActiveShot((s) => (s + 1) % shots.length)}
                          >
                            →
                          </button>
                        </div>
                      )}

                      {shots.length > 1 && (
                        <div className="absolute bottom-2 right-2 hud-chip bg-bg/80 border-border text-txt-secondary">
                          {activeShot + 1}/{shots.length}
                        </div>
                      )}
                    </div>

                    {shots.length > 1 && (
                      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                        {shots.map((src, i) => (
                          <button
                            key={src}
                            type="button"
                            onClick={() => setActiveShot(i)}
                            className={`shrink-0 rounded-lg border overflow-hidden bg-bg ${
                              i === activeShot
                                ? 'border-accent-blue/60'
                                : 'border-border hover:border-border-hover'
                            }`}
                            aria-label={`Select screenshot ${i + 1}`}
                          >
                            <img
                              src={src}
                              alt=""
                              className="w-20 h-12 object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="p-5 border-t lg:border-t-0 lg:border-l border-border bg-bg-surface/20">
                    <p className="text-sm text-txt-secondary leading-relaxed mb-4">{project.description}</p>

                    {project.highlights?.length > 0 && (
                      <>
                        <p className="text-xs font-mono text-txt-muted uppercase tracking-[0.28em] mb-3">Highlights</p>
                        <ul className="space-y-2 text-sm text-txt-secondary mb-5">
                          {project.highlights.slice(0, 5).map((h) => (
                            <li key={h} className="flex items-start gap-2">
                              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-accent-blue/80 shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <p className="text-xs font-mono text-txt-muted uppercase tracking-[0.28em] mb-3">Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-mono px-2.5 py-1 rounded-md bg-bg-surface border border-border text-txt-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
