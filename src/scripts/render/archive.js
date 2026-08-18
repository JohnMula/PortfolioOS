import { $ } from '../utils/dom.js';
import { escapeHtml } from '../utils/sanitize.js';

/**
 * Populates the Archive window from site.config.js.
 * @param {import('../../config/site.config.js').CONFIG} config
 */
export function renderArchive(config) {
  $('#archive-content').innerHTML = config.archive
    .map(
      (item) => `
        <div class="archive-row">
          <span class="an">${escapeHtml(item.name)}</span>
          <span class="ad">${escapeHtml(item.note)}</span>
        </div>
      `,
    )
    .join('');
}
