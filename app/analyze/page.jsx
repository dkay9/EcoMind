"use client";

import { useState } from "react";

export default function AnalyzePage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse({ error: "Something went wrong." });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen neon-bg text-white p-6 flex items-start justify-center">
      <div className="w-full max-w-2xl mt-20 space-y-6">

        {/* Input Section */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 space-y-4">
          <h2 className="text-2xl font-semibold">Analyze Activity</h2>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your activity…"
            className="w-full p-4 min-h-[120px] text-black rounded-lg"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl border border-white/30 backdrop-blur-md transition"
          >
            {loading ? "Analyzing..." : "Analyze Impact"}
          </button>
        </div>

        {/* Response Section */}
        {response && (
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
            {response.error ? (
              <p className="text-red-300">{response.error}</p>
            ) : (
              <div>
                <h3 className="text-xl font-semibold mb-2">Results</h3>
                <p className="whitespace-pre-line opacity-90">
                  {response.output}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
