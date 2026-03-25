import { useState } from "react";
import PimsleurPrompt from "./components/PimsleurPrompt.tsx";
import StoryBeat from "./components/StoryBeat.tsx";
import TapeSequence from "./components/TapeSequence.tsx";
import type { ScoreResult } from "./hooks/useSpeech.ts";
import { STORY_BEATS } from "./story.ts";

const SCENE = {
  STORY: "story",
  TAPE: "tape",
  PROMPT: "prompt",
} as const;

type Scene = (typeof SCENE)[keyof typeof SCENE];

export default function App() {
  const [scene, setScene] = useState<Scene>(SCENE.STORY);
  const [beatKey, setBeatKey] = useState("start");
  const [promptResult, setPromptResult] = useState<ScoreResult | null>(null);

  const beat = STORY_BEATS[beatKey];

  const handleStoryAction = (nextKey: string | null | undefined) => {
    if (!nextKey) {
      setScene(SCENE.TAPE);
    } else {
      setBeatKey(nextKey);
    }
  };

  const handleTapePrompt = () => {
    setScene(SCENE.PROMPT);
  };

  const handlePromptComplete = (result: ScoreResult | null) => {
    setPromptResult(result);
    setBeatKey("after_tape");
    setScene(SCENE.STORY);
  };

  return (
    <div className="game-root">
      <div className="grain" aria-hidden="true" />

      <div className="vignette" aria-hidden="true" />

      <div className="game-frame">
        {scene === SCENE.STORY && beat && (
          <StoryBeat key={beatKey} beat={beat} onAction={handleStoryAction} />
        )}

        {scene === SCENE.TAPE && <TapeSequence onPrompt={handleTapePrompt} />}

        {scene === SCENE.PROMPT && <PimsleurPrompt onComplete={handlePromptComplete} />}
      </div>

      <div className="debug-strip">
        scene: {scene} {scene === SCENE.STORY ? `| beat: ${beatKey}` : ""}
        {promptResult && ` | score: ${Math.round((promptResult.score ?? 0) * 100)}%`}
      </div>
    </div>
  );
}
