import { useState } from 'react';
import { ChevronRight, FolderPlus, Inbox, Trash2 } from 'lucide-react';
import { Field, Sheet, inputClass, primaryButtonClass, toneOf } from '../components/ui';
import { LIST_COLORS } from '../lib/store';
import { plural } from '../lib/text';

const COLOR_LABELS = { blue: 'Azul', green: 'Verde', purple: 'Violeta', amber: 'Ámbar', rose: 'Rosa' };

export default function ListsView({ state, actions, onSelectList }) {
  const [editing, setEditing] = useState(null); // list object, or 'new'
  const [name, setName] = useState('');
  const [color, setColor] = useState('blue');

  const openEditor = (list) => {
    setEditing(list);
    setName(list === 'new' ? '' : list.name);
    setColor(list === 'new' ? LIST_COLORS[state.lists.length % LIST_COLORS.length] : list.color);
  };

  const save = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (editing === 'new') actions.addList(trimmed, color);
    else actions.updateList(editing.id, { name: trimmed, color });
    setEditing(null);
  };

  const stats = (listId) => {
    const tasks = state.tasks.filter((task) => (task.listId || null) === listId);
    const done = tasks.filter((task) => task.done).length;
    return { total: tasks.length, done, open: tasks.length - done };
  };

  const inbox = stats(null);

  return (
    <div>
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-txt-primary">Listas</h1>
          <p className="mt-1 text-sm text-txt-secondary">Agrupá tus tareas por contexto</p>
        </div>
        <button
          type="button"
          onClick={() => openEditor('new')}
          className="flex items-center gap-2 rounded-xl border border-border bg-bg-surface px-3.5 py-2.5 text-sm font-medium text-txt-primary active:scale-95"
        >
          <FolderPlus size={16} /> Nueva
        </button>
      </header>

      <ul className="space-y-2">
        <li>
          <button
            type="button"
            onClick={() => onSelectList('inbox')}
            className="flex w-full items-center gap-3 rounded-2xl border border-border bg-bg-surface px-4 py-4 text-left active:scale-[0.99]"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-bg-elevated text-txt-secondary">
              <Inbox size={18} />
            </span>
            <span className="flex-1">
              <span className="block text-[15px] font-semibold text-txt-primary">Entrada</span>
              <span className="block text-xs text-txt-muted">
                {plural(inbox.open, 'abierta', 'abiertas')} · {plural(inbox.done, 'completada', 'completadas')}
              </span>
            </span>
            <ChevronRight size={18} className="text-txt-muted" />
          </button>
        </li>

        {state.lists.map((list) => {
          const tone = toneOf(list.color);
          const { open, done, total } = stats(list.id);
          const progress = total === 0 ? 0 : Math.round((done / total) * 100);
          return (
            <li key={list.id} className="rounded-2xl border border-border bg-bg-surface">
              <div className="flex items-center gap-3 px-4 py-4">
                <button
                  type="button"
                  onClick={() => onSelectList(list.id)}
                  className="flex flex-1 items-center gap-3 text-left active:opacity-60"
                >
                  <span className={`h-10 w-1.5 shrink-0 rounded-full ${tone.dot}`} />
                  <span className="flex-1">
                    <span className="block text-[15px] font-semibold text-txt-primary">{list.name}</span>
                    <span className="block text-xs text-txt-muted">
                      {plural(open, 'abierta', 'abiertas')} · {plural(done, 'completada', 'completadas')}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => openEditor(list)}
                  className="rounded-lg px-3 py-2 text-xs font-medium text-txt-secondary active:scale-95"
                >
                  Editar
                </button>
              </div>
              {total > 0 && (
                <div className="px-4 pb-4">
                  <div className="h-1.5 overflow-hidden rounded-full bg-bg-elevated">
                    <div className={`h-full rounded-full ${tone.dot}`} style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <Sheet
        open={Boolean(editing)}
        title={editing === 'new' ? 'Nueva lista' : 'Editar lista'}
        onClose={() => setEditing(null)}
        footer={
          <button type="button" className={primaryButtonClass} disabled={!name.trim()} onClick={save}>
            {editing === 'new' ? 'Crear lista' : 'Guardar'}
          </button>
        }
      >
        <div className="space-y-5">
          <Field label="Nombre">
            <input
              className={inputClass}
              value={name}
              autoFocus
              placeholder="Ej: Estudio, Casa, Freelance"
              onChange={(event) => setName(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && save()}
            />
          </Field>

          <Field label="Color">
            <div className="flex flex-wrap gap-2">
              {LIST_COLORS.map((option) => {
                const tone = toneOf(option);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setColor(option)}
                    aria-label={COLOR_LABELS[option]}
                    className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm ${
                      color === option ? tone.chip : 'border-border bg-bg-elevated text-txt-secondary'
                    }`}
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${tone.dot}`} />
                    {COLOR_LABELS[option]}
                  </button>
                );
              })}
            </div>
          </Field>

          {editing && editing !== 'new' && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`¿Eliminar "${editing.name}"? Sus tareas pasan a Entrada.`)) {
                  actions.removeList(editing.id);
                  setEditing(null);
                }
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-400 active:scale-[0.99]"
            >
              <Trash2 size={16} /> Eliminar lista
            </button>
          )}
        </div>
      </Sheet>
    </div>
  );
}
