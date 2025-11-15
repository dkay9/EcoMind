import { NextResponse } from "next/server";

const API_KEY = process.env.HUGGING_FACE_API_KEY;
const MODEL = "google/flan-t5-small"; // lightweight, free, fast
const ROUTER_URL = "https://router.huggingface.co/hf-inference";

export async function POST(req) {
  if (!API_KEY) {
    console.error("Hugging Face API key missing");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  try {
    const { prompt } = await req.json();
    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const response = await fetch(`${ROUTER_URL}/${MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    // Only parse JSON if response is OK
    if (!response.ok) {
      const text = await response.text(); // may be HTML like "Not Found"
      console.error("Hugging Face router error:", response.status, text);
      return NextResponse.json(
        { error: "Hugging Face request failed" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Hugging Face response:", data);

    // Safely extract output
    let output = "";
    if (Array.isArray(data)) {
      output = data[0]?.generated_text || "No response generated.";
    } else if (data.generated_text) {
      output = data.generated_text;
    } else {
      output = JSON.stringify(data);
    }

    return NextResponse.json({ output });
  } catch (err) {
    console.error("Server request failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
