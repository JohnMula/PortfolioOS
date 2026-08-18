import { $, $$ } from '../utils/dom.js';
import { escapeHtml } from '../utils/sanitize.js';
import { iconTile } from '../utils/icon-tile.js';
import { openProjectModal } from '../features/project-modal.js';

const PROJECT_ICON = iconTile('#e0a83e', '<rect x="3" y="3" width="14" height="14" rx="2"/><path d="M7 10l2 2 4-4"/>');

function renderGrid(config, grid, filter) {
  const projects = config.projects.filter((p) => filter === 'All' || p.tag === filter);

  grid.innerHTML = projects
    .map((project) => {
      const index = config.projects.indexOf(project);
      return `
        <div class="gi" data-idx="${index}">
          ${PROJECT_ICON}
          <span>${escapeHtml(project.name)}</span>
          <span class="tagchip">${escapeHtml(project.tag)}</span>
        </div>
      `;
    })
    .join('');

  $$('.gi', grid).forEach((el) => {
    el.addEventListener('dblclick', () => openProjectModal(config.projects[Number(el.dataset.idx)]));
    el.addEventListener('click', () => {
      $$('.gi', grid).forEach((x) => x.classList.remove('selected'));
      el.classList.add('selected');
    });
  });
}

/**
 * Renders the Projects window's grid and tag-filter sidebar from
 * site.config.js, and wires up filtering + opening the detail modal.
 * @param {import('../../config/site.config.js').CONFIG} config
 */
export function initProjects(config) {
  const grid = $('#projects-grid');
  const tagsWrap = $('#projects-tags');
  const tags = ['All', ...new Set(config.projects.map((p) => p.tag))];

  tagsWrap.innerHTML = tags
    .map((tag, i) => `<div class="frow${i === 0 ? ' active' : ''}" data-tag="${escapeHtml(tag)}">${escapeHtml(tag)}</div>`)
    .join('');

  renderGrid(config, grid, 'All');

  $$('.frow', tagsWrap).forEach((filterRow) => {
    filterRow.addEventListener('click', () => {
      $$('.frow', tagsWrap).forEach((x) => x.classList.remove('active'));
      filterRow.classList.add('active');
      renderGrid(config, grid, filterRow.dataset.tag);
    });
  });
}
