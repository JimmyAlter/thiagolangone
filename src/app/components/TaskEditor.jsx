import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { addDays, today } from '../lib/dates';
import { PRIORITIES } from '../lib/store';
import { Field, Sheet, inputClass, primaryButtonClass, toneOf } from './ui';

const blank = { title: '', notes: '', due: null, listId: null, priority: 'normal' };

/** One sheet for both creating and editing — `task` null means "new". */
export default function TaskEditor({ open, task, lists, defaults, onClose, onSave, onDelete }) {
  const [draft, setDraft] = useState(blank);

  useEffect(() => {
    if (!open) return;
    setDraft(task ? { ...task } : { ...blank, ...defaults });
  }, [open, task, defaults]);

  const set = (changes) => setDraft((prev) => ({ ...prev, ...changes }));
  const canSave = draft.title.trim().length > 0;

  const quickDates = [
    { label: 'Hoy', value: today() },
    { label: 'Mañana', value: addDays(today(), 1) },
    { label: 'En una semana', value: addDays(today(), 7) },
    { label: 'Sin fecha', value: null },
  ];

  return (
    <Sheet
      open={open}
      title={task ? 'Editar tarea' : 'Nueva tarea'}
      onClose={onClose}
      footer={
        <button
          type="button"
          className={primaryButtonClass}
          disabled={!canSave}
          onClick={() => canSave && onSave({ ...draft, title: draft.title.trim() })}
        >
          {task ? 'Guardar cambios' : 'Agregar tarea'}
        </button>
      }
    >
      <div className="space-y-5">
        <Field label="Tarea">
          <input
            className={inputClass}
            value={draft.title}
            autoFocus={!task}
            enterKeyHint="done"
            placeholder="¿Qué hay que hacer?"
            onChange={(event) => set({ title: event.target.value })}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && canSave) onSave({ ...draft, title: draft.title.trim() });
            }}
          />
        </Field>

        <Field label="Fecha">
          <div className="mb-2 flex flex-wrap gap-2">
            {quickDates.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => set({ due: option.value })}
                className={`rounded-full border px-3.5 py-2 text-sm transition-colors ${
                  draft.due === option.value
                    ? 'border-accent-blue bg-accent-blue/15 text-accent-blue'
                    : 'border-border bg-bg-elevated text-txt-secondary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <input
            type="date"
            className={inputClass}
            value={draft.due || ''}
            onChange={(event) => set({ due: event.target.value || null })}
          />
        </Field>

        <Field label="Lista">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => set({ listId: null })}
              className={`rounded-full border px-3.5 py-2 text-sm ${
                draft.listId === null ? 'border-accent-blue bg-accent-blue/15 text-accent-blue' : 'border-border bg-bg-elevated text-txt-secondary'
              }`}
            >
              Entrada
            </button>
            {lists.map((list) => {
              const tone = toneOf(list.color);
              const active = draft.listId === list.id;
              return (
                <button
                  key={list.id}
                  type="button"
                  onClick={() => set({ listId: list.id })}
                  className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm ${
                    active ? tone.chip : 'border-border bg-bg-elevated text-txt-secondary'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
                  {list.name}
                </button>
              );
            })}
          </div>
        </Field>

        <Field label="Prioridad">
          <div className="flex gap-2 rounded-xl border border-border bg-bg-elevated p-1">
            {Object.entries(PRIORITIES).map(([key, meta]) => (
              <button
                key={key}
                type="button"
                onClick={() => set({ priority: key })}
                className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  draft.priority === key ? 'bg-accent-blue/20 text-accent-blue' : 'text-txt-secondary'
                }`}
              >
                {meta.label}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Notas">
          <textarea
            className={`${inputClass} min-h-[90px] resize-y`}
            value={draft.notes || ''}
            placeholder="Detalles, links, recordatorios…"
            onChange={(event) => set({ notes: event.target.value })}
          />
        </Field>

        {task && (
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-400 active:scale-[0.99]"
          >
            <Trash2 size={16} /> Eliminar tarea
          </button>
        )}
      </div>
    </Sheet>
  );
}
