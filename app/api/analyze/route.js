import { NextResponse } from "next/server";

export async function POST(req) {
  const { input } = await req.json();

  // Temporary mock result
  const mockOutput = `
 Your activity: ${input}

Estimated carbon impact: ~2.3kg CO₂/day
Main factors: energy usage, transportation

Recommendations:
• Switch to LED or solar alternatives
• Reduce frequency or consolidate activities
• Choose low-carbon transport options
  `;

  return NextResponse.json({ output: mockOutput });
}
