import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Arawat Occult Sciences" },
      { name: "description", content: "Disclaimer for Arawat Occult Sciences — traditional and spiritual guidance services." },
    ],
  }),
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <main className="relative min-h-svh">
      <div className="starfield" aria-hidden />
      <div className="starfield-slow" aria-hidden />
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-24 pt-28">
        <a href="/" className="font-display text-xs tracking-[0.2em] text-gold/70 uppercase transition-colors hover:text-gold">← Back to Home</a>
        <h1 className="mt-6 font-display text-3xl text-gradient-gold sm:text-4xl">Disclaimer</h1>
        <div className="surface-card mt-8 rounded-3xl p-8 text-sm leading-relaxed text-muted-foreground sm:p-10">
          <p>
            <span className="text-foreground">ARAWAT OCCULT SCIENCES</span> offers traditional and spiritual guidance for informational and personal purposes only. Our services do not diagnose, treat, or cure any medical condition, and no specific result or outcome is guaranteed.
          </p>
          <p className="mt-4">
            For medical concerns, please consult a qualified healthcare professional.
          </p>
          <p className="mt-4">
            By using this website and availing our services, you acknowledge that you have read, understood and agreed to this disclaimer.
          </p>
        </div>
      </section>
    </main>
  );
}
