import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [{ title: "Privacy Policy — Arawat Occult Sciences" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="relative min-h-svh">
      <div className="starfield" aria-hidden />
      <div className="starfield-slow" aria-hidden />
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-24 pt-28">
        <a href="/" className="font-display text-xs tracking-[0.2em] text-gold/70 uppercase transition-colors hover:text-gold">← Back to Home</a>
        <h1 className="mt-6 font-display text-3xl text-gradient-gold sm:text-4xl">Privacy Policy</h1>
        <div className="surface-card mt-8 rounded-3xl p-8 text-sm leading-relaxed text-muted-foreground sm:p-10">
          <p>Your privacy is important to us. This policy explains what information is collected and how it is used.</p>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>We collect only the information you voluntarily provide through the booking form or WhatsApp (name, phone, date/place of birth, query).</li>
            <li>This information is used solely to prepare your astrological reading and to contact you regarding your consultation.</li>
            <li>We do not share, sell or publish your personal information. All readings and conversations remain strictly confidential.</li>
            <li>Basic technical data (like anonymised analytics) may be used to improve the website experience.</li>
          </ul>
          <p className="mt-4">If you have any privacy-related questions, please reach out on WhatsApp.</p>
        </div>
      </section>
    </main>
  );
}
