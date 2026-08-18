import { $ } from '../utils/dom.js';
import { safeHref } from '../utils/sanitize.js';

/**
 * Populates the taskbar orb, the Start menu header, and the Start menu's
 * "Quick links" list from site.config.js.
 * @param {import('../../config/site.config.js').CONFIG} config
 */
export function renderStartMenu(config) {
  $('#orb-initials').textContent = config.initials;
  $('#sm-avatar').textContent = config.initials;
  $('#sm-name').textContent = config.name;
  $('#sm-tagline').textContent = config.role;

  $('#ql-github').href = safeHref(config.links.github);
  $('#ql-linkedin').href = safeHref(config.links.linkedin);
  $('#ql-email').href = safeHref(`mailto:${config.links.email}`);
  $('#ql-resume').href = safeHref(config.links.resume);
}
