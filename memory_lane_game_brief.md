# Memory Lane — AI Coding Agent Brief
## A Personalized Word & Trivia Game for Tablet

---

## Project Overview

Build a **Progressive Web App (PWA)** called **"Memory Lane"** — a gentle, accessible word and trivia game designed for a stroke survivor with left-side visual neglect who plays one-handed on a Samsung Android tablet. The game should feel warm, personal, and unhurried. It is hosted for free on **GitHub Pages** and accessed via a browser URL (no app store, no install required).

---

## Player Profile (Design for This Person)

| Trait | Design Implication |
|---|---|
| Stroke survivor — right side affected | She can only reliably use her **right hand** to interact. Place answer buttons and primary controls on the **right side** as a preference, not a hard restriction. The layout should be comfortable and natural for right-hand tapping, not crammed. |
| One right hand only | All tap targets must be **large (min 80px tall)**. No drag, swipe, or pinch interactions. |
| Occasional reading difficulty | Questions must be **read aloud automatically** using the Web Speech API (TTS) on every new question. Large fonts (min 22px body, 28px+ questions). High contrast. Short sentences. |
| Strong long-term memory | 60s/70s TV and movie trivia is her strength — this is the "comfortable" category tier. |
| Needs some challenge | Include variety categories so she's occasionally stretched, not just breezing through. |
| Motivated by family | Her 3 grandchildren's photos are the **primary reward system**. |

---

## Tech Stack

- **Framework**: Vanilla HTML + CSS + JavaScript (no build step required) OR React with Vite (if agent prefers). Either must produce static files deployable to GitHub Pages.
- **Hosting**: GitHub Pages (static site)
- **TTS**: Web Speech API (`window.speechSynthesis`) — built into Chrome/Android, no API key needed
- **Photos**: Loaded from a `/photos/` folder in the repo. The game owner will add 3 subfolders: `/photos/grandchild1/`, `/photos/grandchild2/`, `/photos/grandchild3/` — each containing multiple `.jpg` or `.png` photos. Names are configured in a `config.js` file.
- **State**: LocalStorage (saves progress between sessions)
- **No backend required**

---

## Configuration File (`config.js`)

The game owner should be able to customize the game without touching game logic. Create a `config.js` that contains:

```javascript
const GAME_CONFIG = {
  grandchildren: [
    { name: "Richie", folder: "photos/richie", photoCount: 5 },
    { name: "Allison", folder: "photos/allison", photoCount: 5 },
    { name: "Will", folder: "photos/will", photoCount: 5 },
  ],
  playerName: "Marion",
  ttsEnabled: true,
  ttsRate: 0.85,       // Slightly slower than default
  ttsVoice: "female",  // Prefer female voice if available
  questionsPerRound: 5,
};
```

---

## Game Structure

### Screen Flow

```
Splash Screen
     ↓
Main Menu (New Game / Continue / Settings)
     ↓
Category Spin / Selection
     ↓
Question Screen (repeat questionsPerRound times)
     ↓
Round Complete → Photo Reveal Reward Screen
     ↓
Return to Main Menu
```

---

### Splash Screen

- Large title: **"Memory Lane"** in a warm, retro-style font (e.g., Google Font: *Playfair Display* or *Libre Baskerville*)
- Subtitle: *"A game just for Marion"*
- Single large **"Let's Play!"** button — centered or right-of-center
- Soft background: warm cream or dusty rose tone — NOT clinical white, NOT dark mode

---

### Main Menu

- Three large stacked buttons, centered or right-of-center for comfortable right-hand reach:
  - **New Game**
  - **Continue** (greyed out if no saved progress)
  - **Settings** (TTS on/off, font size adjustment)
- Layout should feel open and uncluttered — generous whitespace, not everything squeezed to one side

---

### Category System

Five categories. Each round, one category is randomly selected (weighted — see below). Display it with a large icon and the category name before the first question.

| ID | Name | Icon | Description | Weight |
|---|---|---|---|---|
| `golden_age` | Golden Age | ⭐ | 60s/70s TV stars, sitcoms, variety shows | 35% |
| `silver_screen` | Silver Screen | 🎬 | Classic movies and film stars, any era | 20% |
| `name_that_show` | Name That Show | 📺 | Describe a TV show, pick the title | 20% |
| `word_play` | Word Play | 🔤 | Synonyms, rhymes, fill-in-the-blank, word associations | 15% |
| `everyday` | Everyday World | 🌍 | Geography, food, nature, animals — gentle challenge tier | 10% |

Weighting ensures she gets her comfort categories most often but encounters variety.

---

### Question Screen — Layout

```
┌─────────────────────────────────────────────────────┐
│  [Category Icon + Name]              [Round: 3/5]   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │                                              │   │
│  │   QUESTION TEXT (large, centered, wrapped)   │   │
│  │                                              │   │
│  │          [🔊 Replay Audio button]            │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │             Answer Option A                  │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │             Answer Option B                  │   │
│  └──────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────┐   │
│  │             Answer Option C                  │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Rules:**
- Answer buttons span most of the screen width (generous padding on both sides) but are **right-aligned within their container** so a right-hand thumb naturally reaches them
- Buttons are at minimum **80px tall** with **22px+ font**
- Question text box spans full width but text is large and line-height generous (1.6+)
- Correct answer → button flashes **green**, plays a soft chime sound, brief pause, then next question
- Wrong answer → button flashes **red/orange**, TTS says *"Not quite — try again!"*, question remains, player can retry
- No countdown timers. No time pressure.
- **Audio plays automatically** when each question loads — no tap required to hear it

---

### Question Data Format

Embed questions as a JSON array. Include at least **60 questions** spread across categories. Use this format:

```json
{
  "id": "q001",
  "category": "golden_age",
  "question": "She played the witch Samantha on the TV show Bewitched. What was the actress's name?",
  "answers": ["Elizabeth Montgomery", "Barbara Eden", "Mary Tyler Moore"],
  "correct": 0,
  "hint": "Her first name was Elizabeth."
}
```

**Question writing guidelines:**
- Questions must be one sentence, plainly worded
- Correct answer is always index `0` in the array — the game shuffles the display order on render
- For `word_play` category, questions should be like:
  - *"Which word means the same as HAPPY?"* → Joyful / Angry / Sleepy
  - *"Mary had a little ____."* → Lamb / Dog / Hat
  - *"Which word rhymes with MOON?"* → Spoon / Star / Bell
- Avoid double negatives, irony, or ambiguous phrasing

**Minimum question counts by category:**
- `golden_age`: 25 questions
- `silver_screen`: 15 questions
- `name_that_show`: 10 questions
- `word_play`: 10 questions
- `everyday`: 10 questions

---

### Reward System — Photo Reveal

This is the emotional heart of the game. After completing a round of 5 questions:

1. Screen transitions to a **"You Did It!"** reward screen
2. A grandchild is selected (rotate through them, tracked in LocalStorage)
3. A photo from that grandchild's folder is displayed — but initially covered by a **4×4 grid of tiles** (16 tiles)
4. For each correct answer in the round, **tiles are removed** to reveal more of the photo beneath
   - 5 correct = full reveal (all tiles gone)
   - 3 correct = partial reveal (11 tiles removed)
   - etc.
5. Below the photo: large warm text personalized to each grandchild, for example:
   - Richie (10): *"That's your grandson Richie! He thinks you're the best, Marion. 💛"*
   - Allison (8): *"That's your granddaughter Allison! She loves you so much, Marion. 🌸"*
   - Will (almost 2): *"That's little Will! He's growing up so fast and he adores his grandma. 🧡"*
6. TTS reads the message aloud
7. A single large **"Play Again"** button on the right side

**Photo handling:**
- Photos are loaded from the configured folder paths
- If a photo fails to load, show a warm placeholder with the grandchild's name and a heart emoji
- Photos should be displayed with `object-fit: cover` in a fixed square or portrait frame — no distortion

---

### Settings Screen

Accessible from the main menu. All controls on right side.

- **Read Questions Aloud**: Toggle (ON by default)
- **Font Size**: Three options — Normal / Large / Extra Large (adjusts CSS root font size)
- **Speech Speed**: Slow / Normal (adjusts TTS rate)
- **Reset Progress**: Confirmation required (two-tap confirm)

---

## Accessibility Requirements (Non-Negotiable)

1. **Primary interactive elements prefer the right side** — answer buttons and navigation controls should be right-aligned or centered so they're naturally reachable by a right hand, but content and decoration can span the full screen naturally
2. **Minimum tap target size**: 80px height, full-width or near-full-width buttons (no small targets anywhere)
3. **Font sizes**: Question text ≥ 28px; Answer button text ≥ 22px; All other text ≥ 18px
4. **Color contrast**: WCAG AA minimum (4.5:1 ratio) for all text
5. **TTS auto-plays** on question load — do not require a tap to hear the question
6. **No time limits** anywhere in the game
7. **Forgiving wrong answers** — no score penalty display, no "streak broken" messaging
8. **No horizontal scrolling** — game must fit entirely within viewport width
9. **Portrait mode optimization** — Samsung tablets are often used portrait; design for this first

---

## Visual Design

- **Palette**: Warm and inviting — cream backgrounds (#FDF6EC), dusty rose accents (#C87A6A), soft gold (#D4AF37), sage green for correct feedback (#5A8C5A)
- **Typography**: Serif or slab-serif for headings (e.g., *Playfair Display*), clean sans-serif for body (e.g., *Lato* or *Open Sans*)
- **No dark mode** — keep it warm and readable
- **Rounded corners** on all buttons and cards (border-radius: 16px+)
- **No clutter** — one action per screen, generous whitespace
- Subtle vintage/nostalgic texture or border details welcome (think: old photo album aesthetic)

---

## Audio

- Correct answer: soft pleasant chime (use a short base64-encoded audio clip or generate with Web Audio API)
- Wrong answer: soft low tone (not harsh)
- Round complete: a warm celebratory sound (not jarring)
- TTS for all question text and reward messages
- All audio must respect the Settings toggle

---

## GitHub Pages Deployment Instructions (include in README.md)

The agent should generate a `README.md` that includes:

1. How to fork the repo
2. How to add grandchildren's photos (folder structure, naming)
3. How to edit `config.js` (names, photo counts)
4. How to enable GitHub Pages (Settings → Pages → Deploy from main branch `/root` or `/docs`)
5. How to share the URL with the player
6. How to add or edit questions in the questions JSON file

---

## File Structure

```
memory-lane/
├── index.html
├── config.js               ← Customization file for the game owner
├── questions.json          ← All trivia and word play questions
├── style.css
├── app.js                  ← Main game logic
├── audio/
│   ├── correct.mp3 (or base64 in JS)
│   ├── wrong.mp3
│   └── complete.mp3
├── photos/
│   ├── richie/             ← Owner adds photos here
│   ├── allison/
│   └── will/
├── manifest.json           ← PWA manifest
├── service-worker.js       ← For offline support
└── README.md
```

---

## PWA Requirements

- `manifest.json` with app name "Memory Lane", theme color matching palette, display: `standalone`
- Service worker that caches the app shell for offline use (photos can fail gracefully if offline)
- Add-to-homescreen capable on Android Chrome

---

## Out of Scope (Do Not Build)

- User accounts or login
- Leaderboards or scoring visible to the player (track internally for reward logic only)
- Multiplayer
- In-app purchases
- Analytics or tracking of any kind

---

## Deliverable Summary

- A fully functional static PWA
- Works in Chrome on a Samsung Android tablet (portrait mode primary)
- Deployable to GitHub Pages with zero cost
- Configurable by a non-developer via `config.js` and folder structure
- At least 70 questions embedded at launch
- Full README with deployment steps

---

*This game is being built with love for a grandmother recovering from a stroke. Prioritize warmth, patience, and joy in every design decision.*
