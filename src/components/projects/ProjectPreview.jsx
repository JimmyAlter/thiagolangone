const ProjectPreview = ({
  project,
  activeShot,
  isFading,
  onOpen,
  onPrev,
  onNext,
}) => {
  const shots = project.gallery?.length ? project.gallery : project.image ? [project.image] : [];
  const showNav = shots.length > 1;
  const currentShot = shots[activeShot] || project.image;

  if (!currentShot) return null;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      className="relative rounded-lg border border-border overflow-hidden bg-bg aspect-[16/10] w-full text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue/40"
      aria-label={`Open screenshots for ${project.title}`}
    >
      <img
        src={currentShot}
        alt={`${project.title} preview`}
        className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
          isFading ? 'opacity-60' : 'opacity-100'
        }`}
        loading="lazy"
        decoding="async"
      />

      {showNav && (
        <>
          <div className="absolute inset-0 flex items-center justify-between px-2">
            <button
              className="hud-chip bg-bg/80 border-border hover:border-accent-blue/50 hover:text-accent-blue transition-all min-w-10 min-h-10 flex items-center justify-center"
              aria-label="Previous screenshot"
              onClick={onPrev}
            >
              ←
            </button>
            <button
              className="hud-chip bg-bg/80 border-border hover:border-accent-blue/50 hover:text-accent-blue transition-all min-w-10 min-h-10 flex items-center justify-center"
              aria-label="Next screenshot"
              onClick={onNext}
            >
              →
            </button>
          </div>
          <div className="absolute bottom-2 right-2 hud-chip bg-bg/80 border-border text-txt-secondary">
            {activeShot + 1}/{shots.length}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectPreview;
