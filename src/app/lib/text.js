/** "1 tarea" / "3 tareas" — Spanish plurals read wrong when hardcoded. */
export const plural = (count, singular, many) => `${count} ${count === 1 ? singular : many}`;
