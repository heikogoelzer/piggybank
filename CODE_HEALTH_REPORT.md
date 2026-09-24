# Piggy Bank — Code Health Report

Survey date: 2026-09-24 · Files: index.html, mySketch.js, style.css, sw.js, manifest.json, README.md

## Strengths

- Tiny, focused app with a single clear purpose.
- Correct use of `noLoop()`/`redraw()` for event-driven drawing.
- `localStorage` persistence with safe null-check and `int()` conversion.
- `max(size, 0)` guard prevents negative size.
- Service worker with install/activate/fetch lifecycle and cache versioning.
- Window resize handling keeps buttons sized and positioned correctly.

## Findings

### High

| # | File | Finding |
|---|------|---------|
| 1 | `manifest.json` | References `android-icon-512.png` which does not exist in the repo |
| 2 | `index.html` | Missing `<meta name="viewport" content="width=device-width, initial-scale=1">` |
| 3 | `sw.js` | `cache.addAll` is all-or-nothing — one failed asset (e.g. CDN hiccup) aborts the entire install |
| 4 | `sw.js` | Stale comment "(no icon and manifest)"; `manifest.json` and `apple-touch-icon.png` not in `ASSETS_TO_CACHE` |

### Medium

| # | File | Finding |
|---|------|---------|
| 5 | `mySketch.js` | Dead commented code: `mousePressed`/`touchStarted` block (lines 91–98) and `//rect(...)` (line 59) |
| 6 | `mySketch.js` | Redundant `redraw()` on line 86 — immediately followed by `drawPiggy()` which draws directly |
| 7 | `mySketch.js` | `rectMode(RADIUS)` set but never used — no `rect()` call remains in active code |
| 8 | `mySketch.js` | `px = 660` / `py = 542` hardcoded with comment "could read automatically" — use `img.width`/`img.height` |
| 9 | `mySketch.js` | Inconsistent indentation — mix of tabs and spaces, several lines misaligned |
| 10 | `mySketch.js` | Canvas has no `role`/`aria-label`; buttons are labelled only "+"/"−" with no accessible name |

### Low

| # | File | Finding |
|---|------|---------|
| 11 | `index.html` | Missing `<meta name="mobile-web-app-capable" content="yes">` and `<meta name="theme-color" content="#000000">` |
| 12 | `style.css` | Missing `overflow: hidden; width: 100%; height: 100%` on `html, body` — may produce scrollbars |
| 13 | `mySketch.js` | `str(size)` — could use a template literal, but functionally correct (no change needed) |

## Backlog (not part of this cleanup)

- Real 512×512 square maskable icon asset.
- Button focus/visible focus styles for keyboard users.