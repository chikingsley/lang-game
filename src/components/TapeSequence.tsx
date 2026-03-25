import { useEffect, useRef, useState } from "react";
import { speak, stopSpeech, waitForVoices } from "../hooks/useSpeech.ts";
import { TAPE_SEGMENTS, type TapeSegment } from "../tape.ts";

type SpokenSegment = Extract<TapeSegment, { type: "surveillance" | "handler" | "dad" }>;

type LogEntry = SpokenSegment & { index: number };

interface TapeSequenceProps {
  onPrompt: () => void;
}

export default function TapeSequence({ onPrompt }: TapeSequenceProps) {
  const [segIndex, setSegIndex] = useState(-1);
  const [currentSeg, setCurrentSeg] = useState<TapeSegment | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [started, setStarted] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    void waitForVoices().then(() => setVoicesReady(true));
    return () => {
      cancelRef.current = true;
      stopSpeech();
    };
  }, []);

  const pause = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

  const runSegments = async (startIdx: number) => {
    for (let i = startIdx; i < TAPE_SEGMENTS.length; i++) {
      if (cancelRef.current) return;
      const seg = TAPE_SEGMENTS[i];
      setSegIndex(i);
      setCurrentSeg(seg);

      if (seg.type === "prompt") {
        onPrompt();
        return;
      }

      if (seg.type === "ambient") {
        await pause(seg.pause ?? 2000);
        continue;
      }

      const displayText = seg.text;
      setLog((prev) => [...prev, { ...seg, index: i }]);

      try {
        await speak(displayText, {
          lang: seg.lang ?? "fr-FR",
          rate: seg.rate ?? 0.85,
        });
      } catch (e) {
        console.warn("TTS error:", e);
      }

      if (seg.pause) await pause(seg.pause);
    }
  };

  const startTape = async () => {
    if (!voicesReady) return;
    setStarted(true);
    cancelRef.current = false;
    await runSegments(0);
  };

  const getSegClass = (seg: LogEntry) => {
    const map: Partial<Record<SpokenSegment["type"], string>> = {
      surveillance: "seg-surveillance",
      handler: "seg-handler",
      dad: "seg-dad",
    };
    return map[seg.type] ?? "";
  };

  const getSpeakerLabel = (seg: LogEntry) => {
    const labels: Record<SpokenSegment["type"], string | undefined> = {
      surveillance: seg.speaker,
      handler: "HANDLER",
      dad: "DAD",
    };
    return labels[seg.type] ?? seg.speaker;
  };

  const ambientHeader = TAPE_SEGMENTS[0];
  const ambientDisplay = ambientHeader.type === "ambient" ? ambientHeader.display : "";

  return (
    <div className="tape-sequence">
      <div className="tape-header">
        <span className="tape-label">■ REC</span>
        <span className="tape-title">TAPE 01</span>
        <span className="tape-lang">FR</span>
      </div>

      <div className="tape-screen">
        {!started ? (
          <div className="tape-start">
            <p className="tape-start-hint">
              You find the tape labeled <em>01</em> in the box.
            </p>
            <button
              className="tape-play-btn"
              onClick={() => void startTape()}
              disabled={!voicesReady}
            >
              {voicesReady ? "▶  Play" : "Loading voices…"}
            </button>
          </div>
        ) : (
          <div className="tape-transcript">
            {segIndex >= 0 && <div className="tape-ambient">{ambientDisplay}</div>}

            {log.map((entry, i) => (
              <div
                key={i}
                className={`tape-entry ${getSegClass(entry)} ${i === log.length - 1 ? "active" : ""}`}
              >
                <span className="tape-speaker">{getSpeakerLabel(entry)}</span>
                <span className="tape-text">
                  {entry.text}
                  {entry.type === "surveillance" && entry.translation && (
                    <span className="tape-translation"> — {entry.translation}</span>
                  )}
                </span>
              </div>
            ))}

            {currentSeg && currentSeg.type !== "prompt" && (
              <div className="tape-playing-indicator">
                <span className="pulse">●</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
