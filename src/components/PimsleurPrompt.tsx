import { useState } from "react";
import { recognize, scoreAttempt, speak, type ScoreResult } from "../hooks/useSpeech.ts";
import { TARGET_PHRASE } from "../tape.ts";

type Phase = "ready" | "listening" | "scored" | "error";

interface PimsleurPromptProps {
  onComplete: (result: ScoreResult | null) => void;
}

function getErrorMessage(e: unknown): string {
  if (e instanceof Error) {
    if (e.message === "timeout") return "No speech detected. Try again.";
    if (e.message.includes("not-allowed")) return "Microphone access denied. Allow mic and reload.";
    return `ASR error: ${e.message}`;
  }
  if (
    typeof e === "object" &&
    e !== null &&
    "error" in e &&
    typeof (e as { error: string }).error === "string"
  ) {
    return `ASR error: ${(e as { error: string }).error}`;
  }
  return "ASR error: unknown";
}

export default function PimsleurPrompt({ onComplete }: PimsleurPromptProps) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleListen = async () => {
    setPhase("listening");
    setErrorMsg("");
    try {
      const recognized = await recognize({ lang: "fr-FR", maxSeconds: 7 });
      const scored = scoreAttempt(recognized, TARGET_PHRASE);
      setResult(scored);
      setPhase("scored");
    } catch (e) {
      setErrorMsg(getErrorMessage(e));
      setPhase("error");
    }
  };

  const handleHear = async () => {
    await speak(TARGET_PHRASE, { lang: "fr-FR", rate: 0.78 });
  };

  const handleContinue = () => {
    onComplete(result);
  };

  const handleRetry = () => {
    setPhase("ready");
    setResult(null);
    setErrorMsg("");
  };

  return (
    <div className="prompt-container">
      <div className="prompt-header">
        <span className="prompt-label">YOUR TURN</span>
      </div>

      <div className="prompt-phrase">
        {TARGET_PHRASE}
        <button className="hear-btn" onClick={() => void handleHear()} title="Hear it again">
          ◈
        </button>
      </div>

      <div className="prompt-translation">Excuse me. Do you speak English?</div>

      {phase === "ready" && (
        <button className="mic-btn" onClick={() => void handleListen()}>
          ● Speak
        </button>
      )}

      {phase === "listening" && (
        <div className="listening-indicator">
          <span className="pulse-ring" />
          Listening…
        </div>
      )}

      {phase === "error" && (
        <div className="prompt-error">
          <p>{errorMsg}</p>
          <button className="mic-btn retry" onClick={handleRetry}>
            Try again
          </button>
        </div>
      )}

      {phase === "scored" && result && (
        <div className="prompt-result">
          <div className={`score-bar ${result.pass ? "pass" : "retry"}`}>
            <div className="score-fill" style={{ width: `${Math.round(result.score * 100)}%` }} />
          </div>

          <p className="heard-text">
            <span className="heard-label">heard:</span> {result.transcript || "—"}
          </p>

          {result.pass ? (
            <>
              <p className="score-verdict pass-text">Good enough. Keep going.</p>
              <button className="action-btn" onClick={handleContinue}>
                Continue →
              </button>
            </>
          ) : (
            <>
              <p className="score-verdict retry-text">Try again before you go out there.</p>
              <div className="prompt-actions">
                <button className="mic-btn retry" onClick={handleRetry}>
                  Try again
                </button>
                <button className="action-btn secondary" onClick={handleContinue}>
                  Skip for now
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
