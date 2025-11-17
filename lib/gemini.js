export async function analyzeWithGemini(userMessage) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GOOGLE_GEMINI_API_KEY");

  const systemPrompt = `
You are EcoMind — an AI assistant that helps users understand the environmental impact of their lifestyle or business habits.

Return your response as plain, readable text with no markdown symbols, bullets, hashtags, stars, or formatting.

Your structure must ALWAYS follow this format:

Environmental Impact:
(One sentence describing the single most important environmental impact.)

Eco-Friendly Improvement:
(One sentence suggesting the single most effective improvement they can make.)

Estimated Benefit:
(One short estimate of monthly CO2 savings or environmental benefit. Keep numbers simple.)

Summary:
(One friendly, encouraging, actionable sentence.)

Keep the tone clear, warm, and simple.
`;

  async function callWithRetry(body, retries = 3) {
    for (let attempt = 0; attempt < retries; attempt++) {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await res.json();

      if (res.ok) return data;

      if (data.error?.status === "UNAVAILABLE") {
        console.log(`Gemini overloaded. Retrying ${attempt + 1}/${retries}...`);
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
        continue;
      }

      throw new Error(data.error?.message || "Gemini API error");
    }

    throw new Error("Gemini overloaded — try again later.");
  }

  const body = {
    contents: [
      {
        role: "user",
        parts: [{ text: `${systemPrompt}\n\nUser: ${userMessage}` }],
      },
    ],
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 400,
    },
  };

  const data = await callWithRetry(body);

  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "EcoMind couldn't generate feedback at the moment."
  );
}
