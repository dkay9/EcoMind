"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";

// Dynamically import to avoid SSR errors if it touches window or canvas
const GridScan = dynamic(() => import("@/components/GridScan"), { ssr: false });

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-10">
        <HeroSection />
      </div>
    </main>
  );
}
