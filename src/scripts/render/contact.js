import { $ } from '../utils/dom.js';
import { escapeHtml, safeHref } from '../utils/sanitize.js';
import { iconTile } from '../utils/icon-tile.js';

const MAIL_ICON = iconTile('#d9634f', '<rect x="2" y="4" width="16" height="12" rx="1.5"/><path d="M2.5 5l7.5 6 7.5-6"/>');
const GITHUB_ICON = iconTile('#333', '<path d="M6 4l-3 6 3 6M14 4l3 6-3 6M12 3l-4 14"/>');
const LINKEDIN_ICON = iconTile(
  '#4a6fa5',
  '<path d="M4 8h4v9H4zM4 5.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM10 8h4v1.5c1-1.3 2.2-1.7 3.5-1.2 1.4.5 2.5 1.8 2.5 4.2V17h-4v-4c0-1.1-.4-1.8-1.4-1.8s-1.6.7-1.6 1.8V17h-3z"/>',
);

/**
 * Populates the Contact window from site.config.js and wires up the
 * "Copy" button next to the email address.
 * @param {import('../../config/site.config.js').CONFIG} config
 */
export function renderContact(config) {
  const { email, github, linkedin } = config.links;

  $('#contact-content').innerHTML = `
    <div class="contact-row">
      ${MAIL_ICON}
      <a id="contact-email-link" href="${safeHref(`mailto:${email}`)}">${escapeHtml(email)}</a>
      <button class="copy-btn" id="copy-email-btn" type="button">Copy</button>
    </div>
    <div class="contact-row">
      ${GITHUB_ICON}
      <a href="${safeHref(github)}" target="_blank" rel="noopener noreferrer">GitHub</a>
    </div>
    <div class="contact-row">
      ${LINKEDIN_ICON}
      <a href="${safeHref(linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
  `;

  $('#copy-email-btn').addEventListener('click', () => {
    const button = $('#copy-email-btn');
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(email).then(() => {
      const original = button.textContent;
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = original;
      }, 1400);
    });
  });
}
