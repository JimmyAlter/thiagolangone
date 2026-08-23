import { motion } from 'framer-motion';
import { Bot, Server, TerminalSquare } from 'lucide-react';
import SectionHeading from './SectionHeading';

const items = [
  {
    title: 'Infrastructure at Scale',
    icon: <Server size={18} />,
    points: [
      'Six independent Active Directory domains across 30+ branch offices',
      'DNS, DHCP, multi-site VPN, MikroTik routing, Windows Server and Linux',
    ],
    chip: 'infrastructure',
  },
  {
    title: 'Automation & Internal Tooling',
    icon: <TerminalSquare size={18} />,
    points: [
      'In-house RMM: PowerShell agents on 500+ endpoints, Node API, React console',
      'Account provisioning across Active Directory and Google Workspace',
    ],
    chip: 'automation',
  },
  {
    title: 'Applied AI & Agents',
    icon: <Bot size={18} />,
    points: [
      'Agent platforms on self-hosted local models — company data never leaves the network',
      'MCP servers exposing Postgres and SQL Server through fixed, parameterized queries',
      'Security-critical paths as deterministic code, not model output',
    ],
    chip: 'ai engineering',
  },
];

const Capabilities = () => {
  return (
    <motion.section
      id="capabilities"
      className="py-12 md:py-20 px-4 md:px-6 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-blue/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <SectionHeading
          index="01"
          eyebrow="What I Do"
          title="Systems, not just screens"
          description="I operate production infrastructure and build the tooling that runs it — with access rules enforced in code, not left to convention."
        />

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
                <div className="flex items-center justify-between mb-5">
                  <span className="hud-chip">{it.chip}</span>
                  <span className="text-accent-blue">{it.icon}</span>
                </div>
                <h3 className="text-lg font-sans font-semibold text-txt-primary mb-4">
                  {it.title}
                </h3>
                <ul className="space-y-3 text-sm text-txt-secondary">
                  {it.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-accent-blue/70 shrink-0" />
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
