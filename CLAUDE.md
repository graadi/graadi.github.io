# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Adrian Gramada's personal website — a static, single-page site hosted on GitHub Pages (custom domain via `CNAME`: `web.graadi.uk.to`). No build system, package manager, framework, or dependencies: plain HTML/CSS/vanilla JS served as-is.

## Development

There is no build/lint/test tooling in this repo. To preview changes locally, just open `index.html` in a browser, or serve the directory with any static file server (e.g. `python3 -m http.server`) and visit it — no build step is required first. Changes go live by pushing to `master` (GitHub Pages serves directly from it).

## Architecture

The entire site is one page (`index.html`) with fixed nav + scrollspy behavior, split into anchor-linked `<section>`s in this order: hero (`#home`) → About Me (`#about`) → Career Timeline (`#timeline`) → Skills (`#skills`) → footer. Nav links, `data-section` attributes, and section `id`s must stay in sync for the scrollspy/smoothscroll logic in `js/main.js` to keep working.

- **`js/main.js`**: a single self-invoking function (no modules/bundler) handling: mobile nav toggle, scroll-driven nav background + progress bar + active-link highlighting (via `data-section` attribute matching), and scroll-reveal animations (`IntersectionObserver` adding `.in-view` to any `.reveal` element). Any new section content that should fade in on scroll just needs the `reveal` class; the observer picks it up automatically.
- **`css/style.css`**: single stylesheet organized into clearly delimited banner-comment blocks in this order: Scroll reveal, Progress bar + Nav, Hero, Sections, About, Timeline, Skills, Footer, Responsive. Theme values (colors, fonts, max-widths) are centralized as CSS custom properties in `:root`. Follow the existing 3-space indentation and keep new rules under the matching section banner (or add a new one) rather than appending ad hoc styles at the end of the file.
- **`images/`**: favicon plus `logos/` for employer logos referenced from the Career Timeline entries.

## Content conventions

- Emoji are used liberally as inline visual markers in headings and list items throughout (nav-adjacent icons, timeline markers, skill card headers/tags) — match this style when adding similar content rather than introducing plain text.
- Timeline and skills content reflects a real CV/resume; when editing this content, keep facts consistent with what's already there rather than inventing details.

## Language

Use British English spelling in any prose content added to the site or its documentation (e.g. "organise", "colour"), per the site owner's preference.

## Responsiveness

The site must remain fully responsive at all times. Any change to `index.html`, `css/style.css`, or `js/main.js` must be checked at mobile, tablet, and desktop widths (the `css/style.css` Responsive banner block is the natural home for breakpoint rules) before it's considered done — don't introduce or leave behind layout breakage at any viewport size.
