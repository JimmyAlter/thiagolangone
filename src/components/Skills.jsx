import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SKILLS } from '../constants';

const SkillBar = ({ name, level, index, inView }) => {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-mono text-txt-secondary group-hover:text-accent-green transition-colors">
          {name}
        </span>
        <span className="text-xs font-mono text-txt-muted">
          {level}%
        </span>
      </div>
      <div className="skill-bar">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.08, ease: 'easeOut' }}
          className="skill-bar-fill"
          style={{
            background: `linear-gradient(90deg, #00ff88, #a78bfa)`,
          }}
        />
      </div>
    </div>
  );
};

const SkillCategory = ({ category, icon, items, categoryIndex, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: categoryIndex * 0.15 }}
      className="terminal-window menu-panel menu-card"
    >
      {/* Skills content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="hud-chip">category</span>
          <span className="text-xs font-mono text-txt-muted uppercase tracking-[0.3em]">
            {category}
          </span>
        </div>
        <div className="flex items-center gap-3 mb-5">
          <span className="text-lg">{icon}</span>
          <h3 className="font-sans text-lg font-semibold text-txt-primary">
            {category}
          </h3>
        </div>
        <div className="space-y-4">
          {items.map((skill, i) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              index={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      id="skills"
      className="py-24 px-6 relative section-screen"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/3 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-txt-primary mt-3">
            Skills
          </h2>
          <p className="text-txt-secondary mt-3 max-w-md mx-auto text-sm">
            The stack I rely on for shipping production-ready systems.
          </p>
        </motion.div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skillGroup, i) => (
            <SkillCategory
              key={skillGroup.category}
              category={skillGroup.category}
              icon={skillGroup.icon}
              items={skillGroup.items}
              categoryIndex={i}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
