import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Monitor, Briefcase, Mail, Copy, FileText, Layers } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    document.addEventListener('keydown', down);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      document.removeEventListener('keydown', down);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (e) => {
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

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const runCommand = (command) => {
    command();
    setOpen(false);
  };

  const actions = [
    {
      id: 'goto-about',
      name: 'Go to About',
      icon: <Monitor size={14} />,
      keyword: 'go to about home profile',
      perform: () => window.location.hash = '#about',
    },
    {
      id: 'goto-work',
      name: 'Go to Projects',
      icon: <Briefcase size={14} />,
      keyword: 'go to projects work portfolio',
      perform: () => window.location.hash = '#work',
    },
    {
      id: 'goto-capabilities',
      name: 'Go to What I Build',
      icon: <Layers size={14} />,
      keyword: 'go to what i build capabilities focus services',
      perform: () => window.location.hash = '#capabilities',
    },
    {
      id: 'goto-stack',
      name: 'Go to Stack',
      icon: <Briefcase size={14} />,
      keyword: 'go to stack skills tools',
      perform: () => window.location.hash = '#skills',
    },
    {
      id: 'goto-contact',
      name: 'Go to Contact',
      icon: <Mail size={14} />,
      keyword: 'go to contact email message',
      perform: () => window.location.hash = '#contact',
    },
    {
      id: 'cv-en',
      name: 'Open CV (EN)',
      icon: <FileText size={14} />,
      keyword: 'cv resume english pdf',
      perform: () => window.open('/CV_EN.pdf', '_blank'),
    },
    {
      id: 'copy-email',
      name: 'Copy Email Address',
      icon: <Copy size={14} />,
      keyword: 'copy email address contact',
      perform: () => navigator.clipboard.writeText(PERSONAL_INFO.email),
    },
  ];

  const filteredActions = query
    ? actions.filter((action) =>
      action.name.toLowerCase().includes(query.toLowerCase()) ||
      action.keyword.includes(query.toLowerCase())
    )
    : actions;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-bg/60 backdrop-blur-sm z-[100]"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="fixed top-6 md:top-[15%] left-1/2 -translate-x-1/2 w-full max-w-lg z-[101] px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div
              ref={panelRef}
              className="menu-panel border border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border text-txt-primary">
                <Search size={18} className="text-txt-muted shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent border-none outline-none font-mono text-sm placeholder-txt-muted/50"
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setOpen(false);
                    if (e.key === 'Enter' && filteredActions.length > 0) {
                      runCommand(filteredActions[0].perform);
                    }
                  }}
                />
                <div className="flex items-center gap-1 font-mono text-[10px] text-txt-muted bg-bg-surface px-1.5 py-0.5 rounded border border-border">
                  <span>esc</span>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] md:max-h-72 overflow-y-auto p-2">
                {filteredActions.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm font-mono text-txt-muted">
                    No results found for "{query}"
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {filteredActions.map((action, i) => (
                      <button
                        key={action.id}
                        onClick={() => runCommand(action.perform)}
                        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left transition-colors font-mono text-sm group ${i === 0 && query
                            ? 'bg-accent-blue/10 text-accent-blue'
                            : 'text-txt-secondary hover:bg-bg-surface hover:text-txt-primary'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`${i === 0 && query ? 'text-accent-blue' : 'text-txt-muted group-hover:text-txt-primary'}`}>
                            {action.icon}
                          </span>
                          {action.name}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-border bg-bg-surface/50 text-[10px] text-txt-muted font-mono flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>Navigation</span>
                </div>
                 <div className="flex items-center gap-2">
                   <span className="flex items-center gap-1"><Command size={10} />Ctrl + K</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
