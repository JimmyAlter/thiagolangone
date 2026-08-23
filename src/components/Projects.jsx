import { motion } from 'framer-motion';
import { useState } from 'react';
import { projects } from '../constants';
import ProjectModal from './projects/ProjectModal';
import ProjectShowcase from './projects/ProjectShowcase';
import SectionHeading from './SectionHeading';

const Projects = () => {
  const [modal, setModal] = useState(null);

  const openProject = (project, shotIndex) => {
    setModal({ project, shotIndex });
  };

  return (
    <motion.section
      id="work"
      className="py-12 md:py-24 px-4 md:px-6 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          index="02"
          eyebrow="Selected Work"
          title="Projects"
          description="Real builds with clear outcomes — from production RMM tooling to LLM-driven applications."
        />

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
