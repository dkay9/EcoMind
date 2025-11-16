export default function HomePage() {
  return (
    <main className="min-h-screen neon-bg text-white flex items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-5xl font-bold leading-tight">
          Welcome to EcoMind
        </h1>

        <p className="text-lg opacity-90">
          Instantly analyze your activities, discover their carbon impact, and get
          actionable sustainable recommendations powered by AI.
        </p>

        <a
          href="/analyze"
          className="inline-block mt-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition"
        >
          Analyze My Footprint
        </a>
      </div>
    </main>
  );
}