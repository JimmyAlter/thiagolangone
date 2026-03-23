import { motion } from 'framer-motion';
import { Gauge, Wrench, Server } from 'lucide-react';

const items = [
  {
    title: 'Monitoring Dashboards',
    icon: <Gauge size={18} />,
    points: [
      'Inventory, health signals, and status at a glance',
      'Reports and history for ops visibility',
    ],
    accent: 'text-accent-blue',
    chip: 'monitoring',
  },
  {
    title: 'Internal Tools',
    icon: <Wrench size={18} />,
    points: [
      'Service desk workflows and asset tracking',
      'Clean UI systems designed for daily use',
    ],
    accent: 'text-accent-blue',
    chip: 'tooling',
  },
  {
    title: 'APIs & Automation',
    icon: <Server size={18} />,
    points: [
      'Node/Express APIs with auth and role-ready patterns',
      'Automation across Windows/Linux (PowerShell/Bash)',
    ],
    accent: 'text-accent-blue',
    chip: 'backend',
  },
];

const Capabilities = () => {
  return (
    <motion.section
      id="capabilities"
      className="py-20 px-6 relative section-screen"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-blue/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-txt-primary mt-3">
            What I Build
          </h2>
          <p className="text-txt-secondary mt-3 max-w-xl mx-auto text-sm">
            Practical systems for teams: dashboards, internal tooling, and secure APIs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="terminal-window menu-panel menu-card"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="hud-chip">{it.chip}</span>
                  <span className={`${it.accent}`}>{it.icon}</span>
                </div>
                <h3 className="text-lg font-sans font-semibold text-txt-primary mb-3">
                  {it.title}
                </h3>
                <ul className="space-y-2 text-sm text-txt-secondary">
                  {it.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-border-hover shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Capabilities;
