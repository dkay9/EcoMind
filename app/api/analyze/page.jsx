import { analyzeWithGemini } from "@/lib/gemini";

export async function POST(req) {
  try {
    const { text } = await req.json();
    const result = await analyzeWithGemini(text);

    return Response.json({ result });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
