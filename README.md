# lang-game — prototype

Pimsleur mechanic inside a story. One tape. French.

## Setup

```bash
npm install
npm run dev
```

Open in **Chrome or Edge** (ASR requires webkit SpeechRecognition).

## Flow

1. **Story beat** — find the note, find the box
2. **Tape 01** — French surveillance audio + handler coaching (Web Speech TTS)
3. **Prompt** — say "Excusez-moi. Vous parlez anglais?" — scored via ASR
4. **Story beat** — aftermath, two choices

## What this is testing

- Does the tape mechanic feel right inside the story context?
- Does the emotional weight of "dad made this for you" land?
- Is the TTS quality acceptable for a prototype?
- Does the one-shot scored prompt feel like stakes?

## TODO / next steps

- [ ] Swap Web Speech TTS for TADA-3B-ML via local API (French supported via `fr` lang code)
- [ ] Swap ASR keyword scoring for GOP transformer (xlsr-53 + GOP)
- [ ] Migrate story.js to .ink file + inkjs runtime
- [ ] Add visual: static background image (Seattle apartment / tape player)
- [ ] Add Rive animation for character (dad at desk, handler silhouette)
- [ ] Tape 02+
- [ ] Real conversation scene (VS-style)

## Stack

- Vite + React
- Web Speech API (TTS + ASR) — placeholder for TADA + GOP
- Story state: plain JS object in story.js — replace with inkjs
