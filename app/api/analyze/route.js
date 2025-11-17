import { NextResponse } from "next/server";
import { analyzeWithGemini } from "@/lib/gemini";

export async function POST(req) {
  try {
    const { input } = await req.json();

    if (!input || !input.trim()) {
      return NextResponse.json(
        { error: "Input is required" },
        { status: 400 }
      );
    }

    const output = await analyzeWithGemini(input);
    return NextResponse.json({ output });
  } catch (err) {
    console.error("Analyze error:", err);

    return NextResponse.json(
      {
        error: "EcoMind is temporarily busy. Try again in a few seconds.",
      },
      { status: 500 }
    );
  }
}
