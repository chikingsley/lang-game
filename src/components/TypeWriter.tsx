import { useEffect, useState } from "react";

interface TypeWriterProps {
  text: string;
  speed?: number;
  onDone?: () => void;
  className?: string;
}

export default function TypeWriter({ text, speed = 28, onDone, className = "" }: TypeWriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    if (!text) return;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onDone?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="cursor">▋</span>}
    </span>
  );
}
