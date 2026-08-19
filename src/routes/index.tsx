import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useRef } from "react";
import chakraFigure from "@/assets/chakra-figure.jpg";



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arawat Occult Sciences | Tap Your Chakras, Find Clarity" },
      {
        name: "description",
        content:
          "Interactive chakra guide by Acharya Aarti — astrology, numerology, astro-vastu & aura scanning. Tap each chakra to discover the remedy meant for you.",
      },
      { property: "og:title", content: "Arawat Occult Sciences" },
      {
        property: "og:description",
        content: "Tap each chakra to discover your guidance. 7+ years of occult sciences with Acharya Aarti.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP = "https://wa.me/919760340289";

const chakras = [
  {
    name: "Sahasrara",
    label: "Crown",
    top: "44.6%",
    color: "oklch(0.65 0.24 305)",
    theme: "Spiritual Guidance & Remedies",
    line: "Jab sab kuch theek lagta hai par mann khaali — yahan se path khulta hai.",
    services: ["Spiritual Guidance & Remedies", "Any Personal Query"],
  },
  {
    name: "Ajna",
    label: "Third Eye",
    top: "48.4%",
    color: "oklch(0.55 0.2 270)",
    theme: "Astrology & Kundali Reading",
    line: "Aapki janm kundali ka blueprint — timing, dasha aur sahi decision.",
    services: ["Kundali Milan", "Marriage & Compatibility", "Numerology & Name Analysis"],
  },
  {
    name: "Vishuddha",
    label: "Throat",
    top: "52.6%",
    color: "oklch(0.7 0.15 230)",
    theme: "Open Query Hour",
    line: "Ek sawaal, ek baat-cheet, thodi aur clarity.",
    services: ["Open Query Hour", "Mobile Number & Wallpaper Analysis"],
  },
  {
    name: "Anahata",
    label: "Heart",
    top: "57.3%",
    color: "oklch(0.75 0.18 150)",
    theme: "Love, Relationship & Family",
    line: "Rishton ki uljhan ke peeche hamesha ek energy pattern hota hai.",
    services: ["Love & Relationship", "Family Matters", "Special Chant for Healthy Relationships"],
  },
  {
    name: "Manipura",
    label: "Solar Plexus",
    top: "62%",
    color: "oklch(0.85 0.17 90)",
    theme: "Career, Business & Money",
    line: "Mehnat poori, result adhoora? Yeh chakra usi block ki baat karta hai.",
    services: ["Career & Professional Life", "Business & Financial Growth", "Special Chant for Money Attraction"],
  },
  {
    name: "Svadhisthana",
    label: "Sacral",
    top: "66.8%",
    color: "oklch(0.72 0.19 55)",
    theme: "Children & Learning",
    line: "Bachchon ka focus, wellness aur unki apni speed.",
    services: ["Children's Concentration & Focus Mantras", "Children Wellness Guidance"],
  },
  {
    name: "Muladhara",
    label: "Root",
    top: "77.2%",
    color: "oklch(0.6 0.22 25)",
    theme: "Home, Vastu & Well-being",
    line: "Ghar ki disha theek, toh jeevan ki dhara theek.",
    services: ["Astro-Vastu Guidance", "Aura & Energy Reading", "Special Chant for Health & Well-being"],
  },
];

const allServices = [
  "Children's Concentration & Focus Mantras",
  "Children Wellness Guidence",
  "Family Matters",
  "Career & Professional Life",
  "Business & Financial Growth",
  "Astro-Vastu Guidance",
  "Love & Relationship",
  "Kundali Milan",
  "Marriage & Compatibility",
  "Numerology & Name Analysis",
  "Mobile number and wallpaper analysis",
  "Aura & Energy Reading",
  "Special Chant for Money Attraction",
  "Special Chant for Healthy Relationships",
  "Special Chant for Health & Well-being",
  "Spiritual Guidance & Remedies",
  "Open Query Hour",
  "Any Personal Query",
];

function SparkleTrail({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setTick] = useState(0);
  const sparklesRef = useRef<
    { id: number; x: number; y: number; size: number; color: string; born: number }[]
  >([]);
  const idRef = useRef(0);

  const colors = [
    "oklch(0.85 0.15 88)",
    "oklch(0.93 0.11 95)",
    "oklch(0.82 0.15 85)",
    "oklch(1 0.12 90)",
    "oklch(0.72 0.13 70)",
  ];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < 3; i++) {
        sparklesRef.current.push({
          id: idRef.current++,
          x: x + (Math.random() - 0.5) * 30,
          y: y + (Math.random() - 0.5) * 30,
          size: Math.random() * 6 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          born: Date.now(),
        });
      }
      // keep max 60 sparkles
      if (sparklesRef.current.length > 60) {
        sparklesRef.current = sparklesRef.current.slice(-40);
      }
      setTick((t) => t + 1);
    },
    [],
  );

  // cleanup old sparkles
  const now = Date.now();
  sparklesRef.current = sparklesRef.current.filter((s) => now - s.born < 700);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative"
      style={{ overflow: "visible" }}
    >
      {children}
      {sparklesRef.current.map((s) => {
        const age = (now - s.born) / 700;
        return (
          <span
            key={s.id}
            className="pointer-events-none absolute z-50"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: s.color,
              boxShadow: `0 0 ${s.size * 2}px ${s.color}, 0 0 ${s.size * 4}px ${s.color}`,
              opacity: 1 - age,
              transform: `scale(${1 - age * 0.5})`,
              transition: "opacity 0.1s, transform 0.1s",
            }}
          />
        );
      })}
    </div>
  );
}

function Diamond({ color, active }: { color: string; active: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full transition-all duration-300"
      style={{
        filter: `drop-shadow(0 0 ${active ? 18 : 8}px ${color}) drop-shadow(0 0 4px oklch(1 0 0 / 0.9))`,
        transform: active ? "scale(1.35)" : "scale(1)",
      }}
      aria-hidden
    >
      <g>
        <polygon points="20,38 80,38 50,88" fill={color} opacity="0.95" />
        <polygon points="20,38 50,88 35,38" fill="oklch(1 0 0 / 0.55)" />
        <polygon points="65,38 80,38 50,88" fill="oklch(0.2 0 0 / 0.35)" />
        <polygon points="34,14 66,14 80,38 20,38" fill={color} opacity="0.8" />
        <polygon points="34,14 66,14 58,38 42,38" fill="oklch(1 0 0 / 0.75)" />
        <polygon points="20,38 34,14 42,38" fill="oklch(1 0 0 / 0.35)" />
        <polygon points="58,38 66,14 80,38" fill="oklch(0.2 0 0 / 0.25)" />
      </g>
    </svg>
  );
}

function Index() {
  const [active, setActive] = useState(1);
  const current = chakras[active] ?? chakras[1]!;

  return (
    <main className="relative overflow-hidden">
      {/* Video hero */}
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-cosmos.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster={chakraFigure}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(75% 55% at 50% 45%, oklch(0.12 0.05 300 / 0.35), oklch(0.11 0.05 300 / 0.8) 85%), linear-gradient(180deg, transparent 55%, oklch(0.11 0.05 300) 100%)",
          }}
          aria-hidden
        />
        <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
          <h1 className="text-5xl leading-tight font-bold italic sm:text-7xl">
            <span className="text-gradient-gold">ARAWAT</span>
            <span className="mt-2 block text-xl font-medium tracking-[0.35em] text-muted-foreground sm:text-2xl">
              OCCULT SCIENCES
            </span>
          </h1>
          <p className="text-xs tracking-[0.25em] text-gold-soft/80 uppercase sm:text-sm">
            Astrology · Numerology · Astro-Vastu · Aura Scanning
          </p>
          <p className="max-w-xl text-lg text-muted-foreground italic sm:text-xl font-display">
            Understand your chart. Find clarity. Take better decisions.
          </p>
          <a
            href="#chakras"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/50 px-7 py-3 text-xs tracking-[0.2em] text-gold uppercase transition-transform duration-200 hover:scale-105"
          >
            Tap the diamonds ▾
          </a>
        </div>
      </section>

      {/* Header */}
      <header
        id="chakras"
        className="relative z-10 mx-auto flex max-w-6xl scroll-mt-8 flex-col items-center gap-3 px-6 pt-20 text-center"
      >
        <h2 className="text-3xl text-gradient-gold sm:text-4xl">✦ Your Seven Diamonds ✦</h2>
        <p className="max-w-xl text-lg text-muted-foreground italic">
          Har chakra ek heera hai — tap kijiye aur page aapke liye badal jayega.
        </p>
        <span className="rounded-full border border-gold/40 px-4 py-1 text-xs tracking-widest text-gold uppercase">
          ✦ 7+ Years of Experience ✦
        </span>
      </header>

      {/* Interactive chakra */}
      <section className="relative z-10 mx-auto mt-14 grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1fr_1fr]">
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -inset-6 rounded-[3rem] bg-accent/20 blur-3xl" aria-hidden />
          <img
            src={chakraFigure}
            alt="Meditating silhouette with seven glowing chakras before a golden zodiac mandala"
            width={1024}
            height={1280}
            className="relative rounded-[2rem] border border-gold/25 shadow-card"
          />
          {chakras.map((c, i) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${c.label} chakra — ${c.theme}`}
              aria-pressed={active === i}
              className="absolute left-1/2 z-20 h-8 w-8 -translate-x-1/2 -translate-y-1/2 outline-none focus-visible:ring-2 focus-visible:ring-gold"
              style={{
                top: c.top,
                animation: active === i ? "float-slow 3s ease-in-out infinite" : undefined,
              }}
            >
              <Diamond color={c.color} active={active === i} />
              {active === i && (
                <span
                  className="absolute top-1/2 left-1/2 -z-10 block h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${c.color} 0%, transparent 70%)`,
                    opacity: 0.55,
                    animation: "chakra-pulse 2s ease-in-out infinite",
                  }}
                />
              )}
            </button>
          ))}
          <p className="mt-4 text-center text-sm tracking-wider text-muted-foreground">
            ✦ Tap any diamond ✦
          </p>
        </div>

        <article
          key={current.name}
          className="animate-fade-in surface-card rounded-3xl p-8"
          style={{ boxShadow: `0 0 60px -30px ${current.color}` }}
        >
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: current.color }}
          >
            {current.label} Chakra
          </span>
          <h2 className="mt-2 text-3xl text-gradient-gold">{current.name}</h2>
          <p className="mt-1 text-lg text-foreground">{current.theme}</p>
          <p className="mt-4 text-lg text-muted-foreground italic">{current.line}</p>
          <ul className="mt-6 space-y-3">
            {current.services.map((s) => (
              <li key={s} className="flex items-start gap-3 border-b border-border/40 pb-2 text-base">
                <span style={{ color: current.color }}>✦</span>
                {s}
              </li>
            ))}
          </ul>
          <a
            href={`${WHATSAPP}?text=${encodeURIComponent(`Namaste Acharya Aarti, mujhe ${current.theme} ke baare me guidance chahiye.`)}`}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-primary-foreground uppercase transition-transform duration-200 hover:scale-105"
          >
            Ask about this on WhatsApp
          </a>
        </article>
      </section>

      {/* Services */}
      <section className="relative z-10 mx-auto mt-24 max-w-5xl px-6">
        <h2 className="text-center text-3xl text-gradient-gold sm:text-4xl">✦ Services ✦</h2>
        <p className="mt-3 text-center text-base text-muted-foreground">
          Highlighted for{" "}
          <span style={{ color: current.color }}>{current.label} — {current.theme}</span>
        </p>
        {/* Diamond selector — also controls the page */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          {chakras.map((c, i) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${c.theme}`}
              aria-pressed={active === i}
              className="h-8 w-8 outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Diamond color={c.color} active={active === i} />
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {allServices.map((s) => {
            const norm = (v: string) => v.toLowerCase().replace(/[^a-z]/g, "");
            const on = current.services.some((cs) => {
              const a = norm(cs);
              const b = norm(s);
              return a.includes(b) || b.includes(a);
            });
            return (
              <div
                key={s}
                className="surface-card rounded-xl px-5 py-4 text-base transition-all duration-300 hover:-translate-y-1"
                style={
                  on
                    ? {
                        borderColor: current.color,
                        boxShadow: `0 0 30px -12px ${current.color}`,
                        transform: "translateY(-2px)",
                      }
                    : { opacity: 0.55 }
                }
              >
                <span className="mr-2" style={{ color: on ? current.color : "var(--gold)" }}>
                  ✦
                </span>
                {s}
              </div>
            );
          })}
        </div>
      </section>

      {/* Query hour */}
      <section className="relative z-10 mx-auto mt-24 max-w-3xl px-6">
        <div className="surface-card rounded-3xl p-10 text-center">
          <h2 className="text-2xl text-gold sm:text-3xl">Open Query Hour</h2>
          <p className="mt-3 text-lg tracking-wide">Tuesday · Thursday · Saturday</p>
          <p className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-lg font-semibold text-primary-foreground">
            3:00 PM – 4:00 PM
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-6 block text-3xl font-bold text-gradient-gold"
          >
            +91 89796 12599
          </a>
          <p className="mt-4 text-sm tracking-widest text-muted-foreground uppercase">
            One question. One conversation. A little more clarity.
          </p>
        </div>
      </section>

      {/* Visiting Cards */}
      <SparkleTrail>
      <section className="relative z-10 mx-auto mt-24 max-w-4xl px-6">
        <h2 className="text-center text-3xl text-gradient-gold sm:text-4xl">✦ Our Card ✦</h2>
        <p className="mt-3 text-center text-base text-muted-foreground italic">
          Hover to flip — see the other side.
        </p>
        <div className="mt-10 flex flex-col items-center gap-10 sm:flex-row sm:justify-center">
          {/* Card 1 — Front */}
          <div className="flip-card h-80 w-64 sm:h-96 sm:w-72">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src="/card1.jpeg"
                  alt="Arawat Occult Sciences — Front"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flip-card-back">
                <img
                  src="/card2.jpeg"
                  alt="Arawat Occult Sciences — Back"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          {/* Card 2 — Back */}
          <div className="flip-card h-80 w-64 sm:h-96 sm:w-72">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img
                  src="/card2.jpeg"
                  alt="Arawat Occult Sciences — Back"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flip-card-back">
                <img
                  src="/card1.jpeg"
                  alt="Arawat Occult Sciences — Front"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      </SparkleTrail>

      {/* Consultation Form */}
      <section className="relative z-10 mx-auto mt-24 max-w-2xl px-6">
        <div className="surface-card rounded-3xl p-10">
          <h2 className="text-center text-3xl text-gradient-gold sm:text-3xl">✦ Book Your Consultation ✦</h2>
          <p className="mt-3 text-center text-base text-muted-foreground italic">
            Share your details — Acharya Aarti will reach out on WhatsApp.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const name = fd.get("name") as string;
              const phone = fd.get("phone") as string;
              const dob = fd.get("dob") as string;
              const time = fd.get("time") as string;
              const place = fd.get("place") as string;
              const service = fd.get("service") as string;
              const query = fd.get("query") as string;

              const msg = [
                `🙏 *New Consultation Request*`,
                ``,
                `👤 *Name:* ${name}`,
                `📱 *Phone:* ${phone}`,
                `🎂 *DOB:* ${dob}`,
                `🕐 *Birth Time:* ${time || "Not sure"}`,
                `📍 *Birth Place:* ${place || "Not sure"}`,
                `🔮 *Service:* ${service}`,
                query ? `💬 *Query:* ${query}` : ``,
              ]
                .filter(Boolean)
                .join("\n");

              window.open(`https://wa.me/919760340289?text=${encodeURIComponent(msg)}`, "_blank");
            }}
            className="mt-8 space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs tracking-widest text-gold uppercase">Full Name *</label>
                <input name="name" required className="form-input" placeholder="Your name" />
              </div>
              <div>
                <label className="mb-1 block text-xs tracking-widest text-gold uppercase">Phone *</label>
                <input name="phone" required className="form-input" placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs tracking-widest text-gold uppercase">Date of Birth *</label>
                <input name="dob" type="date" required className="form-input" />
              </div>
              <div>
                <label className="mb-1 block text-xs tracking-widest text-gold uppercase">Birth Time</label>
                <input name="time" type="time" className="form-input" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs tracking-widest text-gold uppercase">Birth Place</label>
              <input name="place" className="form-input" placeholder="City, State" />
            </div>
            <div>
              <label className="mb-1 block text-xs tracking-widest text-gold uppercase">Service Needed *</label>
              <select name="service" required className="form-input">
                <option value="">Select a service</option>
                {allServices.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs tracking-widest text-gold uppercase">Your Query</label>
              <textarea name="query" rows={3} className="form-input" placeholder="What guidance are you looking for?" />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-primary-foreground uppercase transition-transform duration-200 hover:scale-[1.02]"
            >
              Send on WhatsApp →
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mx-auto mt-24 max-w-5xl px-6 pb-16 text-center">
        <p className="text-3xl text-gradient-gold" style={{ fontFamily: "var(--font-body)" }}>
          Acharya Aarti
        </p>
        <p className="mt-1 text-xs tracking-[0.3em] text-muted-foreground uppercase">
          Arawat Occult Sciences
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
          <span>100% Confidential</span>
          <span>Personalised Guidance</span>
          <span>Effective Remedies</span>
          <span>Positive Transformation</span>
        </div>
        <p className="mt-8 text-xs tracking-widest text-gold/70 uppercase">
          Trusted guidance for a better tomorrow
        </p>
      </footer>
    </main>
  );
}
