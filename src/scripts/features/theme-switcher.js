import { $, $$ } from '../utils/dom.js';

const THEMES = [
  { id: 'aero', color: '#2a72c7' },
  { id: 'graphite', color: '#5c6773' },
  { id: 'sunset', color: '#f2792a' },
  { id: 'forest', color: '#2f8f3d' },
  { id: 'berry', color: '#832ac7' },
];

/**
 * Renders the accent-color swatches in Settings and wires up theme
 * switching plus the "Reduce motion" toggle. Call once during app init.
 */
export function initThemeSwitcher() {
  const swatchWrap = $('#theme-swatches');

  swatchWrap.innerHTML = THEMES.map(
    (theme, i) => `<div class="swatch${i === 0 ? ' selected' : ''}" data-theme="${theme.id}" style="background:${theme.color}" title="${theme.id}"></div>`,
  ).join('');

  $$('.swatch', swatchWrap).forEach((swatch) => {
    swatch.addEventListener('click', () => {
      document.documentElement.setAttribute('data-theme', swatch.dataset.theme === 'aero' ? '' : swatch.dataset.theme);
      $$('.swatch', swatchWrap).forEach((s) => s.classList.remove('selected'));
      swatch.classList.add('selected');
    });
  });

  const reduceMotionToggle = $('#reduce-motion-toggle');
  reduceMotionToggle.addEventListener('change', (event) => {
    document.body.classList.toggle('reduce-motion', event.target.checked);
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    reduceMotionToggle.checked = true;
    document.body.classList.add('reduce-motion');
  }
}
