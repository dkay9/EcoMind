"use client";

import { motion } from "framer-motion";
import useTypingLines from "@/hooks/useTypingLines";

export default function AIResponseCard({ title = "Analysis Result", content }) {
  const typedLines = useTypingLines(content, 50); // adjust speed per line
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl space-y-4"
    >
      <h3 className="text-2xl font-semibold">{title}</h3>

      <div className="space-y-2 text-white/90 leading-relaxed">
        {typedLines.map((line, i) => (
          <FormattedLine key={i} line={line} />
        ))}
      </div>
    </motion.div>
  );
}

// Split header vs bullet vs normal line
function FormattedLine({ line }) {
  if (!line) return null; // <-- add this guard

  if (line.includes(":") && !line.startsWith("•")) {
    return <p className="font-semibold text-white">{line}</p>;
  }
  if (line.startsWith("•")) {
    return <p className="pl-4">{line}</p>;
  }
  return <p>{line}</p>;
}