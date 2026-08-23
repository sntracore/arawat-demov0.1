import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useRef, useEffect } from "react";
import chakraFigure from "@/assets/chakra-figure.jpg";
import arawatLogo from "@/assets/arawat-logo.png";
import { translations, type Lang } from "@/lib/translations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arawat Occult Sciences | Tap Your Chakras, Find Clarity" },
      {
        name: "description",
        content:
          "Interactive chakra guide & authentic Lal Kitab remedies by Acharya Aarti — astrology, numerology, astro-vastu, aura scanning. Tap each chakra to hear its mantra and find your upay.",
      },
      { property: "og:title", content: "Arawat Occult Sciences" },
      {
        property: "og:description",
        content: "Tap each chakra to hear its voice and discover your guidance. 7+ years of occult sciences with Acharya Aarti.",
      },
      { property: "og:image", content: "/card1.jpeg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#170d26" },
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

let audioCtx: AudioContext | null = null;

function playChakraVoice(c: { freq: number; voice: string }) {
  try {
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === "suspended") void audioCtx.resume();
    const ctx = audioCtx;
    const t = ctx.currentTime;
    const harmonics: [number, number][] = [[1, 0.14], [1.5, 0.06], [2, 0.05], [2.997, 0.028]];
    for (const [mult, vol] of harmonics) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = c.freq * mult;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.12);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 3.4);
      osc.connect(g).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 3.6);
    }
    const sp = ctx.createOscillator();
    const sg = ctx.createGain();
    sp.type = "triangle";
    sp.frequency.setValueAtTime(1800, t);
    sp.frequency.exponentialRampToValueAtTime(3600, t + 0.06);
    sg.gain.setValueAtTime(0.06, t);
    sg.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    sp.connect(sg).connect(ctx.destination);
    sp.start(t);
    sp.stop(t + 0.35);
  } catch { /* silent */ }

  try {
    const a = new Audio(c.voice);
    a.volume = 0.74;
    void a.play().catch(() => {});
  } catch { /* silent */ }
}

const BOT_REPLIES: { pattern: RegExp; reply: string }[] = [
  { pattern: /\b(namaste|namaskar|pranam)\b/i, reply: "Namaste! \u{1F64F} I'm Arawat's virtual assistant. Acharya Aarti has 7+ years of experience in astrology, numerology, and aura reading. How can I help you today?" },
  { pattern: /\b(lal\s*kitab|red\s*book|upay|totka|totke|farman)\b/i, reply: `Lal Kitab is a distinctive system of astrological guidance known for practical, simple remedies matched to your horoscope. The same remedy is not for everyone \u2014 Acharya Aarti considers your chart, life circumstances and concern before suggesting personalised guidance. Ask her on WhatsApp: ${WHATSAPP}` },
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

type Chakra = {
  name: string;
  label: string;
  top: string;
  color: string;
  mantra: string;
  glyph: string;
  freq: number;
  voice: string;
  element: string;
  theme: string;
  line: string;
  services: string[];
};

const chakras: Chakra[] = [
  {
    name: "Sahasrara",
    label: "Crown",
    top: "44.6%",
    color: "oklch(0.65 0.24 305)",
    mantra: "Aum",
    glyph: "\u0950",
    freq: 963,
    voice: "/voices/aum.mp3",
    element: "Cosmic Consciousness",
    theme: "Spiritual Guidance & Remedies",
    line: "Jab sab kuch theek lagta hai par mann khaali — yahan se path khulta hai.",
    services: ["Spiritual Guidance & Remedies", "Any Personal Query"],
  },
  {
    name: "Ajna",
    label: "Third Eye",
    top: "48.4%",
    color: "oklch(0.55 0.2 270)",
    mantra: "Om",
    glyph: "\u0950",
    freq: 852,
    voice: "/voices/om.mp3",
    element: "Light / Intuition",
    theme: "Astrology & Kundali Reading",
    line: "Aapki janm kundali ka blueprint — timing, dasha aur sahi decision.",
    services: ["Kundali Milan", "Marriage & Compatibility", "Numerology & Name Analysis"],
  },
  {
    name: "Vishuddha",
    label: "Throat",
    top: "52.6%",
    color: "oklch(0.7 0.15 230)",
    mantra: "Ham",
    glyph: "\u0939\u0902",
    freq: 741,
    voice: "/voices/ham.mp3",
    element: "Ether / Sound",
    theme: "Open Query Hour",
    line: "Ek sawaal, ek baat-cheet, thodi aur clarity.",
    services: ["Open Query Hour", "Mobile Number & Wallpaper Analysis"],
  },
  {
    name: "Anahata",
    label: "Heart",
    top: "57.3%",
    color: "oklch(0.75 0.18 150)",
    mantra: "Yam",
    glyph: "\u092F\u0902",
    freq: 639,
    voice: "/voices/yam.mp3",
    element: "Air",
    theme: "Love, Relationship & Family",
    line: "Rishton ki uljhan ke peeche hamesha ek energy pattern hota hai.",
    services: ["Love & Relationship", "Family Matters", "Special Chant for Healthy Relationships"],
  },
  {
    name: "Manipura",
    label: "Solar Plexus",
    top: "62%",
    color: "oklch(0.85 0.17 90)",
    mantra: "Ram",
    glyph: "\u0930\u0902",
    freq: 528,
    voice: "/voices/ram.mp3",
    element: "Fire",
    theme: "Career, Business & Money",
    line: "Mehnat poori, result adhoora? Yeh chakra usi block ki baat karta hai.",
    services: ["Career & Professional Life", "Business & Financial Growth", "Special Chant for Money Attraction"],
  },
  {
    name: "Svadhisthana",
    label: "Sacral",
    top: "66.8%",
    color: "oklch(0.72 0.19 55)",
    mantra: "Vam",
    glyph: "\u0935\u0902",
    freq: 417,
    voice: "/voices/vam.mp3",
    element: "Water",
    theme: "Children & Learning",
    line: "Bachchon ka focus, wellness aur unki apni speed.",
    services: ["Children's Concentration & Focus Mantras", "Children Wellness Guidance"],
  },
  {
    name: "Muladhara",
    label: "Root",
    top: "77.2%",
    color: "oklch(0.6 0.22 25)",
    mantra: "Lam",
    glyph: "\u0932\u0902",
    freq: 396,
    voice: "/voices/lam.mp3",
    element: "Earth",
    theme: "Home, Vastu & Well-being",
    line: "Ghar ki disha theek, toh jeevan ki dhara theek.",
    services: ["Astro-Vastu Guidance", "Aura & Energy Reading", "Special Chant for Health & Well-being"],
  },
];

const allServices = [
  "Children's Concentration & Focus Mantras",
  "Children Wellness Guidance",
  "Family Matters",
  "Career & Professional Life",
  "Business & Financial Growth",
  "Astro-Vastu Guidance",
  "Love & Relationship",
  "Kundali Milan",
  "Marriage & Compatibility",
  "Numerology & Name Analysis",
  "Mobile Number & Wallpaper Analysis",
  "Aura & Energy Reading",
  "Special Chant for Money Attraction",
  "Special Chant for Healthy Relationships",
  "Special Chant for Health & Well-being",
  "Spiritual Guidance & Remedies",
  "Lal Kitab Remedies & Upay",
  "Open Query Hour",
  "Any Personal Query",
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What exactly is Lal Kitab?",
    a: "Lal Kitab, commonly associated with Pandit Roop Chand Joshi, is a distinctive system of astrology known for its practical and often simple remedial measures. Originally published in Urdu in a series of volumes during the mid-20th century, it combines astrological principles with an unusual remedial approach. While some remedies are traditionally prescribed for a fixed period \u2014 often 43 days \u2014 this is not a universal rule; duration and method depend on the specific remedy and the individual horoscope.",
  },
  {
    q: "How do I book a consultation?",
    a: `The fastest way is the booking form below or a direct WhatsApp message. You can also call ${PHONE} during Open Query Hours (Tue, Thu, Sat \u2014 3 to 4 PM) for one quick question.`,
  },
  {
    q: "What details should I keep ready?",
    a: "Your full name, date of birth, and \u2014 if known \u2014 your exact birth time and place of birth. The more precise your birth time, the sharper the reading.",
  },
  {
    q: "Is everything I share confidential?",
    a: "Absolutely. Every conversation, chart and reading stays strictly between you and Acharya Aarti. 100% confidentiality is the foundation of this practice.",
  },
  {
    q: "What happens during Open Query Hour?",
    a: "You bring one question \u2014 career, relationship, health or home \u2014 and receive a focused answer with a simple remedy. No long session needed, just clarity.",
  },
  {
    q: "Do the remedies really work?",
    a: "Remedies here are personalised mantras, chants and energy alignments matched to your chart and chakra state. They are gentle practices meant to be followed consistently \u2014 most clients feel the shift within weeks.",
  },
];

const NAV_LINKS: [string, string][] = [
  ["Chakras", "#chakras"],
  ["Services", "#services"],
  ["Lal Kitab", "#lalkitab"],
  ["Query Hour", "#query"],
  ["About", "#about"],
  ["FAQ", "#faq"],
  ["Book", "#book"],
];

const LAL_KITAB_PILLARS = [
  ["Understand the Pattern", "Planetary positions and house influences are read together to see the underlying pattern."],
  ["Analyse the Horoscope", "Your birth chart is studied in detail \u2014 houses, placements and current concerns."],
  ["Identify the Concern", "Whether relationship, marriage, career, finances or family \u2014 the focus stays on your question."],
  ["Personalised Guidance", "Simple, practical remedies are suggested as per your chart \u2014 no one-size-fits-all."],
];

const LAL_KITAB_UPAY = [
  "Feed green fodder to a cow",
  "Offer roti to stray dogs",
  "Donate mustard oil on Saturdays",
  "Flow a coconut in running water",
  "Donate a black blanket",
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
          color: colors[Math.floor(Math.random() * colors.length)]!,
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

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className ?? ""}`}>
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div className="relative z-10 mx-auto mt-24 flex max-w-md items-center gap-4 px-6 text-gold/50" aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
      <span className="text-lg">✦</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
    </div>
  );
}

const ZODIAC = ["\u2648\uFE0E", "\u2649\uFE0E", "\u264A\uFE0E", "\u264B\uFE0E", "\u264C\uFE0E", "\u264D\uFE0E", "\u264E\uFE0E", "\u264F\uFE0E", "\u2650\uFE0E", "\u2651\uFE0E", "\u2652\uFE0E", "\u2653\uFE0E"];

const HERO_CHIPS = ["Astrology", "Numerology", "Astro-Vastu", "Aura Scanning"];

const HERO_STATS = [
  ["7+", "Years Experience"],
  ["18", "Guidance Services"],
  ["100%", "Confidential"],
];

function ZodiacWheel() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 m-auto h-[min(130vmin,980px)] w-[min(130vmin,980px)]"
      style={{ animation: "spin-slow 160s linear infinite" }}
    >
      <svg viewBox="0 0 400 400" className="h-full w-full">
        <circle cx="200" cy="200" r="196" fill="none" stroke="oklch(0.85 0.15 88 / 0.3)" strokeWidth="0.6" strokeDasharray="2 7" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="oklch(0.85 0.15 88 / 0.2)" strokeWidth="0.5" />
        {ZODIAC.map((g, i) => {
          const a = ((i * 30 - 90) * Math.PI) / 180;
          return (
            <text
              key={g}
              x={(200 + 173 * Math.cos(a)).toFixed(2)}
              y={(200 + 173 * Math.sin(a)).toFixed(2)}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="15"
              fontFamily="var(--font-body), serif"
              fill="oklch(0.92 0.08 92 / 0.85)"
            >
              {g}
            </text>
          );
        })}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={(200 + 150 * Math.cos(a)).toFixed(2)}
              y1={(200 + 150 * Math.sin(a)).toFixed(2)}
              x2={(200 + 196 * Math.cos(a)).toFixed(2)}
              y2={(200 + 196 * Math.sin(a)).toFixed(2)}
              stroke="oklch(0.85 0.15 88 / 0.22)"
              strokeWidth="0.5"
            />
          );
        })}
      </svg>
    </div>
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
        className="fixed bottom-20 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
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
        <div className="fixed bottom-36 left-6 z-50 flex w-80 flex-col overflow-hidden rounded-2xl border border-gold/30 backdrop-blur-md" style={{ background: "linear-gradient(160deg, oklch(0.22 0.08 300 / 0.97), oklch(0.16 0.06 300 / 0.97))", boxShadow: "0 20px 60px -15px oklch(0 0 0 / 0.8)" }}>
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
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("arawat-lang") as Lang | null;
      if (saved === "en" || saved === "hi") return saved;
      return navigator.language.startsWith("hi") ? "hi" : "en";
    }
    return "en";
  });
  useEffect(() => {
    localStorage.setItem("arawat-lang", lang);
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
  }, [lang]);
  const t = translations[lang];

  const [active, setActive] = useState(1);
  const [visited, setVisited] = useState<Set<number>>(new Set([1]));
  const current = chakras[active] ?? chakras[1]!;

  const handleChakraTap = (i: number) => {
    setActive(i);
    setVisited((prev) => new Set(prev).add(i));
    playChakraVoice(chakras[i]!);
    navigator.vibrate?.(15);
  };

  return (
    <main id="top" className="relative">
      <div className="starfield" aria-hidden />
      <div className="starfield-slow" aria-hidden />

      {/* Nav */}
      <nav
        className="fixed inset-x-0 top-0 z-40 border-b border-gold/15 backdrop-blur-md"
        style={{ background: "oklch(0.16 0.06 300 / 0.55)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
          <a href="#top" className="flex items-center gap-3">
            <img src="/elephant-logo.jpg" alt="Arawat Occult Sciences" className="h-9 w-9 rounded-full border border-gold/40 object-cover shadow-glow transition-transform duration-200 hover:scale-110" />
            <span className="font-display hidden text-sm tracking-[0.3em] text-gradient-gold sm:inline">ARAWAT</span>
          </a>
          <div className="ml-auto flex flex-wrap items-center justify-end gap-2 text-[11px] uppercase tracking-[0.18em] text-gold/80">
            <div className="hidden items-center gap-x-4 sm:flex">
              <a href="#chakras" className="font-display transition-colors hover:text-gold">{t.nav.chakras}</a>
              <a href="#services" className="font-display transition-colors hover:text-gold">{t.nav.services}</a>
              <a href="#lalkitab" className="font-display transition-colors hover:text-gold">{t.nav.lalkitab}</a>
              <a href="#query" className="font-display transition-colors hover:text-gold">{t.nav.query}</a>
              <a href="#about" className="font-display transition-colors hover:text-gold">{t.nav.about}</a>
              <a href="#faq" className="font-display transition-colors hover:text-gold">{t.nav.faq}</a>
              <a href="#book" className="font-display transition-colors hover:text-gold">{t.nav.book}</a>
            </div>
            <div className="ml-1 flex items-center rounded-full border border-gold/40 p-1 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest transition-colors ${lang === "en" ? "bg-gold text-background" : "text-gold/70 hover:text-gold"}`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("hi")}
                aria-pressed={lang === "hi"}
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest transition-colors ${lang === "hi" ? "bg-gold text-background" : "text-gold/70 hover:text-gold"}`}
              >
                हिं
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Video hero */}
      <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden py-24">
        <video
          className="hero-video absolute inset-0 h-full w-full object-cover"
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
              "radial-gradient(75% 55% at 50% 45%, oklch(0.1 0.03 300 / 0.55), oklch(0.09 0.03 300 / 0.92) 85%), linear-gradient(180deg, oklch(0.11 0.05 300 / 0.6) 0%, transparent 30% 70%, oklch(0.11 0.05 300) 100%)",
          }}
          aria-hidden
        />
        <ZodiacWheel />

        <div className="relative z-10 flex flex-col items-center gap-5 px-6 pt-14 text-center">
          <p className="flex items-center justify-center gap-4 font-display text-base text-gold/90">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" aria-hidden />
            <span className="text-2xl [text-shadow:0_0_18px_oklch(0.85_0.15_88/0.7)]">ॐ</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" aria-hidden />
          </p>
          <h1 className="text-5xl leading-tight font-bold italic sm:text-7xl lg:text-8xl">
            <span className="text-gradient-gold text-shimmer">ARAWAT</span>
            <span className="mt-2 block text-xl font-medium tracking-[0.35em] text-muted-foreground sm:text-2xl">
              OCCULT SCIENCES
            </span>
          </h1>

          <div className="mt-1 flex flex-wrap items-center justify-center gap-2.5">
            {t.hero.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-gold/30 bg-white/[0.04] px-4 py-1.5 text-[11px] tracking-[0.2em] text-gold-soft uppercase backdrop-blur-sm sm:text-xs"
              >
                <span className="mr-1.5 text-gold/60">✦</span>
                {chip}
              </span>
            ))}
          </div>

          <p className="max-w-xl text-xl text-muted-foreground italic sm:text-2xl font-display">
            {t.hero.tagline}
          </p>
          <p className="text-xs tracking-[0.3em] text-gold-soft/80 uppercase">
            {t.hero.guidedBy}
          </p>

          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#chakras"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-primary-foreground uppercase shadow-glow transition-transform duration-200 hover:scale-105"
            >
              {t.hero.explore}
            </a>
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-8 py-3.5 text-xs tracking-[0.2em] text-gold uppercase transition-all duration-200 hover:scale-105 hover:bg-gold/10"
            >
              {t.hero.bookConsult}
            </a>
          </div>

          <dl className="mt-8 grid w-full max-w-2xl grid-cols-3 divide-x divide-gold/15 rounded-2xl border border-gold/20 bg-white/[0.03] py-5 backdrop-blur-md">
            {t.hero.stats.map(([num, label]) => (
              <div key={label} className="px-3">
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-2xl font-bold text-gradient-gold sm:text-3xl">{num}</dd>
                <dd className="mt-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase sm:text-[11px]">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <a
          href="#chakras"
          aria-label="Scroll down to your seven chakras"
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center text-gold/70 transition-colors hover:text-gold"
        >
          <span className="block text-[10px] tracking-[0.35em] uppercase">{t.hero.scroll}</span>
          <span className="scroll-cue mt-1 block text-lg" aria-hidden>▾</span>
        </a>
      </section>

      {/* Header */}
      <header
        id="chakras"
        className="relative z-10 mx-auto flex max-w-6xl scroll-mt-24 flex-col items-center gap-3 px-6 pt-20 text-center"
      >
        <Reveal>
          <h2 className="text-3xl text-gradient-gold sm:text-4xl">{t.diamonds.title}</h2>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground italic">
            {t.diamonds.subtitle}
          </p>
          <div className="mt-4 flex justify-center">
            <span className="rounded-full border border-gold/40 px-4 py-1 text-xs tracking-widest text-gold uppercase">
              {t.diamonds.experience}
            </span>
          </div>
        </Reveal>
      </header>

      {/* Interactive chakra */}
      <section className="relative z-10 mx-auto mt-14 grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[1fr_1fr]">
        <Reveal>
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
                aria-label={`${c.label} chakra — chant ${c.mantra} — ${c.theme}`}
                aria-pressed={active === i}
                className="absolute left-1/2 z-20 h-8 w-8 -translate-x-1/2 -translate-y-1/2 outline-none transition-transform duration-300 hover:scale-125 focus-visible:ring-2 focus-visible:ring-gold"
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
                <span
                  className="pointer-events-none absolute top-full left-1/2 mt-1 -translate-x-1/2 whitespace-nowrap rounded-full border border-gold/25 px-2 py-0.5 text-[9px] uppercase tracking-widest opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ color: c.color, background: "oklch(0.16 0.06 300 / 0.8)", opacity: active === i ? 1 : undefined }}
                >
                  {c.mantra}
                </span>
              </button>
            ))}
            <p className="mt-4 text-center text-sm tracking-wider text-muted-foreground">
              {t.diamonds.explored(visited.size)}
            </p>
            <p className="mt-1 text-center text-xs tracking-widest text-gold/70 uppercase">
              {t.diamonds.voiceHint}
            </p>
          </div>
        </Reveal>

        <article
          key={current.name}
          className="animate-fade-in surface-card relative overflow-hidden rounded-3xl p-8"
          style={{ boxShadow: `0 0 60px -30px ${current.color}` }}
        >
          <span
            className="pointer-events-none absolute -right-4 -top-8 text-[10rem] leading-none opacity-[0.07]"
            style={{ color: current.color }}
            aria-hidden
          >
            {current.glyph}
          </span>
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: current.color }}
          >
            {current.label} Chakra
          </span>
          <h2 className="mt-2 text-3xl text-gradient-gold">{current.name}</h2>
          <p className="mt-1 text-lg text-foreground">{current.theme}</p>
          <p className="mt-4 text-lg text-muted-foreground italic">{current.line}</p>

          <div
            className="mt-6 flex items-center gap-4 rounded-2xl border px-5 py-4"
            style={{ borderColor: `${current.color}44`, background: `linear-gradient(135deg, ${current.color}14, transparent)` }}
          >
            <span className="text-4xl leading-none" style={{ color: current.color, textShadow: `0 0 18px ${current.color}` }} aria-hidden>
              {current.glyph}
            </span>
            <div>
              <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">{t.diamonds.bija}</p>
              <p className="text-xl font-semibold" style={{ color: current.color }}>
                “{current.mantra}” · {current.freq} Hz
              </p>
            </div>
            <span className="ml-auto hidden text-xs text-muted-foreground sm:block">{t.diamonds.voiceOnTap}</span>
          </div>

          <p className="mt-5 text-xs tracking-[0.25em] text-muted-foreground uppercase">{t.diamonds.element} · {current.element}</p>

          <ul className="mt-4 space-y-3">
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
            {t.diamonds.askWhats}
          </a>
        </article>
      </section>

      <Divider />

      {/* Services */}
      <section id="services" className="relative z-10 mx-auto mt-4 max-w-5xl scroll-mt-24 px-6">
        <Reveal>
          <h2 className="text-center text-3xl text-gradient-gold sm:text-4xl">{t.services.title}</h2>
          <p className="mt-3 text-center text-base text-muted-foreground">
            {t.services.highlightedFor}{" "}
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
                className="h-8 w-8 outline-none transition-transform duration-300 hover:scale-125 focus-visible:ring-2 focus-visible:ring-gold"
              >
                <Diamond color={c.color} active={active === i} visited={visited.has(i)} />
              </button>
            ))}
          </div>
        </Reveal>
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

      <Divider />

      {/* Lal Kitab */}
      <section id="lalkitab" className="relative z-10 mx-auto mt-4 max-w-5xl scroll-mt-24 px-6">
        <Reveal>
          <h2 className="text-center text-3xl text-gradient-gold sm:text-4xl">{t.lalkitab.title}</h2>
          <p className="mt-2 text-center font-display text-xs tracking-[0.32em] text-gold/90 uppercase">{t.lalkitab.subtitle}</p>
          <p className="mt-3 text-center text-base text-muted-foreground italic">
            {t.lalkitab.desc}
          </p>
        </Reveal>
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[auto_1fr]">
          <Reveal>
            <div
              className="group relative mx-auto h-72 w-52 -rotate-6 rounded-r-xl rounded-l-sm border border-gold/50 shadow-glow transition-transform duration-500 hover:rotate-0"
              style={{ background: "linear-gradient(140deg, oklch(0.48 0.19 25), oklch(0.33 0.16 18))" }}
              aria-hidden
            >
              <span className="absolute inset-y-0 left-0 w-3 rounded-l-sm bg-black/40" />
              <span className="pointer-events-none absolute inset-y-1 right-2 w-px bg-white/10" />
              <span
                className="pointer-events-none absolute inset-y-1 right-3.5 w-0.5 opacity-60"
                style={{ background: "repeating-linear-gradient(180deg, oklch(0.9 0.05 90 / 0.35) 0 2px, transparent 2px 5px)" }}
              />
              <span className="absolute inset-2 rounded-md border border-gold/30" />
              <div className="relative flex h-full flex-col items-center justify-center gap-2 px-8 text-center">
                <span className="font-display text-lg tracking-[0.25em] text-gradient-gold">LAL KITAB</span>
                <span className="text-xl text-red-100/85">लाल किताब</span>
                <span className="mt-2 text-[9px] tracking-[0.28em] text-gold-soft/80 uppercase">
                  Pt. Roop Chand Joshi<br />1939 – 1952
                </span>
                <span className="mt-3 font-display text-sm text-gold/70">✦ ✦ ✦</span>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
              <p className="font-display text-sm tracking-[0.2em] text-gold/90 uppercase">{t.lalkitab.pLead}</p>
              <p>{t.lalkitab.p1}</p>
              <p>{t.lalkitab.p2}</p>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <p className="mt-10 text-center font-display text-sm tracking-[0.3em] text-gradient-gold uppercase">{t.lalkitab.personalisedHeading}</p>
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
            {t.lalkitab.personalisedDesc}
          </p>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.lalkitab.pillars.map(([title, desc]) => (
              <div key={title} className="surface-card rounded-2xl px-5 py-6 text-center transition-transform duration-300 hover:-translate-y-1">
                <dt className="font-display flex flex-col items-center gap-2 text-xs tracking-[0.18em] text-gold uppercase">
                  <span aria-hidden className="text-base">✦</span>
                  {title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-gold/20 bg-white/[0.03] px-5 py-4 text-center">
              <p className="font-display text-xs tracking-[0.2em] text-gold uppercase">{t.lalkitab.noComplex[0]}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.lalkitab.noComplex[1]}</p>
            </div>
            <div className="rounded-2xl border border-gold/20 bg-white/[0.03] px-5 py-4 text-center">
              <p className="font-display text-xs tracking-[0.2em] text-gold uppercase">{t.lalkitab.noOneSize[0]}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.lalkitab.noOneSize[1]}</p>
            </div>
            <div className="rounded-2xl border border-gold/20 bg-white/[0.03] px-5 py-4 text-center">
              <p className="font-display text-xs tracking-[0.2em] text-gold uppercase">{t.lalkitab.noExaggerated[0]}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t.lalkitab.noExaggerated[1]}</p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="surface-card mt-6 rounded-3xl p-8 text-center sm:p-10">
            <p className="text-xs tracking-[0.3em] text-gold/80 uppercase">{t.lalkitab.farmansTitle}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              {LAL_KITAB_UPAY.map((u) => (
                <span key={u} className="rounded-full border border-gold/30 bg-white/[0.04] px-4 py-1.5 text-xs text-gold-soft sm:text-sm">
                  {u}
                </span>
              ))}
              <span className="rounded-full border border-dashed border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-gold sm:text-sm">{t.lalkitab.andManyMore}</span>
            </div>
            <a
              href={`${WHATSAPP}?text=${encodeURIComponent(`Namaste Acharya Aarti, mujhe Lal Kitab ke upay aur apni kundali ke remedies jaanne hain.\n\n📅 Date: ${formatDateIndian(new Date())}`)}`}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-xs font-semibold tracking-[0.2em] text-primary-foreground uppercase shadow-glow transition-transform duration-200 hover:scale-105"
            >
              {t.lalkitab.askRemedy}
            </a>
            <p className="mx-auto mt-5 max-w-xl text-xs leading-relaxed text-muted-foreground/70">
              {t.lalkitab.bottomNote}
            </p>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* Query hour */}
      <section id="query" className="relative z-10 mx-auto mt-4 max-w-3xl scroll-mt-24 px-6">
        <Reveal>
          <div className="surface-card rounded-3xl p-10 text-center">
            <h2 className="text-2xl text-gold sm:text-3xl">{t.query.title}</h2>
            <p className="mt-3 text-lg tracking-wide">{t.query.days}</p>
            <p className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-lg font-semibold text-primary-foreground">
              {t.query.time}
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
              {t.query.oneQuestion}
            </p>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* About */}
      <section id="about" className="relative z-10 mx-auto mt-4 max-w-4xl scroll-mt-24 px-6">
        <Reveal>
          <div className="surface-card rounded-3xl p-10 sm:p-12">
            <h2 className="text-center text-3xl text-gradient-gold sm:text-4xl">{t.about.title}</h2>
            <div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
              <img
                src={arawatLogo}
                alt="Arawat Occult Sciences emblem"
                width={112}
                height={112}
                loading="lazy"
                className="h-28 w-28 shrink-0 rounded-full border border-gold/40 object-cover shadow-glow"
              />
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Acharya Aarti</span> {t.about.p1}
                </p>
                <p>{t.about.p2}</p>
              </div>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              {t.about.stats.map(([num, label]) => (
                <div key={label} className="rounded-2xl border border-gold/20 bg-white/[0.03] px-3 py-5">
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-2xl font-bold text-gradient-gold sm:text-3xl">{num}</dd>
                  <dd className="mt-1 text-[11px] tracking-widest text-muted-foreground uppercase">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* Testimonials */}
      <section className="relative z-10 mx-auto mt-4 max-w-3xl px-6">
        <Reveal>
          <h2 className="text-center text-3xl text-gradient-gold sm:text-4xl">{t.testimonials.title}</h2>
          <p className="mt-3 text-center text-base text-muted-foreground italic">
            {t.testimonials.subtitle}
          </p>
        </Reveal>
        <Reveal>
          <div className="surface-card relative mt-10 overflow-hidden rounded-3xl p-12 text-center sm:p-14">
            <span className="pointer-events-none absolute -top-6 left-6 text-[7rem] leading-none text-gold/10" aria-hidden>“</span>
            <span className="pointer-events-none absolute -bottom-12 right-6 text-[7rem] leading-none text-gold/10" aria-hidden>”</span>
            <p className="text-gradient-gold text-shimmer font-display inline-block rounded-full border border-gold/40 bg-gold/5 px-6 py-1.5 text-[11px] tracking-[0.35em] uppercase">
              {t.testimonials.comingSoon}
            </p>
            <p className="mx-auto mt-7 max-w-md text-lg italic leading-relaxed text-muted-foreground">
              {t.testimonials.para}
            </p>
            <div className="mt-7 flex items-center justify-center gap-3 text-gold/50" aria-hidden>
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
              <span className="font-display text-sm">✧</span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
            </div>
            <p className="mt-7 text-sm text-muted-foreground">{t.testimonials.firstStory}</p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-2.5 text-xs tracking-[0.2em] text-gold uppercase transition-all duration-200 hover:scale-105 hover:bg-gold/10"
            >
              {t.testimonials.share}
            </a>
          </div>
        </Reveal>
      </section>

      <Divider />

      {/* FAQ */}
      <section id="faq" className="relative z-10 mx-auto mt-4 max-w-3xl scroll-mt-24 px-6">
        <Reveal>
          <h2 className="text-center text-3xl text-gradient-gold sm:text-4xl">{t.faq.title}</h2>
          <p className="mt-3 text-center text-base text-muted-foreground italic">
            {t.faq.subtitle}
          </p>
        </Reveal>
        <div className="mt-10 space-y-4">
          {FAQS.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>
                {f.q}
                <span className="chev text-gold/70" aria-hidden>▾</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Visiting Cards */}
      <SparkleTrail>
        <section className="relative z-10 mx-auto mt-24 max-w-4xl px-6">
          <Reveal>
            <h2 className="text-center text-3xl text-gradient-gold sm:text-4xl">{t.cards.title}</h2>
            <p className="mt-3 text-center text-base text-muted-foreground italic">
              {t.cards.subtitle}
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col items-center gap-10 sm:flex-row sm:justify-center">
            {/* Card 1 — Front */}
            <div className="flip-card h-80 w-64 sm:h-96 sm:w-72 hover:scale-[1.03] transition-transform duration-300">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img
                    src="/card1.jpeg"
                    alt="Arawat Occult Sciences — Front"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flip-card-back">
                  <img
                    src="/card2.jpeg"
                    alt="Arawat Occult Sciences — Back"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Card 2 — Back */}
            <div className="flip-card h-80 w-64 sm:h-96 sm:w-72 hover:scale-[1.03] transition-transform duration-300">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img
                    src="/card2.jpeg"
                    alt="Arawat Occult Sciences — Back"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flip-card-back">
                  <img
                    src="/card1.jpeg"
                    alt="Arawat Occult Sciences — Front"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </SparkleTrail>

      {/* Consultation Form */}
      <section id="book" className="relative z-10 mx-auto mt-24 max-w-2xl scroll-mt-24 px-6">
        <Reveal>
          <div className="surface-card rounded-3xl p-10">
            <h2 className="text-center text-3xl text-gradient-gold sm:text-3xl">{t.booking.title}</h2>
            <p className="mt-3 text-center text-base text-muted-foreground italic">
              {t.booking.subtitle}
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

                window.open(`${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
              }}
              className="mt-8 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs tracking-widest text-gold uppercase">{t.booking.name} {t.booking.required}</label>
                  <input name="name" required className="form-input" placeholder={lang === "hi" ? "आपका नाम" : "Your name"} />
                </div>
                <div>
                  <label className="mb-1 block text-xs tracking-widest text-gold uppercase">{t.booking.phone} {t.booking.required}</label>
                  <input name="phone" required className="form-input" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs tracking-widest text-gold uppercase">{t.booking.dob} {t.booking.required}</label>
                  <input name="dob" type="date" required className="form-input" />
                </div>
                <div>
                  <label className="mb-1 block text-xs tracking-widest text-gold uppercase">{t.booking.birthTime}</label>
                  <input name="time" type="time" className="form-input" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs tracking-widest text-gold uppercase">{t.booking.birthPlace}</label>
                <input name="place" className="form-input" placeholder={lang === "hi" ? "शहर, राज्य" : "City, State"} />
              </div>
              <div>
                <label className="mb-1 block text-xs tracking-widest text-gold uppercase">{t.booking.service} {t.booking.required}</label>
                <select name="service" required className="form-input">
                  <option value="">{t.booking.selectService}</option>
                  {allServices.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs tracking-widest text-gold uppercase">{t.booking.query}</label>
                <textarea name="query" rows={3} className="form-input" placeholder={t.booking.queryPlaceholder} />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-primary-foreground uppercase transition-transform duration-200 hover:scale-[1.02]"
              >
                {t.booking.submit}
              </button>
            </form>
          </div>
        </Reveal>
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
          {t.footer.trusted.map((item) => (
            <span key={item} className="font-display text-xs tracking-[0.15em] uppercase">
              <span className="mr-1.5 text-gold/60">✦</span>
              {item}
            </span>
          ))}
        </div>
        <p className="mt-8 text-xs tracking-widest text-gold/70 uppercase">
          {t.footer.tagline}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-[11px] tracking-[0.2em] text-gold/55 uppercase">
          <a href="/disclaimer" className="transition-colors hover:text-gold">{t.footer.disclaimer}</a>
          <span className="text-gold/20">|</span>
          <a href="/terms" className="transition-colors hover:text-gold">{t.footer.terms}</a>
          <span className="text-gold/20">|</span>
          <a href="/privacy" className="transition-colors hover:text-gold">{t.footer.privacy}</a>
        </div>
        <p className="mx-auto mt-4 max-w-3xl text-[11px] leading-relaxed text-muted-foreground/55">
          {t.footer.disclaimerText}
        </p>
      </footer>

      <AIBot />
    </main>
  );
}
