import { CalendarClock, CircleAlert, Inbox, PartyPopper } from 'lucide-react';
import { TaskList } from '../components/TaskRow';
import { EmptyState, SectionLabel } from '../components/ui';
import { addDays, formatLongDate, today } from '../lib/dates';
import { useTaskBuckets } from '../lib/store';

export default function TodayView({ state, actions, onOpenTask }) {
  const buckets = useTaskBuckets(state.tasks);
  const horizon = addDays(today(), 7);
  const thisWeek = buckets.upcoming.filter((task) => task.due <= horizon);

  const dueToday = [...buckets.overdue, ...buckets.todayTasks];
  const completedToday = state.tasks.filter((task) => task.done && task.doneAt?.slice(0, 10) === today());
  const total = dueToday.length + completedToday.length;
  const progress = total === 0 ? 0 : Math.round((completedToday.length / total) * 100);

  return (
    <div className="space-y-1">
      <header className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent-blue">Hoy</p>
        <h1 className="mt-1 text-2xl font-bold text-txt-primary first-letter:uppercase">{formatLongDate()}</h1>
        <p className="mt-1 text-sm text-txt-secondary">
          {dueToday.length === 0
            ? 'Nada pendiente para hoy.'
            : `${dueToday.length} ${dueToday.length === 1 ? 'tarea pendiente' : 'tareas pendientes'}`}
          {buckets.overdue.length > 0 && ` · ${buckets.overdue.length} atrasada${buckets.overdue.length === 1 ? '' : 's'}`}
        </p>

        {total > 0 && (
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-bg-elevated">
              <div
                className="h-full rounded-full bg-accent-blue transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-txt-muted">
              {completedToday.length} de {total} completadas · {progress}%
            </p>
          </div>
        )}
      </header>

      {buckets.overdue.length > 0 && (
        <>
          <SectionLabel count={buckets.overdue.length}>Atrasadas</SectionLabel>
          <TaskList tasks={buckets.overdue} lists={state.lists} onToggle={actions.toggleTask} onOpen={onOpenTask} />
        </>
      )}

      <SectionLabel count={buckets.todayTasks.length}>Para hoy</SectionLabel>
      {buckets.todayTasks.length > 0 ? (
        <TaskList tasks={buckets.todayTasks} lists={state.lists} onToggle={actions.toggleTask} onOpen={onOpenTask} />
      ) : (
        <EmptyState
          icon={buckets.overdue.length > 0 ? CircleAlert : PartyPopper}
          title={completedToday.length > 0 ? 'Todo listo por hoy' : 'Sin tareas para hoy'}
          hint="Tocá el botón + para agregar algo con fecha de hoy."
        />
      )}

      {thisWeek.length > 0 && (
        <>
          <SectionLabel count={thisWeek.length}>Próximos 7 días</SectionLabel>
          <TaskList tasks={thisWeek} lists={state.lists} onToggle={actions.toggleTask} onOpen={onOpenTask} />
        </>
      )}

      {buckets.someday.length > 0 && (
        <>
          <SectionLabel count={buckets.someday.length}>Entrada (sin fecha)</SectionLabel>
          <TaskList
            tasks={buckets.someday.slice(0, 5)}
            lists={state.lists}
            onToggle={actions.toggleTask}
            onOpen={onOpenTask}
          />
          {buckets.someday.length > 5 && (
            <p className="mt-2 px-1 text-xs text-txt-muted">
              <Inbox size={12} className="mr-1 inline" />
              {buckets.someday.length - 5} más en la pestaña Tareas
            </p>
          )}
        </>
      )}

      {completedToday.length > 0 && (
        <>
          <SectionLabel count={completedToday.length}>Completadas hoy</SectionLabel>
          <TaskList tasks={completedToday} lists={state.lists} onToggle={actions.toggleTask} onOpen={onOpenTask} />
        </>
      )}

      {state.tasks.length === 0 && (
        <div className="mt-6">
          <EmptyState
            icon={CalendarClock}
            title="Tu día empieza acá"
            hint="Agregá tu primera tarea con el botón +. Todo se guarda en tu iPhone, sin cuenta ni conexión."
          />
        </div>
      )}
    </div>
  );
}
