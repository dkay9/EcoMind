export async function analyzeWithGemini(userMessage) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GOOGLE_GEMINI_API_KEY");

  const systemPrompt = `
You are EcoMind — an AI assistant that helps users make their lifestyle or business more eco-friendly.
When the user describes their daily habits or business activities, provide structured, actionable feedback:

1. Identify the environmental impact of the described activity.
2. Suggest eco-friendly alternatives or improvements.
3. Estimate potential CO₂ savings or environmental benefits per month.
4. Give a short actionable summary that the user can implement easily.
5. Keep your tone friendly, encouraging, and informative.
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

  // 🔥 Proper error surfacing
  if (!response.ok) {
    console.error("Gemini API Error:", data);
    throw new Error(data.error?.message || "Gemini API request failed.");
  }

  // 🔥 Safe extraction so no undefined crash
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "EcoMind couldn't generate feedback."
  );
}
