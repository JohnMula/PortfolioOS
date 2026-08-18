import { $, $$ } from '../utils/dom.js';

/**
 * Wires up Start menu open/close behaviour, the shutdown flyout, and the
 * Start menu's live program/file search filter. Call once during app init.
 */
export function initStartMenuControls() {
  const startBtn = $('#start-button');
  const startMenu = $('#start-menu');
  const shutdownArrow = $('#shutdown-arrow');
  const shutdownFlyout = $('#shutdown-flyout');

  startBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = startMenu.classList.toggle('open');
    startBtn.setAttribute('aria-expanded', String(isOpen));
    shutdownFlyout.classList.remove('open');
  });

  document.addEventListener('click', (event) => {
    if (!startMenu.contains(event.target) && event.target !== startBtn) {
      startMenu.classList.remove('open');
      startBtn.setAttribute('aria-expanded', 'false');
    }
  });

  shutdownArrow.addEventListener('click', (event) => {
    event.stopPropagation();
    shutdownFlyout.classList.toggle('open');
  });

  $('#sm-search').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    $$('#sm-left .sm-item').forEach((item) => {
      item.style.display = item.textContent.toLowerCase().includes(query) ? 'flex' : 'none';
    });
  });
}
