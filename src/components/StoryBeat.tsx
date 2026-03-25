import { useEffect, useState } from "react";
import type { StoryBeat as StoryBeatModel } from "../story.ts";
import TypeWriter from "./TypeWriter.tsx";

interface StoryBeatProps {
  beat: StoryBeatModel;
  onAction: (nextKey: string | null | undefined) => void;
}

export default function StoryBeat({ beat, onAction }: StoryBeatProps) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setRevealedCount(0);
    setReady(false);
  }, [beat]);

  const handleLineDone = () => {
    setRevealedCount((c) => {
      const next = c + 1;
      if (next >= beat.lines.length) {
        setTimeout(() => setReady(true), 600);
      }
      return next;
    });
  };

  return (
    <div className="story-beat">
      <div className="lines">
        {beat.lines.slice(0, revealedCount + 1).map((line, i) => (
          <p key={i} className={i < revealedCount ? "line done" : "line active"}>
            {i < revealedCount ? (
              line
            ) : (
              <TypeWriter text={line} speed={22} onDone={handleLineDone} />
            )}
          </p>
        ))}

        {ready && beat.note && <p className="note">{beat.note}</p>}
      </div>

      {ready && (
        <div className="beat-footer">
          {beat.choices ? (
            <div className="choices">
              {beat.choices.map((choice, i) => (
                <button key={i} className="choice-btn" onClick={() => onAction(choice.next)}>
                  <span className="choice-arrow">›</span>
                  {choice.text}
                </button>
              ))}
            </div>
          ) : beat.action ? (
            <button className="action-btn" onClick={() => onAction(beat.next)}>
              {beat.action}
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
