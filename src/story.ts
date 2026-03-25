// Tape 01 — Narrative state
// TODO: migrate to .ink / inkjs when scaffolding is validated

export interface StoryChoice {
  text: string;
  next: string;
}

export interface StoryBeat {
  lines: string[];
  note?: string | null;
  action?: string | null;
  /** Next beat key, or `null` to hand off to tape/prompt */
  next?: string | null;
  choices?: StoryChoice[];
}

// Each beat is: { lines[], action?, next }
// action = the clickable prompt at the bottom
// next = key of next beat, or null to hand off to tape/prompt

export const STORY_BEATS: Record<string, StoryBeat> = {
  start: {
    lines: [
      "Three days since anyone has heard from him.",
      "You've called twice. Checked the apartment. Nothing out of place — which is somehow worse.",
      "Then, on the kitchen table. His handwriting on a torn envelope.",
    ],
    note: '"Check under the couch."',
    action: "Move the couch",
    next: "found_box",
  },

  found_box: {
    lines: [
      "A metal box. Old, dented at one corner. The combination lock takes one try — his birthday.",
      "Twelve cassette tapes, hand-labeled and numbered.",
      "A folded note on top.",
    ],
    note: `"If you're reading this, I ran out of time. Start with one. Listen carefully. I made this for you."`,
    action: "Play tape 01",
    next: null,
  },

  after_tape: {
    lines: [
      "You sit in the quiet for a moment.",
      "He spent years making this. Practicing out loud like it would help somehow.",
      "Like he knew you'd need it.",
    ],
    note: null,
    choices: [
      { text: "Look up the name you heard — Delacroix", next: "looked_up" },
      { text: "Not yet. Listen to the tape again first.", next: "relisten" },
    ],
  },

  looked_up: {
    lines: [
      'You search "Delacroix Seattle."',
      "Three results. One is a restaurant in Capitol Hill. One is a real estate listing.",
      "The third is a LinkedIn profile. A woman. She's been in Seattle for six years.",
      "The photo was taken outside a building you recognize.",
    ],
    note: null,
    action: "Close the laptop",
    next: "end",
  },

  relisten: {
    lines: [
      "You play it again from the top.",
      "This time you catch something in the background — a door, maybe. Street noise.",
      "Seattle, probably. It sounds like Seattle.",
    ],
    note: null,
    action: "Put the tape away",
    next: "end",
  },

  end: {
    lines: ["Tape 01 — reviewed.", "Eleven more."],
    note: null,
    action: null,
    next: null,
  },
};
