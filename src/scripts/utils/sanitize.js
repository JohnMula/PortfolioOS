/**
 * Security helpers used everywhere site.config.js data gets rendered.
 *
 * Everything in site.config.js is meant to be plain text edited by the
 * site owner, but it still gets injected into innerHTML templates and
 * href attributes. These helpers make that injection safe even if a
 * value ever contains HTML markup or an unexpected URL scheme.
 */

const HTML_ESCAPES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escapes characters that are meaningful in HTML, so a config value like
 * a project description can never inject markup or a <script> tag when
 * it's interpolated into an innerHTML template.
 * @param {unknown} value
 * @returns {string}
 */
export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
}

// Only these URL schemes (plus in-page anchors) are ever allowed into an
// href attribute. This blocks "javascript:" and other script-executing
// schemes from a miscopied or malicious config value.
const SAFE_HREF_PATTERN = /^(https?:|mailto:|#)/i;

/**
 * Validates a URL before it's used as an href, falling back to a harmless
 * "#" if the scheme isn't on the allow-list.
 * @param {unknown} url
 * @param {string} [fallback]
 * @returns {string}
 */
export function safeHref(url, fallback = '#') {
  const value = String(url ?? '').trim();
  return SAFE_HREF_PATTERN.test(value) ? value : fallback;
}
