import { $ } from '../utils/dom.js';
import { escapeHtml } from '../utils/sanitize.js';

/**
 * Populates the "About Me" window (styled as a System Properties panel)
 * from site.config.js.
 * @param {import('../../config/site.config.js').CONFIG} config
 */
export function renderAbout(config) {
  $('#about-content').innerHTML = `
    <div class="sysprops-head">
      <div class="avatar-badge">${escapeHtml(config.initials)}</div>
      <div>
        <h3>${escapeHtml(config.name)} — Personal Edition</h3>
        <p>${escapeHtml(config.tagline)}</p>
      </div>
    </div>
    <table class="sysprops-table">
      <tr><td>Role</td><td>${escapeHtml(config.role)}</td></tr>
      <tr><td>Based in</td><td>${escapeHtml(config.location)}</td></tr>
      <tr><td>Experience</td><td>${escapeHtml(config.experience)}</td></tr>
      <tr><td>Currently building</td><td>${escapeHtml(config.building)}</td></tr>
      <tr><td>Currently learning</td><td>${escapeHtml(config.learning)}</td></tr>
      <tr><td>Primary stack</td><td>${escapeHtml(config.stack)}</td></tr>
      <tr><td>System type</td><td>Full-stack (64-bit)</td></tr>
    </table>
    <p class="sysprops-bio">${escapeHtml(config.bio)}</p>
  `;
}
