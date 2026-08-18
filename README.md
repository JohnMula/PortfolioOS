# Portfolio OS

A personal portfolio styled as a desktop operating system. About, Projects,
Resume, Skills, and Contact each open in their own draggable, resizable
window, complete with a Start menu, taskbar, accent-color theming, and a
boot/shutdown sequence.

The whole site is plain HTML, CSS, and JavaScript — no build step, no
framework, no dependencies. Open it locally or deploy it anywhere that
serves static files.

## Quick start

You only need to edit **one file** to make this your own:

```
src/config/site.config.js
```

It holds your name, role, bio, links, skills, and project list. Every
window on the page renders from that one object.

### Run it locally

Because the JavaScript is loaded as ES modules, it needs to be served over
`http://` rather than opened directly as a `file://` path (browsers block
module imports from the filesystem). Any static file server works:

```bash
npm start
```

This runs a zero-install local server (via `npx serve`) at
`http://localhost:5173`. Alternatives if you don't have Node/npm:

```bash
# Python 3
python3 -m http.server 5173

# VS Code
# Right-click index.html → "Open with Live Server"
```

## Project structure

```
PortfolioOS/
├── index.html                     Entry point: markup + stylesheet links
├── package.json                   Project metadata + local dev script
├── LICENSE
├── src/
│   ├── config/
│   │   └── site.config.js         ← Edit this to make it yours
│   ├── styles/
│   │   ├── theme-variables.css    Accent color tokens (5 presets)
│   │   ├── base.css               Reset + global defaults
│   │   ├── wallpaper.css          Desktop background
│   │   ├── app-icon.css           Shared icon-tile system
│   │   ├── desktop-icons.css
│   │   ├── window-chrome.css      Window frame, titlebar, buttons
│   │   ├── window-content.css     Content inside each window
│   │   ├── start-menu.css
│   │   ├── taskbar.css
│   │   ├── modal.css              Project detail popup
│   │   ├── overlays.css           Boot / shutdown / sleep screens
│   │   └── responsive.css         Small-screen overrides
│   └── scripts/
│       ├── main.js                Entry point — wires everything up
│       ├── utils/
│       │   ├── dom.js             $ / $$ query helpers
│       │   ├── sanitize.js        HTML-escaping + safe URL checks
│       │   └── icon-tile.js       Shared icon markup builder
│       ├── render/                Populates windows from site.config.js
│       │   ├── about.js
│       │   ├── resume.js
│       │   ├── contact.js
│       │   ├── skills.js
│       │   ├── archive.js
│       │   ├── start-menu.js
│       │   └── projects.js
│       └── features/              Interactive behaviour
│           ├── window-manager.js  Open / close / focus / minimize / maximize
│           ├── drag-and-snap.js   Drag windows, snap to screen edges
│           ├── start-menu-controls.js
│           ├── theme-switcher.js  Accent color + reduce-motion toggle
│           ├── power-controls.js  Sleep / lock / restart / shut down
│           ├── clock.js
│           ├── show-desktop.js
│           ├── project-modal.js
│           └── boot-sequence.js
```

Each file has one job: `render/` files turn your config into DOM content,
`features/` files handle user interaction, and `utils/` holds the small
shared helpers both depend on.

## Customizing

1. **Content** — edit `src/config/site.config.js`. Add or remove entries
   in `projects` and `archive` freely; the grid and tag filters update
   automatically.
2. **Colors** — the 5 accent presets (aero/graphite/sunset/forest/berry)
   live in `src/styles/theme-variables.css`. Add a new
   `html[data-theme="..."]` block there and a matching entry in the
   `THEMES` array in `src/scripts/features/theme-switcher.js` to add a
   new preset.
3. **Page title & description** — `index.html`'s `<title>` and
   `<meta name="description">` are static (the config loads after the
   page does), so update those two lines by hand to match your info.
4. **Resume file** — point `links.resume` in the config at a hosted PDF,
   or swap the placeholder markup in `index.html`'s `#win-resume` window
   for an embedded `<iframe>`/PDF viewer if you'd rather show it inline.

## Deploying

This is a static site — push it to any static host:

- **GitHub Pages**: push to a repo, enable Pages, and set the source to
  the repo root (`index.html` is already at the top level).
- **Netlify / Vercel / Cloudflare Pages**: point the project at the repo
  root with no build command.

## Security notes

A few things worth knowing about how this project is put together:

- **XSS protection**: every value from `site.config.js` that gets
  inserted into the page is passed through `escapeHtml()`
  (`src/scripts/utils/sanitize.js`) before it's rendered, so even
  unusual characters or accidentally-pasted markup in your bio, project
  descriptions, etc. can't break out of their container or execute as
  script.
- **Safe links**: every link built from config data (`links.github`,
  a project's `live`/`code` URL, etc.) is checked by `safeHref()`, which
  only allows `https:`, `http:`, `mailto:`, or in-page `#` links through.
  Anything else falls back to `#`, which blocks `javascript:`-style URL
  injection.
- **`rel="noopener noreferrer"`** is set on every link that opens in a
  new tab, preventing the new page from getting a handle back to this
  one via `window.opener`.
- **Content-Security-Policy**: `index.html` sets a CSP meta tag scoped to
  `'self'`, since the site loads no third-party scripts, fonts, or
  images. If you add an external resource later (a web font, an
  analytics snippet, an embed), you'll need to extend the matching
  directive in that tag.
- **No inline scripts or `on*=` handlers** anywhere — everything is
  wired up via `addEventListener` in the module files, which is both
  easier to maintain and compatible with a strict CSP.
- For an even stronger setup, most static hosts let you add HTTP
  response headers (as opposed to the `<meta>` tag here) — e.g. a
  `_headers` file on Netlify or a `vercel.json` header rule — to also
  set `X-Frame-Options`/`frame-ancestors`, `Permissions-Policy`, and
  `Strict-Transport-Security`, which a `<meta>` tag can't fully cover.

## License

MIT — see [LICENSE](LICENSE). Update the copyright name in that file to
your own.
