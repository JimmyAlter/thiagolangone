import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

/** Static class maps — Tailwind can only see class names written out in full. */
export const LIST_TONES = {
  blue: { dot: 'bg-sky-400', text: 'text-sky-300', chip: 'bg-sky-400/10 text-sky-300 border-sky-400/30' },
  green: { dot: 'bg-emerald-400', text: 'text-emerald-300', chip: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30' },
  purple: { dot: 'bg-violet-400', text: 'text-violet-300', chip: 'bg-violet-400/10 text-violet-300 border-violet-400/30' },
  amber: { dot: 'bg-amber-400', text: 'text-amber-300', chip: 'bg-amber-400/10 text-amber-300 border-amber-400/30' },
  rose: { dot: 'bg-rose-400', text: 'text-rose-300', chip: 'bg-rose-400/10 text-rose-300 border-rose-400/30' },
};

export const toneOf = (color) => LIST_TONES[color] || LIST_TONES.blue;

export function Sheet({ open, title, onClose, children, footer }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <motion.button
            type="button"
            aria-label="Cerrar"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="relative max-h-[88svh] overflow-y-auto rounded-t-3xl border-t border-border bg-bg-surface pb-[env(safe-area-inset-bottom)] shadow-2xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 34, stiffness: 340 }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-bg-surface/95 px-5 py-4 backdrop-blur">
              <h2 className="text-base font-semibold text-txt-primary">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full bg-bg-elevated text-txt-secondary active:scale-95"
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-5 py-4">{children}</div>
            {footer && <div className="sticky bottom-0 border-t border-border bg-bg-surface/95 px-5 py-4 backdrop-blur">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function EmptyState({ icon: Icon, title, hint }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border px-6 py-12 text-center">
      <Icon size={28} className="text-txt-muted" />
      <p className="text-sm font-medium text-txt-secondary">{title}</p>
      {hint && <p className="max-w-xs text-xs leading-relaxed text-txt-muted">{hint}</p>}
    </div>
  );
}

export function SectionLabel({ children, count }) {
  return (
    <div className="mb-2 mt-6 flex items-center gap-2 px-1 first:mt-0">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-txt-muted">{children}</h2>
      {count > 0 && <span className="text-xs font-medium text-txt-muted">{count}</span>}
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-txt-muted">{label}</span>
      {children}
    </label>
  );
}

export const inputClass =
  'w-full rounded-xl border border-border bg-bg-elevated px-4 py-3 text-base text-txt-primary placeholder:text-txt-muted focus:border-accent-blue focus:outline-none';

export const primaryButtonClass =
  'w-full rounded-xl bg-accent-blue px-4 py-3.5 text-base font-semibold text-bg active:scale-[0.99] disabled:opacity-40';
