import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects } from '../constants';
import ProjectModal from './projects/ProjectModal';
import ProjectShowcase from './projects/ProjectShowcase';

const Projects = () => {
  const [modal, setModal] = useState(null);

  const openProject = (project, shotIndex) => {
    setModal({ project, shotIndex });
  };

  return (
    <motion.section
      id="work"
      className="py-24 px-6 relative section-screen"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
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

        <div className="space-y-6">
          {projects.map((project, i) => (
            <ProjectShowcase
              key={project.title}
              project={project}
              onOpen={openProject}
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </div>

      <ProjectModal modal={modal} onClose={() => setModal(null)} />
    </motion.section>
  );
};

export default Projects;
