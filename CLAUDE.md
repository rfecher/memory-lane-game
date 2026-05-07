# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Memory Lane is a vanilla HTML/CSS/JS Progressive Web App — a gentle word and trivia game designed for stroke recovery (left-side visual neglect, one-handed right-hand use on a Samsung tablet). Deployed as static files to GitHub Pages.

## Architecture

```
index.html          ← Single-page app, no framework
config.js           ← Game owner customization (grandchildren, TTS settings)
questions.json      ← Embedded question bank (70+ questions, 5 categories)
style.css           ← All styling, CSS custom properties for font-size tiers
app.js              ← Game state machine, TTS, reward system, LocalStorage
manifest.json       ← PWA manifest (standalone display mode)
service-worker.js   ← Offline caching of app shell
```

State machine flow: splash → menu → category-spin → question-loop → reward → menu
Persisted state: current round progress, continue-saved-state flag, grandchild rotation index.

## Key Constraints

- Right-aligned or centered controls (one-handed right-hand use)
- Min 80px tap targets, no drag/swipe/pinch
- TTS auto-plays every question via Web Speech API
- No timers, no scoring display, no dark mode
- Warm palette: cream (#FDF6EC), dusty rose (#C87A6A), gold (#D4AF37), sage green (#5A8C5A)
- Large fonts: questions ≥28px, buttons ≥22px, body ≥18px
- Portrait-first, no horizontal scroll

## Development Commands

No build step. Open `index.html` directly in a browser to test, or serve locally:

```bash
python3 -m http.server 8080
# or
npx serve . 8080
```

## PWA Requirements

- `manifest.json` with name "Memory Lane", theme_color matching palette, display standalone
- Service worker caches app shell for offline use
- Photos load from `/photos/` folders at runtime (owner-provided)

## Question Data Format

Correct answer always index `0` in the answers array (shuffled on display). See `questions.json` for the schema. Categories: `golden_age`, `silver_screen`, `name_that_show`, `word_play`, `everyday`.

## Deployment

Zero-config: push to GitHub repo, enable Pages from main branch `/root` in repo Settings → Pages.
See `README.md` for full owner-facing deployment instructions.
