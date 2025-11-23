export async function analyzeWithGemini(input) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
  
  const systemPrompt = `
You are EcoMind — an AI assistant that helps users understand the environmental impact of their lifestyle or business habits.

Return your response as plain, readable text with no markdown symbols, bullets, hashtags, stars, or formatting.

Environmental Impact:
(One sentence describing the single most important environmental impact.)

Eco-Friendly Improvement:
(One sentence suggesting the single most effective improvement they can make.)

Estimated Benefit:
(One short estimate of monthly CO2 savings or environmental benefit.)

Summary:
(One friendly, encouraging, actionable sentence.)

Keep the tone clear, warm, and simple.
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${systemPrompt}\n\nUser: ${input}`
              }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  return data.candidates[0].content.parts[0].text;
}

