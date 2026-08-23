import { motion } from 'framer-motion';
import { Bot, Layout, Server, TerminalSquare, Wrench } from 'lucide-react';
import { SKILLS } from '../constants';
import SectionHeading from './SectionHeading';

const categoryIcon = (category) => {
  const name = category.toLowerCase();
  if (name.includes('infrastructure')) return <TerminalSquare size={18} className="text-accent-blue" />;
  if (name.includes('ai')) return <Bot size={18} className="text-accent-blue" />;
  if (name.includes('front')) return <Layout size={18} className="text-accent-blue" />;
  if (name.includes('back')) return <Server size={18} className="text-accent-blue" />;
  return <Wrench size={18} className="text-accent-blue" />;
};

const SkillCategory = ({ category, items, categoryIndex }) => {
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
          <span className="hud-chip">stack</span>
          <span className="text-xs font-mono text-txt-muted uppercase tracking-[0.3em]">
            {category}
          </span>
        </div>
        <div className="flex items-center gap-3 mb-5">
          {categoryIcon(category)}
          <h3 className="font-sans text-lg font-semibold text-txt-primary">
            {category}
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((skill) => (
            <span
              key={skill.name}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-bg-surface border border-border text-txt-muted hover:text-txt-primary hover:border-border-hover transition-colors"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <motion.section
      id="skills"
      className="py-12 md:py-24 px-4 md:px-6 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/4 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          index="03"
          eyebrow="Toolkit"
          title="Stack"
          description="What I reach for day to day — from domain controllers and PowerShell to React front ends and agent runtimes."
        />

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skillGroup, i) => (
            <SkillCategory
              key={skillGroup.category}
              category={skillGroup.category}
              items={skillGroup.items}
              categoryIndex={i}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
