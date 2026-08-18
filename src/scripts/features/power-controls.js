import { $ } from '../utils/dom.js';
import { escapeHtml, safeHref } from '../utils/sanitize.js';

function goToSleep(label) {
  $('#sleep-label').textContent = label || 'Click to wake';
  $('#sleep-overlay').classList.add('open');
  $('#start-menu').classList.remove('open');
}

function buildShutdownLinks(config) {
  const { github, linkedin, email } = config.links;
  return `
    <div class="shutdown-links">
      <a href="${safeHref(github)}" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="${safeHref(linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href="${safeHref(`mailto:${email}`)}">Email</a>
    </div>
  `;
}

/**
 * Wires up the Start menu's power controls: sleep, lock, restart,
 * log off, and the full shut down / goodbye screen. Call once during
 * app init.
 * @param {import('../../config/site.config.js').CONFIG} config
 */
export function initPowerControls(config) {
  const startMenu = $('#start-menu');
  const shutdownFlyout = $('#shutdown-flyout');
  const shutdownScreen = $('#shutdown-screen');

  $('#sleep-overlay').addEventListener('click', () => $('#sleep-overlay').classList.remove('open'));
  $('#fly-sleep').addEventListener('click', () => goToSleep('Sleeping — click to wake'));
  $('#fly-lock').addEventListener('click', () => goToSleep('Locked — click to unlock'));
  $('#fly-restart').addEventListener('click', () => window.location.reload());
  $('#fly-logoff').addEventListener('click', () => {
    startMenu.classList.remove('open');
    shutdownFlyout.classList.remove('open');
  });

  $('#shutdown-btn').addEventListener('click', () => {
    startMenu.classList.remove('open');
    shutdownScreen.innerHTML = `
      <div class="boot-orb"></div>
      <div class="boot-title">Thanks for stopping by.</div>
      <div style="font-size:12.5px;opacity:.75;">${escapeHtml(config.name)} · ${escapeHtml(config.role)}</div>
      ${buildShutdownLinks(config)}
      <button class="restart-btn" id="restart-btn" type="button">Restart</button>
    `;
    shutdownScreen.classList.add('open');
    $('#restart-btn').addEventListener('click', () => shutdownScreen.classList.remove('open'));
  });
}
