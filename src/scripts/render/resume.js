import { $ } from '../utils/dom.js';
import { safeHref } from '../utils/sanitize.js';

/**
 * Populates the Resume.pdf window from site.config.js.
 * @param {import('../../config/site.config.js').CONFIG} config
 */
export function renderResume(config) {
  $('#resume-name').textContent = config.name;
  $('#resume-role').textContent = `${config.role} · ${config.location}`;
  $('#resume-download').href = safeHref(config.links.resume);
}
