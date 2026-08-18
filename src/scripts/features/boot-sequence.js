import { $ } from '../utils/dom.js';
import { openWindow } from './window-manager.js';

/**
 * Opens the default windows on load (About Me ends up focused on top),
 * then plays the boot screen fade-out. Respects prefers-reduced-motion.
 * Call once during app init.
 * @param {import('../../config/site.config.js').CONFIG} config
 */
export function initBootSequence(config) {
  openWindow('win-about');
  openWindow('win-projects');
  openWindow('win-about'); // Re-focus About so it's the active window after boot.

  const bootScreen = $('#boot-screen');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  $('#boot-title').textContent = `Starting ${config.name.split(' ')[0]} OS…`;

  setTimeout(
    () => {
      bootScreen.classList.add('hide-fade');
      setTimeout(() => {
        bootScreen.style.display = 'none';
      }, prefersReducedMotion ? 0 : 520);
    },
    prefersReducedMotion ? 0 : 1250,
  );
}
