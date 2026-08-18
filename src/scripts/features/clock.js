import { $ } from '../utils/dom.js';

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const dateStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

  $('#tray-clock').innerHTML = `${hours}:${minutes} ${meridiem}<br>${dateStr}`;
}

/**
 * Starts the taskbar clock, refreshing every 15 seconds. Call once
 * during app init.
 */
export function initClock() {
  updateClock();
  setInterval(updateClock, 15000);
}
