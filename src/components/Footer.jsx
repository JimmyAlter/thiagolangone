import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { NAV_LINKS, PERSONAL_INFO } from '../constants';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-bg-surface/30">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="hud-chip">Portfolio</span>
              <span className="menu-title text-txt-primary">THIAGO</span>
            </div>
            <p className="text-sm text-txt-muted max-w-xs leading-relaxed">
              Full-stack developer based in Buenos Aires, Argentina.
              Monitoring dashboards, internal tools, and APIs.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs text-accent-blue uppercase tracking-[0.4em] mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="text-sm text-txt-muted hover:text-accent-blue transition-colors"
                >
                  {link.title}
                </a>
              ))}
              <a
                href="/CV_EN.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-sm text-txt-muted hover:text-accent-blue transition-colors inline-flex items-center gap-2"
              >
                <FileText size={14} />
                CV (EN)
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs text-accent-blue uppercase tracking-[0.4em] mb-4">
              Social
            </h4>
            <div className="flex gap-4">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border border-border text-txt-muted hover:text-accent-blue hover:border-accent-blue/30 transition-all"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border border-border text-txt-muted hover:text-accent-blue hover:border-accent-blue/30 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2.5 rounded-lg border border-border text-txt-muted hover:text-accent-blue hover:border-accent-blue/30 transition-all"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-txt-muted uppercase tracking-[0.3em]">
            Built with React + Vite
          </p>
          <p className="text-xs text-txt-muted flex items-center gap-1.5">
            © {new Date().getFullYear()} Thiago Langone
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
