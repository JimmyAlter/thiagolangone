import { useCallback, useEffect, useState } from 'react';
import { CalendarCheck, FolderOpen, ListTodo, NotebookPen, Plus, RefreshCw, Settings } from 'lucide-react';
import TaskEditor from './components/TaskEditor';
import ListsView from './views/ListsView';
import NotesView from './views/NotesView';
import SettingsView from './views/SettingsView';
import TasksView from './views/TasksView';
import TodayView from './views/TodayView';
import { today } from './lib/dates';
import { registerServiceWorker } from './lib/registerSW';
import { useOrganizer } from './lib/store';

const TABS = [
  { key: 'hoy', label: 'Hoy', icon: CalendarCheck },
  { key: 'tareas', label: 'Tareas', icon: ListTodo },
  { key: 'listas', label: 'Listas', icon: FolderOpen },
  { key: 'notas', label: 'Notas', icon: NotebookPen },
  { key: 'ajustes', label: 'Ajustes', icon: Settings },
];

export default function OrganizerApp() {
  const [state, actions] = useOrganizer();
  const [tab, setTab] = useState('hoy');
  const [listFilter, setListFilter] = useState('all');
  const [editor, setEditor] = useState(null); // { task } for edit, { defaults } for new
  const [applyUpdate, setApplyUpdate] = useState(null);

  useEffect(() => {
    registerServiceWorker({ onUpdateReady: (apply) => setApplyUpdate(() => apply) });
  }, []);

  const openNewTask = useCallback(() => {
    const defaults = {
      due: tab === 'hoy' ? today() : null,
      listId: tab === 'tareas' && listFilter !== 'all' && listFilter !== 'inbox' ? listFilter : null,
    };
    setEditor({ task: null, defaults });
  }, [tab, listFilter]);

  const openTask = useCallback((task) => setEditor({ task, defaults: {} }), []);

  const saveTask = (draft) => {
    if (editor?.task) actions.updateTask(editor.task.id, draft);
    else actions.addTask(draft);
    setEditor(null);
  };

  const showFab = tab === 'hoy' || tab === 'tareas';

  const goToList = (id) => {
    setListFilter(id);
    setTab('tareas');
  };

  return (
    <div className="flex min-h-[100svh] flex-col bg-bg text-txt-primary">
      {applyUpdate && (
        <button
          type="button"
          onClick={applyUpdate}
          className="sticky top-0 z-40 flex w-full items-center justify-center gap-2 bg-accent-blue px-4 py-2.5 text-sm font-semibold text-bg"
          style={{ paddingTop: 'calc(0.625rem + env(safe-area-inset-top))' }}
        >
          <RefreshCw size={15} /> Nueva versión lista · tocá para actualizar
        </button>
      )}

      <main
        className="flex-1 px-5 pb-40"
        style={{ paddingTop: applyUpdate ? '1.25rem' : 'calc(1.25rem + env(safe-area-inset-top))' }}
      >
        {tab === 'hoy' && <TodayView state={state} actions={actions} onOpenTask={openTask} />}
        {tab === 'tareas' && (
          <TasksView
            state={state}
            actions={actions}
            onOpenTask={openTask}
            listId={listFilter}
            onListChange={setListFilter}
          />
        )}
        {tab === 'listas' && <ListsView state={state} actions={actions} onSelectList={goToList} />}
        {tab === 'notas' && <NotesView state={state} actions={actions} />}
        {tab === 'ajustes' && <SettingsView state={state} actions={actions} />}
      </main>

      {showFab && (
        <button
          type="button"
          onClick={openNewTask}
          aria-label="Nueva tarea"
          className="fixed right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-accent-blue text-bg shadow-lg shadow-accent-blue/25 active:scale-90"
          style={{ bottom: 'calc(5.5rem + env(safe-area-inset-bottom))' }}
        >
          <Plus size={26} strokeWidth={2.5} />
        </button>
      )}

      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-bg-surface/90 backdrop-blur-xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <ul className="mx-auto flex max-w-lg">
          {TABS.map(({ key, label, icon: Icon }) => (
            <li key={key} className="flex-1">
              <button
                type="button"
                onClick={() => setTab(key)}
                aria-current={tab === key ? 'page' : undefined}
                className={`flex w-full flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                  tab === key ? 'text-accent-blue' : 'text-txt-muted'
                }`}
              >
                <Icon size={22} strokeWidth={tab === key ? 2.4 : 1.9} />
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <TaskEditor
        open={Boolean(editor)}
        task={editor?.task || null}
        defaults={editor?.defaults || {}}
        lists={state.lists}
        onClose={() => setEditor(null)}
        onSave={saveTask}
        onDelete={(id) => {
          actions.removeTask(id);
          setEditor(null);
        }}
      />
    </div>
  );
}
