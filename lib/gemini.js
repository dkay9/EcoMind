export async function analyzeWithGemini(userMessage) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("Missing GOOGLE_GEMINI_API_KEY");

  const systemPrompt = `
You are EcoMind — an AI assistant that helps users make their lifestyle or business more eco-friendly. 
When the user describes their daily habits or business activities, provide structured, actionable feedback in plain text (no Markdown, no bullets, no headings).

Follow this structure strictly, with one main point per section:

1. Environmental Impact: Describe the single most important environmental impact of the activity.
2. Eco-Friendly Alternative: Suggest the single most effective improvement or change.
3. Estimated Impact: Provide a concise estimate of potential CO₂ savings or environmental benefit per month.
4. Summary: Give a short, friendly, actionable note that the user can implement easily.

Keep the tone friendly, encouraging, and informative.
Do not use markdown symbols like # or *.
`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000); // 30s

  try {
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
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(`Gemini API returned invalid JSON: ${await response.text()}`);
    }

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      throw new Error(data.error?.message || "Gemini API request failed.");
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text || "EcoMind couldn't generate feedback.";
  } catch (err) {
    clearTimeout(timeout);
    console.error("Gemini API request failed:", err);
    throw err;
  }
}
