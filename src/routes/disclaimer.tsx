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
            The services offered by <span className="text-foreground">ARAWAT OCCULT SCIENCES</span> and Acharya Aarti are based on traditional and spiritual systems of guidance, including astrology, numerology, astro-vastu, aura scanning and Lal Kitab principles.
          </p>
          <p className="mt-4">
            All consultations, remedies and guidance are intended for informational and personal guidance purposes only. They should not be considered a substitute for professional medical, legal, financial or psychological advice.
          </p>
          <p className="mt-4">
            No specific outcome or result is guaranteed. The effectiveness of any remedial guidance depends on many individual factors and personal effort.
          </p>
          <p className="mt-4">
            By using this website and availing our services, you acknowledge that you have read, understood and agreed to this disclaimer.
          </p>
        </div>
      </section>
    </main>
  );
}
