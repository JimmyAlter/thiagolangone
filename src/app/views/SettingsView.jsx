import { useRef, useState } from 'react';
import { CheckCircle2, Download, Share, SquarePlus, Trash2, Upload } from 'lucide-react';
import { plural } from '../lib/text';

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

export default function SettingsView({ state, actions }) {
  const fileInput = useRef(null);
  const [status, setStatus] = useState(null);
  const installed = isStandalone();

  const exportData = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `organizador-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setStatus('Copia de seguridad descargada.');
  };

  const importData = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        actions.importState(JSON.parse(String(reader.result)));
        setStatus('Datos importados.');
      } catch {
        setStatus('El archivo no es una copia válida.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const rowClass =
    'flex w-full items-center gap-3 rounded-xl border border-border bg-bg-surface px-4 py-3.5 text-left text-[15px] text-txt-primary active:scale-[0.99]';

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-txt-primary">Ajustes</h1>
        <p className="mt-1 text-sm text-txt-secondary">Tus datos viven en este dispositivo</p>
      </header>

      <section>
        <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-widest text-txt-muted">Instalación</h2>
        {installed ? (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-4">
            <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />
            <p className="text-sm text-emerald-200">Instalada en tu pantalla de inicio. Funciona sin conexión.</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-bg-surface px-4 py-4">
            <p className="text-sm font-semibold text-txt-primary">Agregala a tu pantalla de inicio</p>
            <ol className="mt-3 space-y-3 text-sm text-txt-secondary">
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-bg-elevated text-xs font-bold text-accent-blue">1</span>
                <span>Abrí esta página en <strong className="text-txt-primary">Safari</strong> (no Chrome ni el navegador de Instagram).</span>
              </li>
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-bg-elevated text-xs font-bold text-accent-blue">2</span>
                <span className="flex flex-wrap items-center gap-1.5">
                  Tocá <Share size={15} className="inline text-accent-blue" /> <strong className="text-txt-primary">Compartir</strong> en la barra inferior.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-bg-elevated text-xs font-bold text-accent-blue">3</span>
                <span className="flex flex-wrap items-center gap-1.5">
                  Elegí <SquarePlus size={15} className="inline text-accent-blue" /> <strong className="text-txt-primary">Añadir a pantalla de inicio</strong> y confirmá.
                </span>
              </li>
            </ol>
            <p className="mt-3 text-xs leading-relaxed text-txt-muted">
              Queda como una app más: ícono propio, pantalla completa y sin barra del navegador.
            </p>
          </div>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-widest text-txt-muted">Datos</h2>
        <button type="button" className={rowClass} onClick={exportData}>
          <Download size={18} className="text-accent-blue" />
          <span className="flex-1">
            Exportar copia de seguridad
            <span className="block text-xs text-txt-muted">
              {plural(state.tasks.length, 'tarea', 'tareas')} · {plural(state.lists.length, 'lista', 'listas')} ·{' '}
              {plural(state.notes.length, 'nota', 'notas')}
            </span>
          </span>
        </button>

        <button type="button" className={rowClass} onClick={() => fileInput.current?.click()}>
          <Upload size={18} className="text-accent-blue" />
          <span className="flex-1">
            Importar copia
            <span className="block text-xs text-txt-muted">Reemplaza los datos actuales</span>
          </span>
        </button>
        <input ref={fileInput} type="file" accept="application/json,.json" className="hidden" onChange={importData} />

        <button
          type="button"
          className={`${rowClass} border-rose-500/30 bg-rose-500/10 text-rose-300`}
          onClick={() => {
            if (window.confirm('¿Borrar todas las tareas, listas y notas? No se puede deshacer.')) {
              actions.resetState();
              setStatus('Datos borrados.');
            }
          }}
        >
          <Trash2 size={18} />
          <span className="flex-1">Borrar todo</span>
        </button>

        {status && <p className="px-1 pt-1 text-xs text-txt-muted">{status}</p>}
      </section>

      <p className="px-1 pb-2 text-center text-xs leading-relaxed text-txt-muted">
        Organizador · funciona sin conexión y sin cuenta.
        <br />
        Nada se envía a ningún servidor: todo queda en el almacenamiento de este iPhone.
      </p>
    </div>
  );
}
