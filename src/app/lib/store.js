import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { today } from './dates';

const STORAGE_KEY = 'organizador:v1';

export const LIST_COLORS = ['blue', 'green', 'purple', 'amber', 'rose'];

export const PRIORITIES = {
  high: { label: 'Alta', short: '!!!' },
  normal: { label: 'Normal', short: '!!' },
  low: { label: 'Baja', short: '!' },
};

const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

function seedState() {
  const now = new Date().toISOString();
  return {
    version: 1,
    lists: [
      { id: uid(), name: 'Personal', color: 'blue', createdAt: now },
      { id: uid(), name: 'Trabajo', color: 'purple', createdAt: now },
      { id: uid(), name: 'Compras', color: 'green', createdAt: now },
    ],
    tasks: [],
    notes: [],
  };
}

/** Repairs anything missing or malformed so a bad import can never brick the app. */
function normalize(raw) {
  if (!raw || typeof raw !== 'object') return seedState();
  const lists = Array.isArray(raw.lists) ? raw.lists.filter((l) => l && l.id && l.name) : [];
  const listIds = new Set(lists.map((l) => l.id));
  const tasks = Array.isArray(raw.tasks)
    ? raw.tasks
        .filter((t) => t && t.id && typeof t.title === 'string')
        .map((t) => ({
          id: t.id,
          title: t.title,
          notes: typeof t.notes === 'string' ? t.notes : '',
          listId: listIds.has(t.listId) ? t.listId : null,
          due: typeof t.due === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(t.due) ? t.due : null,
          priority: PRIORITIES[t.priority] ? t.priority : 'normal',
          done: Boolean(t.done),
          doneAt: t.doneAt || null,
          createdAt: t.createdAt || new Date().toISOString(),
        }))
    : [];
  const notes = Array.isArray(raw.notes)
    ? raw.notes
        .filter((n) => n && n.id)
        .map((n) => ({
          id: n.id,
          title: typeof n.title === 'string' ? n.title : '',
          body: typeof n.body === 'string' ? n.body : '',
          pinned: Boolean(n.pinned),
          createdAt: n.createdAt || new Date().toISOString(),
          updatedAt: n.updatedAt || n.createdAt || new Date().toISOString(),
        }))
    : [];
  return { version: 1, lists: lists.length ? lists : seedState().lists, tasks, notes };
}

function readState() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? normalize(JSON.parse(stored)) : seedState();
  } catch {
    return seedState();
  }
}

export function useOrganizer() {
  const [state, setState] = useState(readState);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* Storage full or blocked (private mode): keep working in memory. */
    }
  }, [state]);

  const actions = useMemo(() => {
    const patch = (key, id, changes) =>
      setState((prev) => ({
        ...prev,
        [key]: prev[key].map((item) => (item.id === id ? { ...item, ...changes } : item)),
      }));

    return {
      addTask: (draft) =>
        setState((prev) => ({
          ...prev,
          tasks: [
            {
              id: uid(),
              title: draft.title.trim(),
              notes: draft.notes?.trim() || '',
              listId: draft.listId ?? null,
              due: draft.due || null,
              priority: draft.priority || 'normal',
              done: false,
              doneAt: null,
              createdAt: new Date().toISOString(),
            },
            ...prev.tasks,
          ],
        })),
      updateTask: (id, changes) => patch('tasks', id, changes),
      toggleTask: (id) =>
        setState((prev) => ({
          ...prev,
          tasks: prev.tasks.map((task) =>
            task.id === id
              ? { ...task, done: !task.done, doneAt: task.done ? null : new Date().toISOString() }
              : task
          ),
        })),
      removeTask: (id) => setState((prev) => ({ ...prev, tasks: prev.tasks.filter((t) => t.id !== id) })),
      clearCompleted: () => setState((prev) => ({ ...prev, tasks: prev.tasks.filter((t) => !t.done) })),

      addList: (name, color) =>
        setState((prev) => ({
          ...prev,
          lists: [...prev.lists, { id: uid(), name: name.trim(), color, createdAt: new Date().toISOString() }],
        })),
      updateList: (id, changes) => patch('lists', id, changes),
      /** Removing a list keeps its tasks — they fall back to the inbox. */
      removeList: (id) =>
        setState((prev) => ({
          ...prev,
          lists: prev.lists.filter((l) => l.id !== id),
          tasks: prev.tasks.map((t) => (t.listId === id ? { ...t, listId: null } : t)),
        })),

      addNote: (draft) => {
        const id = uid();
        const now = new Date().toISOString();
        setState((prev) => ({
          ...prev,
          notes: [{ id, title: draft.title || '', body: draft.body || '', pinned: false, createdAt: now, updatedAt: now }, ...prev.notes],
        }));
        return id;
      },
      updateNote: (id, changes) => patch('notes', id, { ...changes, updatedAt: new Date().toISOString() }),
      togglePin: (id) =>
        setState((prev) => ({
          ...prev,
          notes: prev.notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
        })),
      removeNote: (id) => setState((prev) => ({ ...prev, notes: prev.notes.filter((n) => n.id !== id) })),

      importState: (raw) => setState(normalize(raw)),
      resetState: () => setState(seedState()),
    };
  }, []);

  return [state, actions];
}

/** Overdue first, then by due date, then by priority, then newest. */
export function sortTasks(tasks) {
  const weight = { high: 0, normal: 1, low: 2 };
  return [...tasks].sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (Boolean(a.due) !== Boolean(b.due)) return a.due ? -1 : 1;
    if (a.due && b.due && a.due !== b.due) return a.due < b.due ? -1 : 1;
    if (weight[a.priority] !== weight[b.priority]) return weight[a.priority] - weight[b.priority];
    return a.createdAt < b.createdAt ? 1 : -1;
  });
}

export function useTaskBuckets(tasks) {
  return useMemo(() => {
    const now = today();
    const open = tasks.filter((t) => !t.done);
    return {
      overdue: sortTasks(open.filter((t) => t.due && t.due < now)),
      todayTasks: sortTasks(open.filter((t) => t.due === now)),
      upcoming: sortTasks(open.filter((t) => t.due && t.due > now)),
      someday: sortTasks(open.filter((t) => !t.due)),
      done: sortTasks(tasks.filter((t) => t.done)),
    };
  }, [tasks]);
}

export function useDebouncedCallback(callback, delay) {
  const timer = useRef(null);
  const latest = useRef(callback);
  latest.current = callback;

  useEffect(() => () => clearTimeout(timer.current), []);

  return useCallback(
    (...args) => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => latest.current(...args), delay);
    },
    [delay]
  );
}
