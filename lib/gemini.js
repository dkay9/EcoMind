export async function analyzeWithGemini(userMessage) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GOOGLE_GEMINI_API_KEY");

  const systemPrompt = `
You are EcoMind — an empathetic emotional analysis AI.
Analyze the user's emotional state and return structured feedback:
1. Emotional breakdown
2. Stress level (0–10)
3. Possible triggers
4. Coping strategies
5. Short motivational reassurance
  `;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nUser: ${userMessage}` }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      }),
    }
  );

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No feedback available.";
}
