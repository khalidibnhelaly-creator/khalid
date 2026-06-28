/**
 * Single source of truth for homepage content.
 * Markup lives in components; words and data live here.
 */

export const site = {
  name: "Khalid Bin Helaly",
  role: "AI Creative Entrepreneur",
  location: "Dhaka, Bangladesh",
  timezone: "GMT+6",
  email: "khalidibnhelaly@gmail.com",
  /** Set this to a YouTube/Vimeo embed URL to activate the showreel frame. */
  showreelEmbedUrl: null as string | null,
  youtubeChannel: "https://youtube.com/@khalidbinhelaly",
} as const;

export const socials = [
  { key: "LinkedIn", href: "https://www.linkedin.com/in/khalid-bin-helaly/" },
  { key: "YouTube", href: "https://youtube.com/@khalidbinhelaly" },
  { key: "Facebook", href: "https://www.facebook.com/khalidibnhelaly" },
] as const;

export const stats = [
  { value: "500+", label: "AI commercials produced" },
  { value: "13", label: "Years in digital marketing" },
  { value: "15+", label: "Brands served" },
  { value: "4", label: "Ventures in operation" },
] as const;

export const tracks = [
  {
    index: "01",
    title: "Hire the studio",
    description:
      "TOPZID produces AI-driven commercials and brand films. Days instead of months, at a fraction of traditional production cost.",
    meta: "Film · Brand · Training",
    href: "#studio",
  },
  {
    index: "02",
    title: "Back the ventures",
    description:
      "A portfolio of AI-native products built on systems the studio has already proven with paying clients.",
    meta: "SaaS · Commerce · Education",
    href: "#ventures",
  },
] as const;

/** BIW excluded: JPEG without transparency, incompatible with the monochrome treatment. */
export const clients = [
  { name: "Berger", src: "/brands/Berger.png" },
  { name: "Marico", src: "/brands/Marico.png" },
  { name: "Chaldal", src: "/brands/Chaldal.png" },
  { name: "UPS", src: "/brands/UPS.png" },
  { name: "Asiatic MCL", src: "/brands/Asiatic MCL.png" },
  { name: "Khaas Food", src: "/brands/Khaas Food.png" },
  { name: "Vision Electronics", src: "/brands/Vision Electronics.png" },
  { name: "Finesse", src: "/brands/Finesse.png" },
  { name: "Nutrition Depot", src: "/brands/Nutrition Depot.png" },
  { name: "Plush Down BD", src: "/brands/Plush Down BD.png" },
  { name: "Wattteh Greens", src: "/brands/Wattteh Greens.png" },
  { name: "Subaitaa's Heaven", src: "/brands/Subaitaas Heaven.png" },
  { name: "LearnOZ", src: "/brands/LearnOZ.png" },
  { name: "Releva", src: "/brands/Releva.png" },
] as const;

export const capabilities = [
  {
    index: "01",
    title: "Film production",
    description:
      "AI commercials and brand films, from script to final edit. Generative pipelines replace crews, sets and weeks of post.",
    tools: "Kling · Veo · Runway · Higgsfield",
  },
  {
    index: "02",
    title: "Brand systems",
    description:
      "Positioning, messaging architecture and campaign systems engineered on the Schwartz model of audience awareness.",
    tools: "Strategy · Identity · Campaigns",
  },
  {
    index: "03",
    title: "Training and automation",
    description:
      "Corporate AI training and n8n agent systems that leave marketing teams running their own production pipelines.",
    tools: "n8n · Claude · Agent systems",
  },
] as const;

export const ventures = [
  {
    index: "01",
    name: "HookMe",
    description:
      "Hook and copy generation SaaS built on the Schwartz awareness model. Credit-based pricing, built on the Claude API.",
    tag: "SaaS · Live",
    },
  {
    index: "02",
    name: "BrandSnap",
    description:
      "AI brand identity and content subscription for SMEs. Monthly plans that replace a retainer agency.",
    tag: "Subscription · Active",
  },
  {
    index: "03",
    name: "Jerseywala",
    description:
      "Premium jersey label with streetwear positioning, built for the 2026 World Cup window.",
    tag: "Commerce · Live",
  },
  {
    index: "04",
    name: "Vylre",
    description:
      "Hand-painted denim and minimalist clothing. Fashion treated as an art object.",
    tag: "Fashion · Live",
  },
] as const;

export const principles = [
  "Ship the prototype. Reality is the only feedback that counts.",
  "Awareness precedes desire. Map the audience before writing a word.",
  "AI is infrastructure, not decoration. Build systems that run without you.",
] as const;
