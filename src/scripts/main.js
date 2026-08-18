import { CONFIG } from '../config/site.config.js';

import { renderAbout } from './render/about.js';
import { renderResume } from './render/resume.js';
import { renderContact } from './render/contact.js';
import { renderSkills } from './render/skills.js';
import { renderArchive } from './render/archive.js';
import { renderStartMenu } from './render/start-menu.js';
import { initProjects } from './render/projects.js';

import { initWindowManager } from './features/window-manager.js';
import { initDragAndSnap } from './features/drag-and-snap.js';
import { initStartMenuControls } from './features/start-menu-controls.js';
import { initThemeSwitcher } from './features/theme-switcher.js';
import { initPowerControls } from './features/power-controls.js';
import { initClock } from './features/clock.js';
import { initShowDesktop } from './features/show-desktop.js';
import { initProjectModalBackdrop } from './features/project-modal.js';
import { initBootSequence } from './features/boot-sequence.js';

/**
 * PortfolioOS entry point.
 *
 * To make this your own, you only need to edit `src/config/site.config.js`
 * — everything here just renders that data and wires up the desktop UI.
 *
 * Loaded as an ES module (`<script type="module">`), so this file runs
 * automatically once the DOM has parsed — no DOMContentLoaded listener
 * needed.
 */
function init() {
  document.title = `${CONFIG.name} — Portfolio OS`;

  // Populate every window's content from the config.
  renderAbout(CONFIG);
  renderResume(CONFIG);
  renderContact(CONFIG);
  renderSkills(CONFIG);
  renderArchive(CONFIG);
  renderStartMenu(CONFIG);
  initProjects(CONFIG);

  // Wire up interactive behaviour.
  initWindowManager();
  initDragAndSnap();
  initStartMenuControls();
  initThemeSwitcher();
  initPowerControls(CONFIG);
  initClock();
  initShowDesktop();
  initProjectModalBackdrop();

  // Boot animation + default window layout, last so it opens windows
  // that are already fully wired up above.
  initBootSequence(CONFIG);
}

init();
