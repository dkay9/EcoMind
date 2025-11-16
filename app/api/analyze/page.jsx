"use client";

import { useState } from "react";
import AIResponseCard from "@/components/AIResponseCard";

export default function AnalyzePage() {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!input) return;
    setLoading(true);
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });
    const data = await res.json();
    setAnalysis(data.result);
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto pt-20 space-y-6">
      <textarea
        className="w-full p-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur text-white"
        rows={5}
        placeholder="Tell EcoMind how you're feeling..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>

      <button
        onClick={handleAnalyze}
        className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 hover:bg-white/30"
      >
        {loading ? "Analyzing..." : "Analyze Emotion"}
      </button>

      {analysis && <AIResponseCard content={analysis} />}
    </div>
  );
}
