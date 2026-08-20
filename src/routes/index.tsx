import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useRef, useEffect } from "react";
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

const WHATSAPP = "https://wa.me/918979612593";
const PHONE = "+91 89796 12599";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDateIndian(d: Date) {
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

function playCrystalSound() {
  try {
    const ctx = new AudioContext();
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, t);
    osc.frequency.exponentialRampToValueAtTime(2400, t + 0.08);
    g.gain.setValueAtTime(0.15, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.45);
    const o2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    o2.type = "triangle";
    o2.frequency.setValueAtTime(1800, t);
    o2.frequency.exponentialRampToValueAtTime(3600, t + 0.05);
    g2.gain.setValueAtTime(0.08, t);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    o2.connect(g2).connect(ctx.destination);
    o2.start(t);
    o2.stop(t + 0.3);
  } catch { /* silent */ }
}

const BOT_REPLIES: { pattern: RegExp; reply: string }[] = [
  { pattern: /\b(namaste|namaskar|pranam)\b/i, reply: "Namaste! \u{1F64F} I'm Arawat's virtual assistant. Acharya Aarti has 7+ years of experience in astrology, numerology, and aura reading. How can I help you today?" },
  { pattern: /\b(hello|hi|hey|help)\b/i, reply: "Hello! Welcome to Arawat Occult Sciences. I can guide you on career, love, health, vastu, or any personal query. What would you like to know?" },
  { pattern: /\b(kundali|birth.?chart|janam|kundli)\b/i, reply: `Kundali Milan is one of our core services \u2014 Acharya Aarti reads your birth chart to find accurate timings and remedies. Would you like to book a consultation? Call us at ${PHONE}` },
  { pattern: /\b(career|job|business|work|professional)\b/i, reply: "Career feeling stuck? The Manipura chakra governs professional growth. Acharya Aarti can guide you with astrological remedies for career clarity. Book a session on WhatsApp!" },
  { pattern: /\b(love|relationship|marriage|partner|rishta)\b/i, reply: "Love and relationships are governed by the Anahata chakra. Whether it's compatibility issues or finding the right partner, Acharya Aarti provides personalized remedies. Shall I connect you on WhatsApp?" },
  { pattern: /\b(vastu|home|house|office|ghar)\b/i, reply: `Astro-Vastu guidance aligns your home/office energy with cosmic forces. Acharya Aarti combines traditional vastu with astrological insights. Call ${PHONE} to consult.` },
  { pattern: /\b(health|well|sick|wellness|sehat)\b/i, reply: "Health and well-being connect to the Root chakra (Muladhara). Acharya Aarti offers energy readings and special chants for wellness. Want to book a consultation?" },
  { pattern: /\b(price|fee|cost|charge|kitna)\b/i, reply: `Consultation fees depend on the service type. For Open Query Hour (Tue/Thu/Sat, 3\u20134 PM), you can ask one question. For detailed sessions, please WhatsApp Acharya Aarti directly at ${PHONE}` },
  { pattern: /\b(phone|call|number|contact|reach)\b/i, reply: `You can reach Acharya Aarti at:\n\u{1F4DE} ${PHONE}\n\u{1F4AC} WhatsApp: ${WHATSAPP}\n\nOpen Query Hours: Tue, Thu, Sat \u2014 3:00 to 4:00 PM` },
];

function getBotReply(input: string): string {
  for (const r of BOT_REPLIES) {
    if (r.pattern.test(input)) return r.reply;
  }
  return `I can help you with astrology, kundali reading, vastu, career guidance, love & relationship advice, and more. You can also reach Acharya Aarti directly at ${PHONE}. What specific guidance are you looking for?`;
}

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

function Diamond({ color, active, visited }: { color: string; active: boolean; visited: boolean }) {
  const opacity = active ? 0.95 : visited ? 0.7 : 0.25;
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full transition-all duration-500"
      style={{
        filter: `drop-shadow(0 0 ${active ? 18 : visited ? 12 : 5}px ${color}) drop-shadow(0 0 ${active ? 6 : 2}px oklch(1 0 0 / 0.8))`,
        transform: active ? "scale(1.35)" : visited ? "scale(1.08)" : "scale(1)",
      }}
      aria-hidden
    >
      <g>
        <polygon points="20,38 80,38 50,88" fill={color} opacity={opacity} />
        <polygon points="20,38 50,88 35,38" fill="oklch(1 0 0 / 0.55)" opacity={active ? 1 : visited ? 0.5 : 0.15} />
        <polygon points="65,38 80,38 50,88" fill="oklch(0.2 0 0 / 0.35)" opacity={active ? 1 : visited ? 0.4 : 0.1} />
        <polygon points="34,14 66,14 80,38 20,38" fill={color} opacity={active ? 0.8 : visited ? 0.55 : 0.2} />
        <polygon points="34,14 66,14 58,38 42,38" fill="oklch(1 0 0 / 0.75)" opacity={active ? 1 : visited ? 0.5 : 0.12} />
        <polygon points="20,38 34,14 42,38" fill="oklch(1 0 0 / 0.35)" opacity={active ? 1 : visited ? 0.4 : 0.1} />
        <polygon points="58,38 66,14 80,38" fill="oklch(0.2 0 0 / 0.25)" opacity={active ? 1 : visited ? 0.35 : 0.08} />
      </g>
    </svg>
  );
}

function AIBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Namaste! \u{1F64F} I'm Arawat's virtual guide. Ask me anything about astrology, numerology, vastu, or book a consultation with Acharya Aarti." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [msgs]);

  const send = (text?: string) => {
    const q = (text || input).trim();
    if (!q) return;
    setMsgs((m) => [...m, { from: "user", text: q }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: getBotReply(q) }]);
      setTyping(false);
    }, 600 + Math.random() * 800);
  };

  const quickReplies = ["Career guidance", "Kundali reading", "Vastu help", "Phone number"];

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-20 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
        style={{ background: "linear-gradient(135deg, oklch(0.82 0.15 85), oklch(0.65 0.24 305))", boxShadow: "0 4px 20px oklch(0.82 0.15 88 / 0.5)" }}
        aria-label="Chat with Arawat AI assistant"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9z" /></svg>
        )}
      </button>

      {open && (
        <div className="fixed bottom-36 right-6 z-50 flex w-80 flex-col overflow-hidden rounded-2xl border border-gold/30" style={{ background: "linear-gradient(160deg, oklch(0.22 0.08 300 / 0.97), oklch(0.16 0.06 300 / 0.97))", boxShadow: "0 20px 60px -15px oklch(0 0 0 / 0.8)" }}>
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: "linear-gradient(135deg, oklch(0.82 0.15 85 / 0.2), oklch(0.65 0.24 305 / 0.15))" }}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-gold text-sm font-bold">A</div>
            <div>
              <p className="text-sm font-semibold text-foreground">Arawat AI Guide</p>
              <p className="text-xs text-gold/70">Acharya Aarti's assistant</p>
            </div>
            <span className="ml-auto h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3" style={{ maxHeight: "320px" }}>
            {msgs.map((m, i) => (
              <div key={i} className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${m.from === "user" ? "ml-auto bg-primary/20 text-foreground" : "bg-white/5 text-foreground"}`}>
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="max-w-[85%] rounded-xl bg-white/5 px-3 py-2 text-sm text-muted-foreground animate-pulse">
                Typing...
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 px-3 pt-2">
            {quickReplies.map((q) => (
              <button key={q} onClick={() => send(q)} className="rounded-full border border-gold/25 px-2.5 py-0.5 text-[10px] text-gold/80 transition-colors hover:bg-gold/10">{q}</button>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2 border-t border-border/30 p-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your question..." className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/50" />
            <button type="submit" className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/80 text-primary-foreground transition-transform hover:scale-105" aria-label="Send">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}

function Index() {
  const [active, setActive] = useState(1);
  const [visited, setVisited] = useState<Set<number>>(new Set([1]));
  const current = chakras[active] ?? chakras[1]!;

  const handleChakraTap = (i: number) => {
    setActive(i);
    setVisited((prev) => new Set(prev).add(i));
    playCrystalSound();
  };

  return (
    <main className="relative">
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
              onClick={() => handleChakraTap(i)}
              aria-label={`${c.label} chakra — ${c.theme}`}
              aria-pressed={active === i}
              className="absolute left-1/2 z-20 h-8 w-8 -translate-x-1/2 -translate-y-1/2 outline-none focus-visible:ring-2 focus-visible:ring-gold"
              style={{
                top: c.top,
                animation: active === i ? "float-slow 3s ease-in-out infinite" : undefined,
              }}
            >
              <Diamond color={c.color} active={active === i} visited={visited.has(i)} />
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
            ✦ {visited.size} of 7 diamonds explored ✦
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
            href={`${WHATSAPP}?text=${encodeURIComponent(`Namaste Acharya Aarti, mujhe ${current.theme} ke baare me guidance chahiye.\n\n📅 Date: ${formatDateIndian(new Date())}`)}`}
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
              onClick={() => handleChakraTap(i)}
              aria-label={`Show ${c.theme}`}
              aria-pressed={active === i}
              className="h-8 w-8 outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Diamond color={c.color} active={active === i} visited={visited.has(i)} />
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
                ``,
                `📅 *Requested on:* ${formatDateIndian(new Date())}`,
              ]
                .filter(Boolean)
                .join("\n");

              window.open(`https://wa.me/918979612593?text=${encodeURIComponent(msg)}`, "_blank");
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

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110 hover:shadow-[0_0_24px_#25D36680]"
      >
        <svg viewBox="0 0 24 24" fill="white" className="h-7 w-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

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

      <AIBot />
    </main>
  );
}
