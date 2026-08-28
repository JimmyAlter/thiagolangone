import { Check, Flag } from 'lucide-react';
import { formatDue, isOverdue } from '../lib/dates';
import { toneOf } from './ui';

export default function TaskRow({ task, list, onToggle, onOpen }) {
  const overdue = !task.done && isOverdue(task.due);
  const tone = list ? toneOf(list.color) : null;

  return (
    <li className="flex items-start gap-3 border-b border-border/60 last:border-b-0">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        aria-pressed={task.done}
        aria-label={task.done ? `Reabrir ${task.title}` : `Completar ${task.title}`}
        className={`mt-3.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors active:scale-90 ${
          task.done ? 'border-accent-blue bg-accent-blue text-bg' : 'border-border-hover text-transparent'
        }`}
      >
        <Check size={14} strokeWidth={3.5} />
      </button>

      <button
        type="button"
        onClick={() => onOpen(task)}
        className="flex-1 py-3 pr-1 text-left active:opacity-60"
      >
        <p className={`text-[15px] leading-snug ${task.done ? 'text-txt-muted line-through' : 'text-txt-primary'}`}>
          {task.title}
        </p>

        {(task.due || list || task.priority === 'high' || task.notes) && (
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            {task.due && (
              <span className={overdue ? 'font-semibold text-rose-400' : 'text-txt-muted'}>{formatDue(task.due)}</span>
            )}
            {list && (
              <span className="flex items-center gap-1.5 text-txt-muted">
                <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
                {list.name}
              </span>
            )}
            {task.priority === 'high' && !task.done && (
              <span className="flex items-center gap-1 font-medium text-amber-400">
                <Flag size={11} strokeWidth={2.5} /> Alta
              </span>
            )}
            {task.notes && <span className="truncate text-txt-muted">{task.notes.split('\n')[0]}</span>}
          </div>
        )}
      </button>
    </li>
  );
}

export function TaskList({ tasks, lists, onToggle, onOpen }) {
  const listsById = Object.fromEntries(lists.map((list) => [list.id, list]));
  return (
    <ul className="rounded-2xl border border-border bg-bg-surface px-4">
      {tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          list={task.listId ? listsById[task.listId] : null}
          onToggle={onToggle}
          onOpen={onOpen}
        />
      ))}
    </ul>
  );
}
