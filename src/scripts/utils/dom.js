/**
 * Shorthand for `scope.querySelector`. Scoped to `document` by default.
 * @param {string} selector
 * @param {ParentNode} [scope]
 */
export const $ = (selector, scope = document) => scope.querySelector(selector);

/**
 * Shorthand for `scope.querySelectorAll`, returned as a real array so
 * callers can use `.map`, `.filter`, etc. directly.
 * @param {string} selector
 * @param {ParentNode} [scope]
 */
export const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
