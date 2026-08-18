import { $ } from '../utils/dom.js';

/**
 * Renders the "skills.txt — Notepad" window from site.config.js.
 * Uses textContent (not innerHTML) since this is a plain-text view — no
 * escaping is needed here.
 * @param {import('../../config/site.config.js').CONFIG} config
 */
export function renderSkills(config) {
  const lines = Object.entries(config.skills)
    .map(([category, items]) => `${category}:\n  ${items.join(', ')}`)
    .join('\n\n');

  $('#skills-content').textContent = lines;
}
