const DAY_MS = 24 * 60 * 60 * 1000;

const WEEKDAYS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MONTHS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

/** Local calendar day as YYYY-MM-DD (never UTC, so "hoy" matches the phone). */
export function toISODate(date = new Date()) {
  const offset = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 10);
}

export function today() {
  return toISODate();
}

export function addDays(iso, days) {
  const [y, m, d] = iso.split('-').map(Number);
  return toISODate(new Date(y, m - 1, d + days));
}

export function daysUntil(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split('-').map(Number);
  const target = new Date(y, m - 1, d).getTime();
  const now = new Date();
  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.round((target - base) / DAY_MS);
}

export function isOverdue(iso) {
  const diff = daysUntil(iso);
  return diff !== null && diff < 0;
}

export function isToday(iso) {
  return daysUntil(iso) === 0;
}

/** Short, human label for a due date: Hoy, Mañana, Ayer, or "vie 12 sep". */
export function formatDue(iso) {
  if (!iso) return '';
  const diff = daysUntil(iso);
  if (diff === 0) return 'Hoy';
  if (diff === 1) return 'Mañana';
  if (diff === -1) return 'Ayer';
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  if (diff < -1) return `Atrasada · ${WEEKDAYS[date.getDay()]} ${d} ${MONTHS[m - 1]}`;
  const suffix = date.getFullYear() === new Date().getFullYear() ? '' : ` ${y}`;
  return `${WEEKDAYS[date.getDay()]} ${d} ${MONTHS[m - 1]}${suffix}`;
}

export function formatLongDate(date = new Date()) {
  const weekday = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'][date.getDay()];
  const month = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
    'septiembre', 'octubre', 'noviembre', 'diciembre'][date.getMonth()];
  return `${weekday} ${date.getDate()} de ${month}`;
}

export function formatTimestamp(value) {
  if (!value) return '';
  const date = new Date(value);
  const diff = daysUntil(toISODate(date));
  const time = date.toTimeString().slice(0, 5);
  if (diff === 0) return `Hoy ${time}`;
  if (diff === -1) return `Ayer ${time}`;
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${time}`;
}
