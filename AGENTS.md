# Agent instructions

## About this project

Static site (no build step, no framework) for a Qiscus Omnichannel
"custom channel menu" widget, plus a dashboard showcase for demoing
widget customization cases to clients. See README.md for structure.

- `widget/index.html` — widget entry point, loaded standalone or in the
  dashboard's iframe preview.
- `index.html` (root) — dashboard showcase with case picker + live iframe
  preview of the real widget.
- `js/cases.js` — case/category registry, must load before `config.js`.
- `js/config.js` — all widget config (menu items, Qiscus app id/channel,
  custom CSS for the Qiscus iframe), resolves the active case from
  `?case=`.
- `js/app.js` — widget runtime: renders menu, loads Qiscus SDK
  (`qismo-v5.js`), pushes custom CSS into Qiscus's iframes via
  `postMessage`.
- `js/dashboard.js` — dashboard runtime: renders case picker, reloads the
  iframe preview when a case is selected.

No test suite, no bundler. Plain vanilla JS (IIFEs, `var`), served as-is.

## Commits

After every code change in this repo, automatically commit the change using
the `smart-conventional-commits` skill — do not ask for confirmation first.
This applies to every session, not just when explicitly requested.
