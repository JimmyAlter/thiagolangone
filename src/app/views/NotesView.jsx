import { useMemo, useState } from 'react';
import { NotebookPen, Pin, Plus, Trash2 } from 'lucide-react';
import { EmptyState, Sheet, inputClass, primaryButtonClass } from '../components/ui';
import { formatTimestamp } from '../lib/dates';
import { plural } from '../lib/text';

export default function NotesView({ state, actions }) {
  const [editing, setEditing] = useState(null); // note object, or 'new'
  const [draft, setDraft] = useState({ title: '', body: '' });
  const [query, setQuery] = useState('');

  const open = (note) => {
    setEditing(note);
    setDraft(note === 'new' ? { title: '', body: '' } : { title: note.title, body: note.body });
  };

  const save = () => {
    const title = draft.title.trim();
    const body = draft.body.trim();
    if (!title && !body) {
      setEditing(null);
      return;
    }
    if (editing === 'new') actions.addNote({ title, body });
    else actions.updateNote(editing.id, { title, body });
    setEditing(null);
  };

  const notes = useMemo(() => {
    const term = query.trim().toLowerCase();
    return [...state.notes]
      .filter((note) => !term || `${note.title} ${note.body}`.toLowerCase().includes(term))
      .sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return a.updatedAt < b.updatedAt ? 1 : -1;
      });
  }, [state.notes, query]);

  return (
    <div>
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-txt-primary">Notas</h1>
          <p className="mt-1 text-sm text-txt-secondary">{plural(state.notes.length, 'guardada', 'guardadas')}</p>
        </div>
        <button
          type="button"
          onClick={() => open('new')}
          className="flex items-center gap-2 rounded-xl border border-border bg-bg-surface px-3.5 py-2.5 text-sm font-medium text-txt-primary active:scale-95"
        >
          <Plus size={16} /> Nueva
        </button>
      </header>

      {state.notes.length > 3 && (
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar notas"
          className="mb-4 w-full rounded-xl border border-border bg-bg-surface px-4 py-3 text-base text-txt-primary placeholder:text-txt-muted focus:border-accent-blue focus:outline-none"
        />
      )}

      {notes.length > 0 ? (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note.id} className="rounded-2xl border border-border bg-bg-surface">
              <div className="flex items-start gap-2 px-4 py-4">
                <button type="button" onClick={() => open(note)} className="flex-1 text-left active:opacity-60">
                  <p className="text-[15px] font-semibold text-txt-primary">{note.title || 'Sin título'}</p>
                  {note.body && (
                    <p className="mt-1 line-clamp-3 whitespace-pre-line text-sm leading-relaxed text-txt-secondary">
                      {note.body}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-txt-muted">{formatTimestamp(note.updatedAt)}</p>
                </button>
                <button
                  type="button"
                  onClick={() => actions.togglePin(note.id)}
                  aria-label={note.pinned ? 'Desfijar nota' : 'Fijar nota'}
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full active:scale-90 ${
                    note.pinned ? 'bg-accent-blue/15 text-accent-blue' : 'text-txt-muted'
                  }`}
                >
                  <Pin size={16} fill={note.pinned ? 'currentColor' : 'none'} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          icon={NotebookPen}
          title={query ? 'Sin resultados' : 'Todavía no hay notas'}
          hint={query ? 'Probá con otras palabras.' : 'Ideas, links, listas de compras, lo que sea.'}
        />
      )}

      <Sheet
        open={Boolean(editing)}
        title={editing === 'new' ? 'Nueva nota' : 'Editar nota'}
        onClose={save}
        footer={
          <button type="button" className={primaryButtonClass} onClick={save}>
            Guardar
          </button>
        }
      >
        <div className="space-y-5">
          <input
            className={`${inputClass} text-lg font-semibold`}
            value={draft.title}
            autoFocus={editing === 'new'}
            placeholder="Título"
            onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
          />
          <textarea
            className={`${inputClass} min-h-[220px] resize-y leading-relaxed`}
            value={draft.body}
            placeholder="Escribí acá…"
            onChange={(event) => setDraft((prev) => ({ ...prev, body: event.target.value }))}
          />
          {editing && editing !== 'new' && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('¿Eliminar esta nota?')) {
                  actions.removeNote(editing.id);
                  setEditing(null);
                }
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-400 active:scale-[0.99]"
            >
              <Trash2 size={16} /> Eliminar nota
            </button>
          )}
        </div>
      </Sheet>
    </div>
  );
}
