/**
 * TOPZID homepage content. Words, links and data live here; markup lives in
 * components/topzid/*. Program dates mirror the static pages' config.js files
 * (public/aurafarming/config.js, public/masterclass/season1/config.js).
 */

export const brand = {
  name: "TOPZID",
  tagline: "AI production studio",
  location: "Dhaka, Bangladesh",
  email: "khalidibnhelaly@gmail.com",
  whatsapp: "8801681096975",
  whatsappDisplay: "+880 1681 096975",
  url: "https://www.topzid.com",
} as const;

/** Same handle everywhere except LinkedIn. */
export const HANDLE = "thekhalidway";

export const socials = [
  { key: "Instagram", href: `https://www.instagram.com/${HANDLE}` },
  { key: "YouTube", href: `https://www.youtube.com/@${HANDLE}` },
  { key: "TikTok", href: `https://www.tiktok.com/@${HANDLE}` },
  { key: "Facebook", href: `https://www.facebook.com/${HANDLE}` },
  { key: "LinkedIn", href: "https://www.linkedin.com/in/khalid-bin-helaly/" },
] as const;

export const proof = [
  { value: "500+", label: "AI commercials produced" },
  { value: "15+", label: "Brands served" },
  { value: "1,000+", label: "People trained live" },
  { value: "13 yrs", label: "In marketing" },
] as const;

export const clients = [
  { name: "Berger", src: "/brands/Berger.png" },
  { name: "Marico", src: "/brands/Marico.png" },
  { name: "Chaldal PLC (YC S15)", src: "/brands/Chaldal.png" },
  { name: "UPS", src: "/brands/UPS.png" },
  { name: "Asiatic MCL", src: "/brands/Asiatic MCL.png" },
  { name: "Nutrition Depot", src: "/brands/Nutrition Depot.png" },
  { name: "Vision Electronics", src: "/brands/Vision Electronics.png" },
  { name: "Khaas Food", src: "/brands/Khaas Food.png" },
  { name: "Finesse", src: "/brands/Finesse.png" },
  { name: "BIW", src: "/brands/BIW.jpg" },
  { name: "Plush Down BD", src: "/brands/Plush Down BD.png" },
  { name: "Wattteh Greens", src: "/brands/Wattteh Greens.png" },
  { name: "LearnOZ", src: "/brands/LearnOZ.png" },
  { name: "Releva", src: "/brands/Releva.png" },
] as const;

export type Service = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  lede: string;
  deliverables: string[];
  bestFor: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export const services: Service[] = [
  {
    id: "commercials",
    index: "01",
    kicker: "Production",
    title: "AI commercials and brand films",
    lede: "TV and digital commercials, product films and brand stories, produced with generative AI from script to final cut. No crew, no sets, no months of post.",
    deliverables: [
      "Concept, script and storyboard",
      "AI-generated visuals, motion and voice",
      "Edit, sound design and music",
      "Cutdowns for every platform, 16:9 to 9:16",
    ],
    bestFor: "Brand and marketing teams who need campaign-grade films on digital timelines.",
    cta: { label: "Start a project", href: "#contact" },
  },
  {
    id: "training",
    index: "02",
    kicker: "Training",
    title: "Corporate AI training",
    lede: "Hands-on workshops that leave your team running its own AI production. Real tools, real output, built around the work your team already does.",
    deliverables: [
      "In-house workshops for marketing and creative teams",
      "Prompt systems and production SOPs your team keeps",
      "Content, video and workflow automation tracks",
      "Follow-up support while the team ships",
    ],
    bestFor: "Companies that want AI capability inside the team, not just a vendor.",
    cta: { label: "Book a training", href: "#contact" },
    secondary: { label: "See the public workshop", href: "/ai" },
  },
];

export const process = [
  { step: "01", title: "Brief", text: "One call. We lock the objective, audience and where the film will run." },
  { step: "02", title: "Script and board", text: "Concept, script and a visual storyboard you sign off before we generate." },
  { step: "03", title: "Production", text: "AI visuals, motion, voice and music, built in a connected pipeline." },
  { step: "04", title: "Delivery", text: "Final master plus cutdowns for every platform. Revisions are fast because nothing needs a reshoot." },
] as const;

export const films = [
  { id: "hI9jnC2IwOs", title: "BIR18: The Story of Bir Sreshtho Hamidur Rahman", tag: "Short film · 1971", featured: true },
  { id: "uN_Bl2JKHUM", title: "1921: The Night the Meghna Ran Red", tag: "Mulluk Cholo" },
  { id: "RGdkKv2QrcM", title: "MUKHOSH (মুখোশ)", tag: "Short film" },
  { id: "K3qy5cjjCtY", title: "What if...", tag: "Short" },
  { id: "RphZ79_nymY", title: "Introducing \"Chanda Card\" 🇧🇩", tag: "Concept film" },
] as const;

export type Program = {
  id: string;
  /** Short label for footer and nav lists. */
  short: string;
  kicker: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  image?: string;
  /** Time-aware status, resolved in the browser (static page, live dates). */
  status:
    | { kind: "until"; label: string; after: string; until: string }
    | { kind: "static"; label: string };
};

export const programs: Program[] = [
  {
    id: "aurafarming",
    short: "Aurafarming webinar",
    kicker: "Live webinar · Fri, Oct 23 · 9 PM Dhaka",
    title: "Become an AI Influencer Today: Aurafarming!",
    text: "Build an AI persona with presence: the look, the cinematic content engine, and the posting system. ৳1,000, 500 seats.",
    href: "/aurafarming",
    cta: "Reserve a seat",
    image: "/aurafarming/hero-1200.jpg",
    status: { kind: "until", label: "Registration open", after: "Registration closed", until: "2026-10-23T21:00:00+06:00" },
  },
  {
    id: "season1",
    short: "Season 1 recordings",
    kicker: "Recorded course",
    title: "One Man AI OS Masterclass: Season 1 Recordings",
    text: "All 8 sessions of the live masterclass, the prompt library and SOPs, plus the Aurafarming webinar free.",
    href: "/masterclass/season1",
    cta: "Get the recordings",
    status: { kind: "until", label: "৳5,000 launch price until Oct 20", after: "Available now", until: "2026-10-20T23:59:00+06:00" },
  },
  {
    id: "masterclass",
    short: "AI OS Masterclass",
    kicker: "Live cohort · 8 weeks",
    title: "One Man AI OS Masterclass",
    text: "Eight weeks, live, building a full AI content system with direct feedback. Season 1 sold out with 41 students.",
    href: "/masterclass",
    cta: "See the program",
    status: { kind: "static", label: "Season 1 sold out" },
  },
  {
    id: "workshop",
    short: "AI Workshop (Bangla)",
    kicker: "Workshop · Bangla",
    title: "AI দিয়ে নিজেকে সুপারচার্জ করুন",
    text: "The hands-on AI workshop for professionals and teams, taught in Bangla. Also available as a private session for your company.",
    href: "/ai",
    cta: "See the workshop",
    status: { kind: "static", label: "Public and in-house" },
  },
];

export const teaching = [
  { name: "bdjobs AI Conference", detail: "Speaker and workshop lead" },
  { name: "ZOYEQ", detail: "AI tools and workflow workshop" },
  { name: "50+ professionals", detail: "Trained in-house at a leading marketing group" },
] as const;

export const reviews = [
  "/masterclass/assets/review-20.png",
  "/masterclass/assets/review-06.png",
  "/masterclass/assets/review-15.png",
] as const;
