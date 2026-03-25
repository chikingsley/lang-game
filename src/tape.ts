// Tape 01 — audio sequence
// Each segment is spoken via Web Speech TTS in order
// type: 'ambient' | 'surveillance' | 'handler' | 'dad' | 'prompt'
// 'prompt' type = final segment that hands off to PimsleurPrompt component

export const TARGET_PHRASE = "Excusez-moi. Vous parlez anglais ?";

export type TapeSegment =
  | {
      id: string;
      type: "ambient";
      display: string;
      pause?: number;
    }
  | {
      id: string;
      type: "surveillance";
      speaker: string;
      lang: string;
      text: string;
      translation?: string;
      rate?: number;
      pause?: number;
    }
  | {
      id: string;
      type: "handler" | "dad";
      speaker: string;
      lang: string;
      text: string;
      rate?: number;
      pause?: number;
    }
  | {
      id: string;
      type: "prompt";
      speaker: null;
      display: string;
    };

export const TAPE_SEGMENTS: readonly TapeSegment[] = [
  {
    id: "header",
    type: "ambient",
    display: "TAPE 01  //  SURVEILLANCE  //  SEATTLE WA",
    pause: 2200,
  },
  {
    id: "s_a1",
    type: "surveillance",
    speaker: "SUBJECT A",
    lang: "fr-FR",
    text: "Excusez-moi. Vous parlez anglais ?",
    translation: "Excuse me. Do you speak English?",
    rate: 0.82,
    pause: 900,
  },
  {
    id: "s_b1",
    type: "surveillance",
    speaker: "SUBJECT B",
    lang: "fr-FR",
    text: "Non, monsieur. Je ne parle pas anglais.",
    translation: "No, sir. I don't speak English.",
    rate: 0.82,
    pause: 900,
  },
  {
    id: "s_a2",
    type: "surveillance",
    speaker: "SUBJECT A",
    lang: "fr-FR",
    text: "Je comprends un peu le français.",
    translation: "I understand a little French.",
    rate: 0.82,
    pause: 900,
  },
  {
    id: "s_b2",
    type: "surveillance",
    speaker: "SUBJECT B",
    lang: "fr-FR",
    text: "Vous êtes américain ?",
    translation: "Are you American?",
    rate: 0.82,
    pause: 700,
  },
  {
    id: "s_a3",
    type: "surveillance",
    speaker: "SUBJECT A",
    lang: "fr-FR",
    text: "Oui, mademoiselle.",
    translation: "Yes, miss.",
    rate: 0.82,
    pause: 1800,
  },
  {
    id: "h1",
    type: "handler",
    speaker: "HANDLER",
    lang: "en-US",
    text: "Okay. Let's go through it. First phrase — excusez-moi. Excuse me. That's your entry. Neutral, polite, stops someone in their tracks.",
    rate: 0.88,
    pause: 600,
  },
  {
    id: "h2",
    type: "handler",
    speaker: "HANDLER",
    lang: "en-US",
    text: "Vous parlez anglais. Do you speak English. Listen to the vowels — voo par-lay on-glay. Say it with me.",
    rate: 0.88,
    pause: 600,
  },
  {
    id: "d1",
    type: "dad",
    speaker: "DAD",
    lang: "fr-FR",
    text: "Vous parlez anglais.",
    rate: 0.78,
    pause: 1000,
  },
  {
    id: "h3",
    type: "handler",
    speaker: "HANDLER",
    lang: "en-US",
    text: "Good. Now together — excusez-moi, vous parlez anglais.",
    rate: 0.88,
    pause: 600,
  },
  {
    id: "d2",
    type: "dad",
    speaker: "DAD",
    lang: "fr-FR",
    text: "Excusez-moi. Vous parlez anglais ?",
    rate: 0.78,
    pause: 1400,
  },
  {
    id: "h4",
    type: "handler",
    speaker: "HANDLER",
    lang: "en-US",
    text: "Now you.",
    rate: 0.88,
    pause: 400,
  },
  {
    id: "prompt",
    type: "prompt",
    speaker: null,
    display: "Excusez-moi. Vous parlez anglais ?",
  },
];
