import { $, $$ } from '../utils/dom.js';

/**
 * Wires up the taskbar's "show desktop" corner: click once to hide all
 * open windows, click again to restore exactly the ones that were open.
 * Call once during app init.
 */
export function initShowDesktop() {
  let peeking = false;
  const wasVisible = new Set();

  $('#show-desktop').addEventListener('click', () => {
    const windows = $$('.window');

    if (!peeking) {
      wasVisible.clear();
      windows.forEach((win) => {
        if (!win.classList.contains('hidden')) {
          wasVisible.add(win.id);
          win.classList.add('hidden');
        }
      });
      peeking = true;
    } else {
      windows.forEach((win) => {
        if (wasVisible.has(win.id)) win.classList.remove('hidden');
      });
      peeking = false;
    }
  });
}
