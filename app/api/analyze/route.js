import { NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/gemini"; // use your wrapper

export async function POST(req) {
  try {
    const { input } = await req.json();

    if (!input?.trim()) {
      return NextResponse.json({ error: "Missing input" }, { status: 400 });
    }

    const result = await analyzeWithGemini(input);

    return NextResponse.json({ output: result });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
