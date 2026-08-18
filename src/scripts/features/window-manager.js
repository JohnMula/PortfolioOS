import { $, $$ } from '../utils/dom.js';

let zTop = 20;

/**
 * Raises a window above all others and marks its matching taskbar entry
 * as active.
 * @param {HTMLElement} win
 */
export function bringToFront(win) {
  zTop += 1;
  win.style.zIndex = zTop;
  $$('.task-item[data-open]').forEach((t) => t.classList.remove('active'));
  const item = $(`.task-item[data-open="${win.id}"]`);
  if (item) item.classList.add('active');
}

/**
 * Shows a window, brings it to front, and closes the Start menu.
 * @param {string} id
 */
export function openWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  win.classList.remove('hidden');
  bringToFront(win);

  const startMenu = $('#start-menu');
  const startBtn = $('#start-button');
  startMenu.classList.remove('open');
  startBtn.setAttribute('aria-expanded', 'false');
}

/**
 * Hides a window and deactivates its taskbar entry.
 * @param {string} id
 */
export function hideWindow(id) {
  const win = document.getElementById(id);
  win.classList.add('hidden');
  const item = $(`.task-item[data-open="${id}"]`);
  if (item) item.classList.remove('active');
}

/**
 * Taskbar click behaviour: open if hidden, hide if already focused on
 * top, otherwise bring to front.
 * @param {string} id
 */
export function taskbarToggle(id) {
  const win = document.getElementById(id);
  const isTop = Number.parseInt(win.style.zIndex || '0', 10) === zTop && !win.classList.contains('hidden');
  if (win.classList.contains('hidden')) openWindow(id);
  else if (isTop) hideWindow(id);
  else bringToFront(win);
}

/**
 * Wires up every element that opens/closes/toggles a window: desktop
 * icons, taskbar entries, Start menu items, and each window's
 * minimize / maximize / close buttons. Call once during app init.
 */
export function initWindowManager() {
  $$('[data-open]').forEach((el) => {
    if (el.classList.contains('task-item')) {
      el.addEventListener('click', () => taskbarToggle(el.dataset.open));
    } else if (el.classList.contains('dicon')) {
      el.addEventListener('click', () => {
        $$('.dicon').forEach((d) => d.classList.remove('selected'));
        el.classList.add('selected');
      });
      el.addEventListener('dblclick', () => openWindow(el.dataset.open));
      el.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openWindow(el.dataset.open);
        }
      });
    } else {
      el.addEventListener('click', () => openWindow(el.dataset.open));
    }
  });

  $$('.wbtn').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      const id = btn.dataset.target;
      const win = document.getElementById(id);
      const action = btn.dataset.action;

      if (action === 'min' || action === 'close') {
        hideWindow(id);
      } else if (action === 'max') {
        if (win.dataset.maxed === '1') {
          win.style.top = win.dataset.pt;
          win.style.left = win.dataset.pl;
          win.style.width = win.dataset.pw;
          win.style.height = win.dataset.ph;
          win.dataset.maxed = '0';
        } else {
          win.dataset.pt = win.style.top;
          win.dataset.pl = win.style.left;
          win.dataset.pw = win.style.width;
          win.dataset.ph = win.style.height;
          win.style.top = '0px';
          win.style.left = '0px';
          win.style.width = '100%';
          win.style.height = 'calc(100% - 44px)';
          win.dataset.maxed = '1';
        }
      }
    });
  });
}
