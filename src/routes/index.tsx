import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useRef, useEffect } from "react";
import chakraFigure from "@/assets/chakra-figure.jpg";
import { translations, type Lang } from "@/lib/translations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arawat Occult Sciences | KP Astrology · Tap Your Chakras, Find Clarity" },
      {
        name: "description",
        content:
          "Interactive chakra guide & authentic Lal Kitab remedies by Acharya Aarti — KP Astrology, Prashna Kundali, Horary Astrology, numerology, astro-vastu, aura scanning. Tap each chakra to hear its ting and find your upay.",
      },
      { property: "og:title", content: "Arawat Occult Sciences" },
      {
        property: "og:description",
        content: "Tap each chakra to hear its ting and discover your guidance. 15+ years of occult sciences with Acharya Aarti — personalized golden report.",
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
const WHATSAPP2 = "https://wa.me/917906416125";
const PHONE = "              +91 89796 12593";
const PHONE2 = "+91 79064 16125";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDateIndian(d: Date) {
  return `${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
}

// ponytail: sound removed per client — no ting/om/voice on diamond tap or open
function playTing() {}
function playChakraVoice(_c: { freq: number; voice: string }) {}
function playOmOnOpen() {}

const BOT_REPLIES: { pattern: RegExp; reply: string }[] = [
  { pattern: /\b(namaste|namaskar|pranam)\b/i, reply: "Namaste! \u{1F64F} I'm Arawat's virtual assistant. Acharya Aarti has 7+ years of experience in astrology, numerology, and aura reading. How can I help you today?" },
  { pattern: /\b(lal\s*kitab|red\s*book|upay|totka|totke|farman)\b/i, reply: `Lal Kitab is a distinctive system of astrological guidance known for practical, simple remedies matched to your horoscope. The same remedy is not for everyone \u2014 Acharya Aarti considers your chart, life circumstances and concern before suggesting personalised guidance. Ask her on WhatsApp: ${WHATSAPP}` },
  { pattern: /\b(hello|hi|hey|help)\b/i, reply: "Hello! Welcome to Arawat Occult Sciences. I can guide you on career, love, health, vastu, or any personal query. What would you like to know?" },
  { pattern: /\b(kundali|birth.?chart|janam|kundli)\b/i, reply: `Kundali Milan is one of our core services \u2014 Acharya Aarti reads your birth chart to find accurate timings and remedies. Would you like to book a consultation? Call us at ${PHONE}` },
  { pattern: /\b(career|job|business|work|professional)\b/i, reply: "Career feeling stuck? The Manipura chakra governs professional growth. Acharya Aarti can guide you with astrological remedies for career clarity. Book a session on WhatsApp!" },
  { pattern: /\b(love|relationship|marriage|partner|rishta)\b/i, reply: "Love and relationships are governed by the Anahata chakra. Whether it's compatibility issues or finding the right partner, Acharya Aarti provides personalized remedies. Shall I connect you on WhatsApp?" },
  { pattern: /\b(vastu|home|house|office|ghar)\b/i, reply: `Astro-Vastu guidance aligns your home/office energy with cosmic forces. Acharya Aarti combines traditional vastu with astrological insights. Call ${PHONE} to consult.` },
  { pattern: /\b(health|well|sick|wellness|sehat)\b/i, reply: "Health and well-being connect to the Root chakra (Muladhara). Acharya Aarti offers energy readings and special chants for wellness. Want to book a consultation?" },
  { pattern: /\b(price|fee|cost|charge|kitna)\b/i, reply: `Consultation fees depend on the service type. For Open Query Hour (Tue/Thu/Sat 3–4 PM & Mon/Wed/Fri 5–6 PM), you can ask one question. For detailed sessions, please WhatsApp Acharya Aarti directly at ${PHONE}` },
  { pattern: /\b(phone|call|number|contact|reach)\b/i, reply: `You can reach Acharya Aarti at:\n\u{1F4DE} ${PHONE}\n\u{1F4AC} WhatsApp: ${WHATSAPP}\n\nOpen Query Hours: Tue/Thu/Sat 3–4 PM & Mon/Wed/Fri 5–6 PM` },
];

function getBotReply(input: string): string {
  for (const r of BOT_REPLIES) {
    if (r.pattern.test(input)) return r.reply;
  }
  return `I can help you with astrology, kundali reading, vastu, career guidance, love & relationship advice, and more. You can also reach Acharya Aarti directly at ${PHONE}. What specific guidance are you looking for?`;
}

type Chakra = {
  name: string;
  hindi: string;
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
  symptom: string;
};

const chakras: Chakra[] = [
  {
    name: "Sahasrara",
    hindi: "सहस्रार चक्र",
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
    symptom: "Symptom: feeling disconnected, lack of purpose — time to balance your Crown.",
  },
  {
    name: "Ajna",
    hindi: "आज्ञा चक्र",
    label: "Third Eye",
    top: "48.4%",
    color: "oklch(0.55 0.2 270)",
    mantra: "Om",
    glyph: "\u0950",
    freq: 852,
    voice: "/voices/om.mp3",
    element: "Light / Intuition",
    theme: "KP Astrology & Kundali Reading",
    line: "Aapki janm kundali ka blueprint — timing, dasha aur sahi decision.",
    services: ["Kundali Milan", "Marriage & Compatibility", "Numerology & Name Analysis"],
    symptom: "Symptom: confusion, indecision — balance your Third Eye for clarity.",
  },
  {
    name: "Vishuddha",
    hindi: "विशुद्धि चक्र",
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
    symptom: "Symptom: fear to speak, throat tightness — balance your Throat chakra.",
  },
  {
    name: "Anahata",
    hindi: "अनाहत चक्र",
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
    symptom: "Symptom: hurt, jealousy, loneliness — heal your Heart chakra.",
  },
  {
    name: "Manipura",
    hindi: "मणिपुर चक्र",
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
    symptom: "Symptom: low confidence, money blocks — power up your Solar Plexus.",
  },
  {
    name: "Svadhisthana",
    hindi: "स्वाधिष्ठान चक्र",
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
    symptom: "Symptom: creative block, emotional swings — balance your Sacral.",
  },
  {
    name: "Muladhara",
    hindi: "मूलाधार चक्र",
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
    symptom: "Symptom: insecurity, fatigue, restlessness — ground your Root chakra.",
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

const FAQS_EN: { q: string; a: string }[] = [
  {
    q: "Why Arawat Occult Sciences?",
    a: "At Arawat Occult Sciences, every chart is studied personally by Acharya Aarti, with 15+ years of experience in Occult Sciences. No generic advice, no copied remedies \u2014 only personalised analysis, clear guidance and a Golden Report prepared specifically for you.",
  },
  {
    q: "What exactly is Lal Kitab?",
    a: "Lal Kitab, commonly associated with Pandit Roop Chand Joshi, is a distinctive system of astrological guidance known for its practical and simple remedial approach. It offers a unique way of understanding planetary influences and suggests remedies based on an individual\u2019s horoscope. The remedies are selected according to the specific planetary influences and needs reflected in the chart.",
  },
  {
    q: "How do I book a consultation?",
    a: `The fastest way is the booking form below or a direct WhatsApp message. You can also call ${PHONE} during Open Query Hours (Tue/Thu/Sat 3\u20134 PM & Mon/Wed/Fri 5\u20136 PM) for one quick question. Your answer comes as a personalized golden report.`,
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
    a: "Open Query Hour \u2014 Tue/Thu/Sat 3\u20134 PM & Mon/Wed/Fri 5\u20136 PM \u2014 you bring one question \u2014 career, relationship, health or home \u2014 and receive a focused answer with a simple remedy. No long session needed, just clarity.",
  },
  {
    q: "Do the remedies really work?",
    a: "Yes, remedies are personalised according to your birth chart, planetary influences and energy needs. They may include specific mantras, chants, spiritual practices and energy-balancing techniques. These remedies are simple and gentle. The recommended remedies are explained clearly in your Personalised Golden Report.",
  },
];
const FAQS_HI: { q: string; a: string }[] = [
  { q: "आरावत ऑकल्ट साइंसेज़ क्यों?", a: "आरावत ऑकल्ट साइंसेज़ में हर कुंडली का अध्ययन आचार्य आरती व्यक्तिगत रूप से करती हैं, जिनके पास ऑकल्ट साइंसेज़ में 15+ वर्षों का अनुभव है। कोई सामान्य सलाह नहीं, कोई कॉपी किया हुआ उपाय नहीं — केवल व्यक्तिगत विश्लेषण, स्पष्ट मार्गदर्शन और विशेष रूप से आपके लिए तैयार की गई गोल्डन रिपोर्ट।" },
  { q: "लाल किताब क्या है?", a: "लाल किताब, जो सामान्यतः पंडित रूप चंद जोशी से जुड़ी है, एक विशिष्ट ज्योतिषीय मार्गदर्शन प्रणाली है जो अपने व्यावहारिक और सरल उपायों के लिए जानी जाती है। यह ग्रह प्रभावों को समझने का एक अनूठा तरीका प्रस्तुत करती है और व्यक्ति की कुंडली के आधार पर उपाय सुझाती है। उपाय कुंडली में दिखने वाले विशिष्ट ग्रह प्रभावों और आवश्यकताओं के अनुसार चुने जाते हैं।" },
  { q: "परामर्श कैसे बुक करें?", a: `सबसे तेज़ तरीका नीचे दिया गया फॉर्म या WhatsApp मैसेज है। आप ${PHONE} पर Open Query Hour (मंगल/गुरु/शनि 3–4 बजे और सोम/बुध/शुक्र 5–6 बजे) में एक प्रश्न पूछ सकते हैं। उत्तर व्यक्तिगत गोल्डन रिपोर्ट के रूप में मिलता है।` },
  { q: "कौन सी जानकारी तैयार रखें?", a: "पूरा नाम, जन्म तिथि, और यदि पता हो तो सटीक जन्म समय और स्थान। जन्म समय जितना सटीक, रीडिंग उतनी सटीक।" },
  { q: "क्या सब कुछ गोपनीय है?", a: "बिल्कुल। हर बातचीत, कुंडली और रीडिंग आपके और आचार्य आरती के बीच ही रहती है। 100% गोपनीयता इस साधना का आधार है।" },
  { q: "Open Query Hour में क्या होता है?", a: "Open Query Hour — मंगल/गुरु/शनि 3–4 PM और सोम/बुध/शुक्र 5–6 PM — एक प्रश्न लाइए, केंद्रित उत्तर और सरल उपाय पाइए।" },
  { q: "क्या उपाय सच में काम करते हैं?", a: "हाँ, उपाय आपकी जन्म कुंडली, ग्रह प्रभावों और ऊर्जा आवश्यकताओं के अनुसार व्यक्तिगत रूप से तैयार किए जाते हैं। इनमें विशिष्ट मंत्र, जाप, आध्यात्मिक साधनाएँ और ऊर्जा-संतुलन तकनीकें शामिल हो सकती हैं। ये उपाय सरल और सौम्य हैं। अनुशंसित उपाय आपकी Personalised Golden Report में स्पष्ट रूप से समझाए जाते हैं।" },
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

function GlobalCursorSparkle() {
  type Sparkle = { id: number; x: number; y: number; size: number; color: string; born: number; kind: "dot" | "star"; rot: number };
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);
  const colors = ["oklch(0.85 0.15 88)", "oklch(0.92 0.10 95)", "oklch(0.78 0.14 78)", "oklch(1 0.10 90)", "oklch(0.74 0.13 70)"];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let last = 0;
    const handler = (e: MouseEvent) => {
      const now = Date.now();
      if (now - last < 16) return;
      last = now;
      const x = e.clientX;
      const y = e.clientY;
      const next: Sparkle[] = [];
      // 2 golden dust + occasional star
      for (let i = 0; i < 2; i++) {
        next.push({
          id: idRef.current++,
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          size: Math.random() * 4 + 2.5,
          color: colors[Math.floor(Math.random() * colors.length)]!,
          born: now,
          kind: "dot",
          rot: Math.random() * 360,
        });
      }
      if (Math.random() < 0.28) {
        next.push({
          id: idRef.current++,
          x: x + (Math.random() - 0.5) * 28,
          y: y + (Math.random() - 0.5) * 28,
          size: Math.random() * 6 + 7,
          color: colors[Math.floor(Math.random() * colors.length)]!,
          born: now,
          kind: "star",
          rot: Math.random() * 360,
        });
      }
      setSparkles((prev) => {
        const merged = [...prev, ...next];
        return merged.length > 36 ? merged.slice(-36) : merged;
      });
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const t = Date.now();
        setSparkles((prev) => prev.filter((s) => t - s.born < 700));
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handler);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (sparkles.length === 0) return null;
  const now = Date.now();
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden>
      {sparkles.map((s) => {
        const age = (now - s.born) / 700;
        if (age >= 1) return null;
        if (s.kind === "star") {
          return (
            <span
              key={s.id}
              className="absolute select-none"
              style={{
                left: s.x,
                top: s.y,
                fontSize: s.size,
                lineHeight: 1,
                color: s.color,
                opacity: 1 - age,
                transform: `translate(-50%, -50%) scale(${1 - age * 0.35}) rotate(${s.rot + age * 40}deg)`,
                textShadow: `0 0 ${s.size * 0.9}px ${s.color}, 0 0 ${s.size * 1.8}px oklch(1 0 0 / 0.55)`,
                filter: "blur(0.15px)",
              }}
            >
              ✦
            </span>
          );
        }
        return (
          <span
            key={s.id}
            className="absolute"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: `radial-gradient(circle at 35% 30%, oklch(1 0 0 / 0.95), ${s.color} 55%, oklch(0.72 0.13 70 / 0.9))`,
              boxShadow: `0 0 ${s.size * 1.8}px ${s.color}, 0 0 ${s.size * 3.5}px oklch(0.85 0.15 88 / 0.45)`,
              opacity: 1 - age,
              transform: `translate(-50%, -50%) scale(${1 - age * 0.4})`,
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

const HERO_CHIPS = ["KP Astrology", "Prashna Kundali", "Horary Astrology", "Numerology", "Astro-Vastu", "Aura Scanning"];

const HERO_STATS = [
  ["15+", "Years of Practice"],
  ["7", "Chakra Balance"],
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
    { from: "bot", text: "Namaste! \u{1F64F} I'm Arawat's virtual guide. Ask me anything about KP Astrology, numerology, vastu, or book a consultation with Acharya Aarti." },
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
        className="fixed bottom-24 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
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
        <div className="fixed bottom-40 right-6 z-[60] flex w-80 flex-col overflow-hidden rounded-2xl border border-gold/30 backdrop-blur-md" style={{ background: "linear-gradient(160deg, oklch(0.22 0.08 300 / 0.97), oklch(0.16 0.06 300 / 0.97))", boxShadow: "0 20px 60px -15px oklch(0 0 0 / 0.8)" }}>
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

  // sound disabled — no auto play on open
  void playOmOnOpen;

  return (
    <main id="top" className="relative golden-cursor">
      <GlobalCursorSparkle />
      <div className="starfield" aria-hidden />
      <div className="starfield-slow" aria-hidden />

      {/* Nav */}
      <nav
        className="fixed inset-x-0 top-0 z-40 border-b border-gold/15 backdrop-blur-md"
        style={{ background: "oklch(0.16 0.06 300 / 0.55)" }}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
          <a href="#top" className="flex items-center gap-2">
            <span className="font-display text-sm tracking-[0.3em] text-gradient-gold">ARAWAT</span>
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
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="hidden sm:inline-flex items-center rounded-full bg-gold px-3 py-1 text-[10px] font-bold tracking-widest text-background hover:bg-gold-soft">Customer Support</a>
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
          <h1 className="leading-tight">
            <span className="block text-5xl font-bold italic text-gradient-gold text-shimmer sm:text-7xl lg:text-8xl" style={{ fontFamily: "var(--font-display)" }}>ARAWAT</span>
            <span className="mt-1 block text-4xl font-bold tracking-[0.12em] text-gradient-gold text-shimmer sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-display)" }}>
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
        </Reveal>
      </header>

      {/* Interactive chakra — enlarged body */}
      <section className="relative z-10 mx-auto mt-14 grid max-w-6xl items-stretch gap-10 px-6 lg:grid-cols-[1.15fr_1fr]">
        <Reveal className="flex">
          <div className="relative mx-auto flex w-full max-w-lg flex-col lg:max-w-xl">
            <div className="absolute -inset-6 rounded-[3rem] bg-accent/20 blur-3xl" aria-hidden />
            <img
              src={chakraFigure}
              alt="Meditating silhouette with seven glowing chakras before a golden zodiac mandala"
              width={1024}
              height={1280}
              className="relative w-full flex-1 rounded-[2rem] border border-gold/25 shadow-card object-cover"
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
              </button>
            ))}

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
          <h2 className="mt-2 text-3xl font-bold text-gradient-gold">{current.hindi} — {current.name}</h2>
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
                “{current.mantra}”
              </p>
            </div>
          </div>

          <p className="mt-5 text-xs tracking-[0.25em] text-muted-foreground uppercase">{t.diamonds.element} · {current.element}</p>
          <p className="mt-3 rounded-xl border px-3 py-2 text-sm font-semibold italic" style={{ borderColor: `${current.color}55`, background: `${current.color}12`, color: current.color }}>{current.symptom}</p>

          <ul className="mt-4 space-y-3">
            {current.services.map((s) => (
              <li key={s} className="flex items-start gap-3 border-b border-border/40 pb-2 text-base font-semibold">
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


      {/* Lotus — middle */}
      <div className="relative z-10 mx-auto mt-8 flex justify-center" aria-hidden>
        <span className="text-3xl opacity-70" style={{ filter: "drop-shadow(0 0 8px oklch(0.85 0.15 88 / 0.5))" }}>🪷</span>
      </div>

      <Divider />

      {/* Services */}
      <section id="services" className="relative z-10 mx-auto mt-4 max-w-5xl scroll-mt-24 px-6">
        <Reveal>
          <h2 className="text-center text-3xl text-gradient-gold sm:text-4xl">{t.services.title}</h2>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {allServices.map((s) => {
            return (
              <div
                key={s}
                className="surface-card rounded-xl px-5 py-4 text-base transition-all duration-300 hover:-translate-y-1"
              >
                <span className="mr-2" style={{ color: "var(--gold)" }}>
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
              className="group relative mx-auto h-72 w-52 rounded-r-xl rounded-l-sm border border-gold/50 shadow-glow"
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
            <p className="text-sm tracking-[0.3em] text-gold font-bold uppercase">{t.lalkitab.farmansTitle}</p>
            <p className="mt-3 text-sm text-gold-soft">
              and many more as per your chart
            </p>
            <p className="mt-4 text-sm font-semibold text-foreground">
              Contact &amp; Help Support:{" "}
              <a href="tel:+918979612593" className="text-gold hover:text-gold-soft underline underline-offset-4">
                +91 89796 12593
              </a>
            </p>
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
            <div className="mt-3 space-y-2 text-lg tracking-wide">
              <p>{t.query.days} — {(t.query as any).time}</p>
              <p>{(t.query as any).days2} — {(t.query as any).time2}</p>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <span className="inline-block rounded-full bg-primary px-6 py-2 text-lg font-semibold text-primary-foreground">
                {(t.query as any).time}
              </span>
              <span className="inline-block rounded-full bg-primary px-6 py-2 text-lg font-semibold text-primary-foreground">
                {(t.query as any).time2}
              </span>
            </div>
            <a
              href="tel:+918979612593"
              className="mt-6 block text-3xl font-bold text-gradient-gold"
            >
              +91 89796 12593
            </a>
            <a
              href="tel:+917906416125"
              className="mt-2 block text-2xl font-bold text-gold/90"
            >
              +91 79064 16125
            </a>
            <div className="mt-3 flex justify-center gap-3 text-xs">
              <a href={WHATSAPP} target="_blank" rel="noreferrer noopener" className="rounded-full border border-gold/30 px-3 py-1 text-gold">WhatsApp +91 89796 12593</a>
              <a href={WHATSAPP2} target="_blank" rel="noreferrer noopener" className="rounded-full border border-gold/30 px-3 py-1 text-gold">WhatsApp +91 79064 16125</a>
            </div>
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
                src="/imgggg22.jpeg"
                alt="Arawat"
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
          {(lang === "hi" ? FAQS_HI : FAQS_EN).map((f) => (
            <details key={f.q} className="faq-item">
              <summary>
                {f.q}
                <span className="chev text-gold/70" aria-hidden>▾</span>
              </summary>
              <p className="font-semibold">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Visiting Cards — 1 and 2 */}
      <SparkleTrail>
        <section className="relative z-10 mx-auto mt-24 max-w-4xl px-6">
          <Reveal>
            <h2 className="text-center text-3xl text-gradient-gold sm:text-4xl">{t.cards.title}</h2>
            <p className="mt-3 text-center text-base text-muted-foreground italic">
              {lang === "hi" ? "हमारे विज़िटिंग कार्ड — सीधे, साफ़" : "Our visiting cards — clear and direct"}
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
            <div className="flip-card h-80 w-64 sm:h-[26rem] sm:w-80">
              <div className="flip-card-inner surface-card rounded-2xl p-2 shadow-card">
                <div className="flip-card-front">
                  <img src="/newimg101.jpeg" alt="Arawat Card 1 front" loading="lazy" className="h-full w-full object-cover rounded-xl" />
                </div>
                <div className="flip-card-back">
                  <img src="/newimg102.jpeg" alt="Arawat Card 1 back" loading="lazy" className="h-full w-full object-cover rounded-xl" />
                </div>
              </div>
            </div>
            <div className="flip-card h-80 w-64 sm:h-[26rem] sm:w-80">
              <div className="flip-card-inner surface-card rounded-2xl p-2 shadow-card">
                <div className="flip-card-front">
                  <img src="/newimg102.jpeg" alt="Arawat Card 2 front" loading="lazy" className="h-full w-full object-cover rounded-xl" />
                </div>
                <div className="flip-card-back">
                  <img src="/newimg101.jpeg" alt="Arawat Card 2 back" loading="lazy" className="h-full w-full object-cover rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </SparkleTrail>

      {/* Mystic Store — i1 to i10 + Bracelets */}
      <section className="relative z-10 mx-auto mt-24 max-w-6xl px-6">
        <Reveal>
          <h2 className="text-center text-3xl text-gradient-gold sm:text-4xl">✦ Mystic Store ✦</h2>
          <p className="mt-3 text-center text-base text-muted-foreground italic">Crystals, pendants &amp; sacred tools — curated for your journey</p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[1,2,3,4,5,6,7,8,9,10].map((n) => (
            <div key={n} className="group surface-card overflow-hidden rounded-2xl p-1.5 shadow-card">
              <img src={`/i${n}.jpeg`} alt={`Mystic item ${n}`} loading="lazy" className="h-40 w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105 sm:h-48" />
            </div>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-center text-sm text-muted-foreground italic">Enchanted bracelets easy to carry and wear, chosen to enhance personal energy and harmonise planetary influence</p>
        </Reveal>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[1,2,3,4,5,6,7,8,9].map((n) => (
            <div key={`b${n}`} className="group surface-card overflow-hidden rounded-2xl p-1.5 shadow-card">
              <img src={`/bracelet-${n}.png`} alt={`Enchanted bracelet ${n}`} loading="lazy" className="h-40 w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105 sm:h-48" />
            </div>
          ))}
        </div>
      </section>

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

      {/* Customer Support — right most corner */}
      <a
        href={`tel:${PHONE.replace(/\s/g, "")}`}
        aria-label="Customer Support"
        className="fixed bottom-44 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-background shadow-lg transition-transform duration-200 hover:scale-110"
        title="Customer Support"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
      </a>
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

      {/* Lotus — centre small last page */}
      <div className="relative z-10 mx-auto mt-16 flex justify-center" aria-hidden>
        <span className="text-4xl opacity-80" style={{ filter: "drop-shadow(0 0 8px oklch(0.85 0.15 88 / 0.5))" }}>🪷</span>
      </div>
      {/* Footer — ARAWAT OCCULT SCIENCES italic bold enlarged */}
      <footer className="relative z-10 mx-auto mt-8 max-w-5xl px-6 pb-16 text-center">
        <video src="/arawat-logo-video.mp4" autoPlay muted loop playsInline preload="metadata" poster="/elephant-logo.jpg" aria-label="Arawat — golden elephant with mandala" className="mx-auto mb-6 h-auto w-[420px] max-w-[90vw] rounded-2xl border border-gold/40 bg-white p-1.5 shadow-glow" />
        <p className="text-4xl font-bold italic text-gradient-gold sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
          ARAWAT <span className="font-bold italic">OCCULT SCIENCES</span>
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
