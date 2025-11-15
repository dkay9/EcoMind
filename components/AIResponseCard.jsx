"use client";

import { motion } from "framer-motion";

export default function AIResponseCard({ title = "Analysis Result", content }) {
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 shadow-xl space-y-4"
    >
      <h3 className="text-2xl font-semibold">{title}</h3>

      <div className="space-y-4 text-white/90 leading-relaxed">
        {formatContent(content)}
      </div>
    </motion.div>
  );
}

// Utility to auto-format the AI output
function formatContent(text) {
  const sections = text.trim().split("\n").filter(Boolean);

  return sections.map((line, i) => {
    const isHeader = line.includes(":") && !line.startsWith("•");

    if (isHeader) {
      return (
        <p key={i} className="font-semibold text-white">
          {line}
        </p>
      );
    }

    if (line.startsWith("•")) {
      return (
        <p key={i} className="pl-4">
          {line}
        </p>
      );
    }

    return <p key={i}>{line}</p>;
  });
}
