/**
 * Builds the small rounded "app icon" tile shared by contact rows, the
 * projects grid, and other list views.
 *
 * @param {string} color - CSS color for the tile background.
 * @param {string} svgPath - Trusted, static SVG markup (never pass config
 *   or other user-supplied data here — it is not escaped).
 * @returns {string}
 */
export function iconTile(color, svgPath) {
  return `<div class="app-icon" style="--tile:${color}"><svg viewBox="0 0 20 20">${svgPath}</svg></div>`;
}
