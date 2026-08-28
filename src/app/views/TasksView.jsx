import { useMemo, useState } from 'react';
import { ListChecks, Search, X } from 'lucide-react';
import { TaskList } from '../components/TaskRow';
import { EmptyState, SectionLabel, toneOf } from '../components/ui';
import { today } from '../lib/dates';
import { sortTasks } from '../lib/store';
import { plural } from '../lib/text';

const FILTERS = [
  { key: 'abiertas', label: 'Abiertas' },
  { key: 'hoy', label: 'Hoy' },
  { key: 'proximas', label: 'Próximas' },
  { key: 'sinfecha', label: 'Sin fecha' },
  { key: 'hechas', label: 'Hechas' },
];

export default function TasksView({ state, actions, onOpenTask, listId, onListChange }) {
  const [filter, setFilter] = useState('abiertas');
  const [query, setQuery] = useState('');

  const tasks = useMemo(() => {
    const now = today();
    const term = query.trim().toLowerCase();
    return sortTasks(
      state.tasks.filter((task) => {
        if (listId !== 'all' && (task.listId || 'inbox') !== listId) return false;
        if (term && !`${task.title} ${task.notes}`.toLowerCase().includes(term)) return false;
        switch (filter) {
          case 'hechas':
            return task.done;
          case 'hoy':
            return !task.done && task.due !== null && task.due <= now;
          case 'proximas':
            return !task.done && task.due !== null && task.due > now;
          case 'sinfecha':
            return !task.done && task.due === null;
          default:
            return !task.done;
        }
      })
    );
  }, [state.tasks, filter, listId, query]);

  const doneCount = state.tasks.filter((task) => task.done).length;

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-2xl font-bold text-txt-primary">Tareas</h1>
        <p className="mt-1 text-sm text-txt-secondary">
          {plural(state.tasks.filter((task) => !task.done).length, 'abierta', 'abiertas')} ·{' '}
          {plural(doneCount, 'completada', 'completadas')}
        </p>
      </header>

      <div className="relative mb-3">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-txt-muted" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar tareas"
          className="w-full rounded-xl border border-border bg-bg-surface py-3 pl-10 pr-10 text-base text-txt-primary placeholder:text-txt-muted focus:border-accent-blue focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Limpiar búsqueda"
            className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-bg-elevated text-txt-muted"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="-mx-5 mb-2 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTERS.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => setFilter(option.key)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              filter === option.key
                ? 'border-accent-blue bg-accent-blue/15 text-accent-blue'
                : 'border-border bg-bg-surface text-txt-secondary'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="-mx-5 mb-4 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {[{ id: 'all', name: 'Todas las listas' }, { id: 'inbox', name: 'Entrada' }, ...state.lists].map((list) => {
          const tone = list.color ? toneOf(list.color) : null;
          const active = listId === list.id;
          return (
            <button
              key={list.id}
              type="button"
              onClick={() => onListChange(list.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium ${
                active ? 'border-txt-secondary bg-bg-elevated text-txt-primary' : 'border-border text-txt-muted'
              }`}
            >
              {tone && <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />}
              {list.name}
            </button>
          );
        })}
      </div>

      {tasks.length > 0 ? (
        <>
          <SectionLabel count={tasks.length}>{FILTERS.find((f) => f.key === filter).label}</SectionLabel>
          <TaskList tasks={tasks} lists={state.lists} onToggle={actions.toggleTask} onOpen={onOpenTask} />
          {filter === 'hechas' && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`¿Borrar ${doneCount} tareas completadas? No se puede deshacer.`)) actions.clearCompleted();
              }}
              className="mt-4 w-full rounded-xl border border-border bg-bg-surface px-4 py-3 text-sm font-medium text-txt-secondary active:scale-[0.99]"
            >
              Vaciar completadas
            </button>
          )}
        </>
      ) : (
        <EmptyState
          icon={ListChecks}
          title={query ? 'Sin resultados' : 'Nada por acá'}
          hint={query ? 'Probá con otras palabras.' : 'Cambiá de filtro o agregá una tarea con el botón +.'}
        />
      )}
    </div>
  );
}
