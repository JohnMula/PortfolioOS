import { $, $$ } from '../utils/dom.js';
import { bringToFront } from './window-manager.js';

/**
 * Makes every window draggable by its titlebar, and shows the
 * left/right snap preview while dragging near a screen edge, applying
 * the snapped half-screen layout on drop. Call once during app init.
 */
export function initDragAndSnap() {
  const desktop = $('#desktop');
  const snapPreview = $('#snap-preview');

  $$('.window').forEach((win) => {
    win.addEventListener('mousedown', () => bringToFront(win));

    const titlebar = win.querySelector('[data-drag]');
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;
    let snapSide = null;

    titlebar.addEventListener('mousedown', (event) => {
      if (event.target.closest('.wbtn')) return;
      dragging = true;
      const rect = win.getBoundingClientRect();
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
      bringToFront(win);
      event.preventDefault();
    });

    document.addEventListener('mousemove', (event) => {
      if (!dragging) return;
      const bounds = desktop.getBoundingClientRect();
      let x = event.clientX - bounds.left - offsetX;
      let y = event.clientY - bounds.top - offsetY;
      x = Math.max(-win.offsetWidth + 80, Math.min(x, bounds.width - 40));
      y = Math.max(0, Math.min(y, bounds.height - 40));
      win.style.left = `${x}px`;
      win.style.top = `${y}px`;

      const cursorX = event.clientX - bounds.left;
      if (cursorX < 24) snapSide = 'left';
      else if (cursorX > bounds.width - 24) snapSide = 'right';
      else snapSide = null;

      if (snapSide) {
        snapPreview.style.display = 'block';
        snapPreview.style.top = '0px';
        snapPreview.style.height = 'calc(100% - 44px)';
        snapPreview.style.left = snapSide === 'left' ? '0px' : '50%';
        snapPreview.style.width = '50%';
      } else {
        snapPreview.style.display = 'none';
      }
    });

    document.addEventListener('mouseup', () => {
      if (dragging && snapSide) {
        win.style.top = '0px';
        win.style.height = 'calc(100% - 44px)';
        win.style.width = '50%';
        win.style.left = snapSide === 'left' ? '0px' : '50%';
      }
      dragging = false;
      snapSide = null;
      snapPreview.style.display = 'none';
    });
  });
}
