/**
 * Registers the offline service worker and reports when a newer build is
 * waiting, so the UI can offer a reload instead of silently going stale.
 */
export function registerServiceWorker({ onUpdateReady } = {}) {
  if (!('serviceWorker' in navigator) || import.meta.env.DEV) return;

  const register = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/app/sw.js', { scope: '/app/' });

      const track = (worker) => {
        if (!worker) return;
        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            onUpdateReady?.(() => worker.postMessage({ type: 'SKIP_WAITING' }));
          }
        });
      };

      if (registration.waiting && navigator.serviceWorker.controller) {
        onUpdateReady?.(() => registration.waiting.postMessage({ type: 'SKIP_WAITING' }));
      }
      registration.addEventListener('updatefound', () => track(registration.installing));

      let reloading = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (reloading) return;
        reloading = true;
        window.location.reload();
      });
    } catch {
      /* Offline support is a bonus; the app still works without it. */
    }
  };

  // React can mount after `load` has already fired, in which case waiting for
  // the event would mean never registering at all.
  if (document.readyState === 'complete') register();
  else window.addEventListener('load', register, { once: true });
}
