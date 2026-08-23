import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [{ title: "Terms & Conditions — Arawat Occult Sciences" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <main className="relative min-h-svh">
      <div className="starfield" aria-hidden />
      <div className="starfield-slow" aria-hidden />
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-24 pt-28">
        <a href="/" className="font-display text-xs tracking-[0.2em] text-gold/70 uppercase transition-colors hover:text-gold">← Back to Home</a>
        <h1 className="mt-6 font-display text-3xl text-gradient-gold sm:text-4xl">Terms &amp; Conditions</h1>
        <div className="surface-card mt-8 rounded-3xl p-8 text-sm leading-relaxed text-muted-foreground sm:p-10">
          <p>By accessing this website and booking a consultation, you agree to the following terms:</p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>All services are based on traditional systems of guidance and are for personal insight purposes only.</li>
            <li>Consultation fees, once paid, are subject to the refund policy communicated at the time of booking.</li>
            <li>Appointments are scheduled as per availability. Open Query Hour (Tue/Thu/Sat, 3–4 PM) is limited to one question per session.</li>
            <li>Information you provide (name, birth details) is used solely to prepare your reading and is kept confidential.</li>
          </ul>
          <p className="mt-4">For any clarification, please contact us on WhatsApp before booking.</p>
        </div>
      </section>
    </main>
  );
}
