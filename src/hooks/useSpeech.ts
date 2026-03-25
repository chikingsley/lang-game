// useSpeech.ts — TTS + ASR wrapper for Web Speech API
// TTS: window.speechSynthesis — works in all modern browsers
// ASR: window.SpeechRecognition — Chrome/Edge only. Firefox needs flag.
// TODO: swap TTS for TADA-3B-ML via local API endpoint (French supported)
// TODO: swap ASR scoring for GOP transformer (xlsr-53 based)

// ─── TTS ───────────────────────────────────────────────────────────────────

export function speak(
  text: string,
  { lang = "fr-FR", rate = 0.85, pitch = 1.0 } = {},
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!window.speechSynthesis) {
      reject(new Error("speechSynthesis not supported"));
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = pitch;

    const voices = window.speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang.startsWith(lang.split("-")[0] ?? ""));
    if (match) utterance.voice = match;

    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);

    window.speechSynthesis.speak(utterance);
  });
}

export function stopSpeech(): void {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

export function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices());
    };
  });
}

// ─── ASR ───────────────────────────────────────────────────────────────────

export interface RecognitionAlternative {
  transcript: string;
  confidence: number;
}

export function recognize({ lang = "fr-FR", maxSeconds = 8 } = {}): Promise<
  RecognitionAlternative[]
> {
  return new Promise((resolve, reject) => {
    const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      reject(new Error("SpeechRecognition not supported — use Chrome or Edge"));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
    recognition.continuous = false;

    const timeout = setTimeout(() => {
      recognition.stop();
      reject(new Error("timeout"));
    }, maxSeconds * 1000);

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      clearTimeout(timeout);
      const first = event.results[0];
      const results: RecognitionAlternative[] = [];
      for (let i = 0; i < first.length; i++) {
        const r = first[i];
        results.push({
          transcript: r.transcript.trim().toLowerCase(),
          confidence: r.confidence,
        });
      }
      resolve(results);
    };

    recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
      clearTimeout(timeout);
      reject(e);
    };

    recognition.start();
  });
}

// ─── Scoring ───────────────────────────────────────────────────────────────
// Prototype: simple keyword overlap score
// TODO: replace with GOP transformer scoring (phoneme-level)

export interface ScoreResult {
  score: number;
  transcript: string;
  pass: boolean;
}

export function scoreAttempt(recognized: RecognitionAlternative[], target: string): ScoreResult {
  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z\s]/g, "")
      .trim();

  const targetWords = normalize(target).split(/\s+/);
  const bestTranscript = recognized[0]?.transcript ?? "";
  const spokenWords = normalize(bestTranscript).split(/\s+/);

  const matched = targetWords.filter((w) => spokenWords.includes(w)).length;
  const score = matched / targetWords.length;

  return {
    score,
    transcript: bestTranscript,
    pass: score >= 0.5,
  };
}
