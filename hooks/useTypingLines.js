import { useState, useEffect } from "react";

/**
 * Typing effect line by line for AI responses
 * Safely handles empty lines and ensures all lines appear
 */
export default function useTypingLines(text = "", speed = 40) {
  const [displayed, setDisplayed] = useState([]);

  useEffect(() => {
    if (!text) {
      setDisplayed([]);
      return;
    }

    const lines = text.split("\n"); // keep all lines, even empty
    setDisplayed([]); // reset

    let index = 0;

    const interval = setInterval(() => {
      setDisplayed((prev) => [...prev, lines[index]]);
      index++;

      if (index >= lines.length) {
        clearInterval(interval); // only clear after last line
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}