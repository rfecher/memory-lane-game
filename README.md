# Memory Lane — A Game for Marion

A gentle word and trivia game, built with love for a grandmother recovering from a stroke.

## What is this?

Memory Lane is a Progressive Web App (PWA) — it runs in any browser with no installation. It works on Samsung tablets, phones, and computers.

## How to set it up

### 1. Fork the repo

Click "Fork" on GitHub to copy this repository to your account.

### 2. Add photos

Create folders in the `photos/` directory — one per grandchild:

```
photos/
  richie/
    1.jpg
    2.jpg
    3.jpg
    4.jpg
    5.jpg
  allison/
    1.jpg
    2.jpg
    3.jpg
    4.jpg
    5.jpg
  will/
    1.jpg
    2.jpg
    3.jpg
    4.jpg
    5.jpg
```

Each folder should contain photos of that grandchild. Name them `1.jpg` through `5.jpg`. Photos can be `.jpg` or `.png`.

### 3. Customize the game

Edit `src/config.js` to change:

- **Grandchildren names**: Update the names, folders, and ages in the `grandchildren` array
- **Player name**: Change `playerName` to Marion's name
- **Questions per round**: Change `questionsPerRound`
- **TTS rate**: Adjust `ttsRate` (0.85 is slightly slower than normal)

### 4. Deploy (automatic)

This repo includes a GitHub Actions workflow. Every time you push to `master`, it builds the app and deploys automatically.

First, make sure Pages is configured to use GitHub Actions:

1. Go to **Settings → Pages**
2. Under "Source", select **GitHub Actions** (not "Deploy from a branch")
3. Save

Then commit and push:
```bash
git add .
git commit -m "Update Memory Lane"
git push origin master
```

Your game will be live at `https://yourusername.github.io/memory-lane-game/` (usually within 30 seconds).

### 5. Share the URL

Send the URL to Marion — she just opens it in Chrome on her tablet and plays!

### 6. Add or edit questions

Edit `src/questions.json` to add or change questions:

```json
{
  "id": "q001",
  "category": "golden_age",
  "question": "Your question text here?",
  "answers": ["Correct answer", "Wrong answer 1", "Wrong answer 2"],
  "correct": 0,
  "hint": "Optional hint text"
}
```

**Important rules:**
- The correct answer is always at index `0` (the first answer in the array)
- Valid categories: `golden_age`, `silver_screen`, `name_that_show`, `word_play`, `everyday`
- Keep questions to one sentence, plainly worded

## Categories

| Category | Icon | What it's about |
|------|----|----|
| Golden Age | ⭐ | 1960s/70s TV stars and sitcoms |
| Silver Screen | 🎬 | Classic movies and film stars |
| Name That Show | 📺 | Describe a TV show, pick the title |
| Word Play | 🔤 | Synonyms, rhymes, fill-in-the-blank |
| Everyday World | 🌍 | Geography, food, nature, animals |

## Design notes

- All controls are large (80px+) and placed on the right side for comfortable one-handed use
- Questions are read aloud automatically using text-to-speech
- No timers, no pressure — Marion plays at her own pace
- After each round, a photo of a grandchild is revealed as a reward
- Progress is saved automatically — she can come back anytime

## Built with love

This game was created as a Mother's Day gift. Every design decision prioritizes warmth, patience, and joy.
