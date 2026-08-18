import { $ } from '../utils/dom.js';
import { escapeHtml, safeHref } from '../utils/sanitize.js';

const CLOSE_ICON = `
  <div class="wbtn close" id="modal-close">
    <svg viewBox="0 0 10 10">
      <line x1="1" y1="1" x2="9" y2="9" stroke="#33506f" stroke-width="1.4"/>
      <line x1="9" y1="1" x2="1" y2="9" stroke="#33506f" stroke-width="1.4"/>
    </svg>
  </div>
`;

/**
 * Opens the project detail modal for a single project entry from
 * site.config.js.
 * @param {{name: string, tag: string, desc: string, live: string, code: string}} project
 */
export function openProjectModal(project) {
  const modal = $('#project-modal');

  $('#project-modal-card').innerHTML = `
    <div class="modal-head">
      <h4>${escapeHtml(project.name)}</h4>
      ${CLOSE_ICON}
    </div>
    <div class="modal-body">
      <span class="tagchip">${escapeHtml(project.tag)}</span>
      <p>${escapeHtml(project.desc)}</p>
      <div class="modal-actions">
        <a class="primary" href="${safeHref(project.live)}" target="_blank" rel="noopener noreferrer">View live</a>
        <a class="secondary" href="${safeHref(project.code)}" target="_blank" rel="noopener noreferrer">View code</a>
      </div>
    </div>
  `;

  modal.classList.add('open');
  $('#modal-close').addEventListener('click', () => modal.classList.remove('open'));
}

/**
 * Closes the project modal when the backdrop (not the card itself) is
 * clicked. Call once during app init.
 */
export function initProjectModalBackdrop() {
  $('#project-modal').addEventListener('click', (event) => {
    if (event.target.id === 'project-modal') {
      event.currentTarget.classList.remove('open');
    }
  });
}
