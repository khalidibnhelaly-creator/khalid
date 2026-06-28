import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { RegisterForm } from "@/components/register-form";
import { ScrollReveal } from "@/components/scroll-reveal";

const WA_BASE = "https://wa.me/8801681096975";

const NAV = [
  { label: "হোম", href: "/", external: true },
  { label: "ওয়ার্কশপ", href: "#workshop" },
  { label: "কারিকুলাম", href: "#curriculum" },
  { label: "রেজিস্ট্রেশন", href: "#register" },
];

const STATS = [
  { value: "৫০০+", label: "AI কমার্শিয়াল প্রোডিউসড" },
  { value: "১৫+", label: "AI টুলস কভার্ড" },
  { value: "১০০%", label: "হ্যান্ডস-অন প্র্যাকটিস" },
  { value: "২ দিন", label: "ইনটেনসিভ ফরম্যাট" },
];

const AUDIENCE = [
  "মার্কেটিং টিম যারা AI দিয়ে কনটেন্ট আউটপুট ১০ গুণ বাড়াতে চান",
  "ব্যবসার মালিক যারা রিপিটিটিভ ক্রিয়েটিভ কাজ অটোমেট করতে চান",
  "ক্রিয়েটিভ এবং ফিল্মমেকার যারা AI-অ্যাসিস্টেড প্রোডাকশন এক্সপ্লোর করছেন",
  "এক্সিকিউটিভ যাদের AI স্ট্র্যাটেজি বুঝতে হবে — শুধু বাজওয়ার্ড না",
];

const OUTCOMES = [
  "আপনার প্রথম AI কমার্শিয়াল — নিজে বানানো",
  "একটি অটোমেটেড কনটেন্ট পাইপলাইন — চালু অবস্থায়",
  "১৫+ AI টুলে হ্যান্ডস-অন দক্ষতা",
  "সোয়ার্টজ পিরামিড ফ্রেমওয়ার্কে মার্কেটিং স্ট্র্যাটেজি",
  "AI ভয়েসওভার, মিউজিক ও অডিও প্রোডাকশন স্কিল",
  "সেশন রেকর্ডিং ও সব রিসোর্স ম্যাটেরিয়াল",
];

const MODULES = [
  {
    index: "মডিউল ০১",
    title: "AI ফাউন্ডেশন ও প্রম্পট ইঞ্জিনিয়ারিং",
    desc: "ChatGPT, Claude এবং Gemini-র জন্য প্রম্পট আর্কিটেকচার আয়ত্ত করুন। স্ট্রাকচার্ড প্রম্পটিং, চেইন-অফ-থট এবং রোল-বেসড ফ্রেমওয়ার্ক শিখুন।",
  },
  {
    index: "মডিউল ০২",
    title: "AI ভিজ্যুয়াল কনটেন্ট ও ব্র্যান্ডিং",
    desc: "NanoBanana এবং GPT Image 2 দিয়ে প্রফেশনাল ব্র্যান্ড অ্যাসেট তৈরি করুন। প্রোডাক্ট ফটোগ্রাফি, সোশ্যাল মিডিয়া ভিজ্যুয়ালস এবং ব্র্যান্ড আইডেন্টিটি।",
  },
  {
    index: "মডিউল ০৩",
    title: "AI ভিডিও ও সিনেমাটিক প্রোডাকশন",
    desc: "Higgsfield দিয়ে কমার্শিয়াল প্রোডিউস করুন — সব AI ভিডিও টুল একটি প্ল্যাটফর্মে ইন্টিগ্রেটেড। কনসেপ্ট থেকে ফাইনাল এডিট, সম্পূর্ণ পাইপলাইন।",
  },
  {
    index: "মডিউল ০৪",
    title: "AI মার্কেটিং ও সোয়ার্টজ পিরামিড",
    desc: "AI-জেনারেটেড কনটেন্টে সোয়ার্টজ পিরামিড অফ অ্যাওয়ারনেস প্রয়োগ করুন। হুক সিস্টেম, অ্যাড কপি এবং ক্যাম্পেইন মেসেজিং তৈরি করুন।",
  },
  {
    index: "মডিউল ০৫",
    title: "AI দিয়ে ওয়ার্কফ্লো অটোমেশন",
    desc: "n8n এবং AI এজেন্ট দিয়ে অটোমেটেড কনটেন্ট পাইপলাইন তৈরি করুন। টুলস কানেক্ট করুন, রিপিটিটিভ কাজ অটোমেট করুন।",
  },
  {
    index: "মডিউল ০৬",
    title: "AI ভয়েস, মিউজিক ও অডিও",
    desc: "ElevenLabs দিয়ে ভয়েসওভার, Suno দিয়ে মিউজিক এবং পডকাস্ট-রেডি অডিও প্রোডিউস করুন। স্টুডিও ছাড়াই সম্পূর্ণ অডিও প্রোডাকশন।",
  },
];

const GALLERY = [
  { src: "/khalidworkshop.jpeg", alt: "খালিদ AI ওয়ার্কশপ পরিচালনা করছেন" },
  { src: "/khalidworkshop0.png", alt: "ওয়ার্কশপ অংশগ্রহণকারীরা" },
  { src: "/khalid_workshop2.jpg", alt: "হ্যান্ডস-অন AI ট্রেনিং" },
  { src: "/khalidworkshop3.JPG", alt: "ওয়ার্কশপ প্রেজেন্টেশন" },
  { src: "/khalidworkshop6.JPG", alt: "AI টুলস ডেমোনস্ট্রেশন" },
];

const BRAND_LOGOS = [
  { src: "/brands/Asiatic MCL.png", alt: "Asiatic MCL" },
  { src: "/brands/Chaldal.png", alt: "Chaldal" },
  { src: "/brands/Berger.png", alt: "Berger" },
  { src: "/brands/Marico.png", alt: "Marico" },
  { src: "/brands/UPS.png", alt: "UPS" },
  { src: "/brands/Khaas Food.png", alt: "Khaas Food" },
  { src: "/brands/Vision Electronics.png", alt: "Vision Electronics" },
  { src: "/brands/Finesse.png", alt: "Finesse" },
  { src: "/brands/BIW.jpg", alt: "BIW" },
  { src: "/brands/Wattteh Greens.png", alt: "Wattteh Greens" },
  { src: "/brands/Plush Down BD.png", alt: "Plush Down BD" },
  { src: "/brands/Nutrition Depot.png", alt: "Nutrition Depot" },
  { src: "/brands/Subaitaas Heaven.png", alt: "Subaitaa's Heaven" },
  { src: "/brands/LearnOZ.png", alt: "LearnOZ" },
  { src: "/brands/Releva.png", alt: "Releva" },
];

const TOOLS = [
  "Claude", "Claude Code", "ChatGPT", "Higgsfield", "NanoBanana", "GPT Image 2",
  "Kling", "Veo", "ElevenLabs", "Suno", "Pomelli", "Google Flow",
  "n8n", "Seedance 2", "NotebookLM", "Dashboard Building",
];

const FAQ = [
  {
    q: "আমি টেকনিক্যাল না, আমি কি পারবো?",
    a: "অবশ্যই। এই ওয়ার্কশপ ডিজাইন করা হয়েছে নন-টেকনিক্যাল প্রফেশনালদের জন্য। কোনো কোডিং বা টেকনিক্যাল ব্যাকগ্রাউন্ড লাগবে না — শুধু শেখার আগ্রহ।",
  },
  {
    q: "ল্যাপটপ লাগবে?",
    a: "হ্যাঁ, নিজের ল্যাপটপ আনতে হবে। ওয়ার্কশপটি সম্পূর্ণ হ্যান্ডস-অন, তাই আপনি নিজে প্র্যাকটিস করবেন।",
  },
  {
    q: "রেকর্ডিং পাবো?",
    a: "ওয়ার্কশপের সেশন রেকর্ডিং এবং সব রিসোর্স ম্যাটেরিয়াল আপনার সাথে শেয়ার করা হবে।",
  },
  {
    q: "টিম/কোম্পানির জন্য আলাদা সেশন সম্ভব?",
    a: "হ্যাঁ, কর্পোরেট টিমের জন্য কাস্টম সেশন অ্যারেঞ্জ করা যায়। WhatsApp-এ যোগাযোগ করুন ডিটেইলসের জন্য।",
  },
];

function WaIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function AIWorkshop() {
  return (
    <>
      <noscript>
        <style>{`.reveal { opacity: 1; translate: none; }`}</style>
      </noscript>

      <SiteHeader
        markHref="/"
        items={NAV}
        labels={{ menu: "মেনু", close: "বন্ধ" }}
      />

      <main>
        {/* hero */}
        <section className="mast k-container" id="top">
          <p className="mast-kicker k-rise" data-rise="1">
            লাইভ ওয়ার্কশপ · AI · হ্যান্ডস-অন · বাংলাদেশ
          </p>

          <h1 className="mast-name k-rise" data-rise="2">
            <em>AI</em> দিয়ে নিজেকে
            <br />
            সুপারচার্জ করুন
          </h1>

          <div className="mast-row">
            <p className="mast-role k-rise" data-rise="3">
              খালিদ বিন হিলালীর একটি হ্যান্ডস-অন ওয়ার্কশপ। শিখুন কিভাবে AI দিয়ে
              কনটেন্ট তৈরি করবেন, ওয়ার্কফ্লো অটোমেট করবেন, এবং জেনারেটিভ AI আপনার
              ব্যবসায় ইন্টিগ্রেট করবেন — দুই দিনের ইনটেনসিভ সেশনে।
            </p>
            <div className="mast-aside k-rise" data-rise="4">
              <span>ট্রেইনার · খালিদ বিন হিলালী</span>
              <span>ঢাকা, বাংলাদেশ</span>
            </div>
          </div>

          <div className="ai-cta-row k-rise" data-rise="5">
            <a href="#register" className="btn">
              এখনই রেজিস্টার করুন
            </a>
            <a
              href={`${WA_BASE}?text=AI%20ওয়ার্কশপ%20সম্পর্কে%20জানতে%20চাই`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa"
            >
              <WaIcon />
              WhatsApp-এ মেসেজ করুন
            </a>
            <a href="#curriculum" className="k-link">
              কারিকুলাম দেখুন <span className="arrow">→</span>
            </a>
          </div>

          <div
            className="stats k-rise"
            data-rise="6"
            style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}
          >
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat-num">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* what + who */}
        <section className="k-section" id="workshop">
          <div className="k-container">
            <div className="k-label">
              <span>
                <span className="k-label-index">০১</span> · ওয়ার্কশপ
              </span>
              <span>হ্যান্ডস-অন</span>
            </div>

            <div className="split">
              <div className="split-head reveal">
                <h2 className="k-h2">
                  থিওরি না। <em>আসল</em> AI স্কিল যা আপনি আগামীকাল থেকেই ব্যবহার
                  করবেন।
                </h2>
                <p className="k-body" style={{ marginTop: "1.5rem" }}>
                  এটা আরেকটা AI হাইপ টক না। এটা একটা স্ট্রাকচার্ড, হ্যান্ডস-অন
                  ওয়ার্কশপ যেখানে আপনি আসল আউটপুট তৈরি করবেন — AI কমার্শিয়াল,
                  অটোমেটেড কনটেন্ট পাইপলাইন, এবং ইন্টেলিজেন্ট মার্কেটিং সিস্টেম —
                  যে টুলস এবং ফ্রেমওয়ার্ক আমি প্রতিদিন ৫০০+ AI কমার্শিয়াল
                  প্রোডিউস করতে ব্যবহার করি।
                </p>
              </div>

              <div className="reveal">
                <div
                  className="k-label"
                  style={{ marginBottom: "0.5rem" }}
                >
                  <span>কাদের জন্য</span>
                </div>
                <ul className="principles">
                  {AUDIENCE.map((item, i) => (
                    <li key={i}>
                      <span className="p-index">০{i + 1}</span>
                      <span className="p-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* outcomes */}
        <section className="k-section k-band">
          <div className="k-container">
            <div className="k-label">
              <span>
                <span className="k-label-index">০২</span> · কি কি নিয়ে যাবেন
              </span>
            </div>
            <h2 className="k-h2 reveal" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
              ওয়ার্কশপ শেষে আপনার হাতে থাকবে
            </h2>
            <div className="caps" data-stagger style={{ marginTop: 0 }}>
              {OUTCOMES.map((o, i) => (
                <div className="cap reveal" key={i}>
                  <span className="cap-index">০{i + 1}</span>
                  <p style={{ color: "var(--k-ink)" }}>{o}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* curriculum */}
        <section className="k-section" id="curriculum">
          <div className="k-container">
            <div className="k-label">
              <span>
                <span className="k-label-index">০৩</span> · কারিকুলাম
              </span>
              <span>৬ মডিউল</span>
            </div>
            <h2 className="k-h2 reveal" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
              জিরো থেকে <em>প্রোডাকশন</em> — এক সেশনে
            </h2>
            <div className="caps" data-stagger style={{ marginTop: 0 }}>
              {MODULES.map((m) => (
                <div className="cap reveal" key={m.index}>
                  <span className="cap-index">{m.index}</span>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* gallery */}
        <section className="k-section k-band">
          <div className="k-container">
            <div className="k-label">
              <span>
                <span className="k-label-index">০৪</span> · ওয়ার্কশপ গ্যালারি
              </span>
            </div>
            <h2 className="k-h2 reveal" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
              আগের সেশনগুলো থেকে
            </h2>
            <div className="gallery reveal">
              {GALLERY.map((g) => (
                <div className="gallery-item" key={g.src}>
                  <Image src={g.src} alt={g.alt} width={640} height={480} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* instructor */}
        <section className="k-section">
          <div className="k-container">
            <div className="k-label">
              <span>
                <span className="k-label-index">০৫</span> · ট্রেইনার সম্পর্কে
              </span>
            </div>

            <div className="split">
              <figure className="about-figure reveal">
                <Image
                  src="/khalid.jpg"
                  alt="খালিদ বিন হিলালী"
                  width={1023}
                  height={1537}
                  sizes="(max-width: 64rem) 26rem, 36vw"
                />
              </figure>

              <div className="reveal">
                <h2 className="k-h2">খালিদ বিন হিলালী</h2>
                <p className="k-body" style={{ marginTop: "1.5rem" }}>
                  বাংলাদেশি AI ক্রিয়েটিভ উদ্যোক্তা। ১৩+ বছরের ডিজিটাল মার্কেটিং
                  অভিজ্ঞতা, ৫০০+ AI-ড্রিভেন কমার্শিয়াল প্রোডিউসড। TOPZID AI
                  ক্রিয়েটিভ স্টুডিওর ফাউন্ডার। Asiatic MCL-এ ৫০+ জনকে AI
                  ট্রেনিং প্রদান করছেন। Chaldal PLC-র সাবেক অ্যাসিস্ট্যান্ট
                  ডিরেক্টর অফ মার্কেটিং।
                </p>
                <p className="k-body">
                  AI, স্টোরিটেলিং এবং বিজনেস স্ট্র্যাটেজির ইন্টারসেকশনে কাজ করেন
                  — ব্র্যান্ড, ফিল্ম, অটোমেশন সিস্টেম এবং AI-পাওয়ার্ড প্রোডাক্ট
                  তৈরি করেন।
                </p>

                <div className="k-label" style={{ margin: "2rem 0 1rem" }}>
                  <span>যেসব ব্র্যান্ডের সাথে কাজ করেছেন</span>
                </div>
                <ul className="wall wall--compact">
                  {BRAND_LOGOS.map((b) => (
                    <li className="wall-cell" key={b.alt}>
                      <Image src={b.src} alt={b.alt} width={120} height={40} sizes="120px" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* pricing */}
        <section className="k-section k-band">
          <div className="k-container">
            <div className="k-label">
              <span>
                <span className="k-label-index">০৬</span> · ওয়ার্কশপ ফি
              </span>
              <span>আর্লি বার্ড · গ্রুপ ডিসকাউন্ট</span>
            </div>
            <p className="price-line reveal">
              ইনভেস্টমেন্ট: <em>৳৩,০০০ — ৳১০,০০০</em>
            </p>
            <p className="k-body reveal" style={{ marginTop: "1rem" }}>
              প্যাকেজ অনুযায়ী মূল্য ভিন্ন। আর্লি বার্ড এবং গ্রুপ ডিসকাউন্ট পেতে
              আজই যোগাযোগ করুন।
            </p>
            <p
              className="reveal"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.08em",
                color: "var(--k-ink-3)",
                margin: "1.25rem 0 1.75rem",
              }}
            >
              তারিখ শীঘ্রই জানানো হবে · ঢাকা, বাংলাদেশ
            </p>
            <a
              href={`${WA_BASE}?text=AI%20ওয়ার্কশপের%20প্রাইসিং%20জানতে%20চাই`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa reveal"
            >
              <WaIcon />
              প্রাইসিং জানতে WhatsApp করুন
            </a>
          </div>
        </section>

        {/* tools */}
        <section className="k-section">
          <div className="k-container">
            <div className="k-label">
              <span>
                <span className="k-label-index">০৭</span> · যেসব টুল শিখবেন
              </span>
            </div>
            <h2 className="k-h2 reveal" style={{ marginBottom: "2rem" }}>
              প্রতিটি টুল। এক ওয়ার্কশপ। ফুল স্ট্যাক AI।
            </h2>
            <div className="pills reveal">
              {TOOLS.map((t) => (
                <span className="pill" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="k-section k-band">
          <div className="k-container">
            <div className="k-label">
              <span>
                <span className="k-label-index">০৮</span> · সচরাচর জিজ্ঞাসা
              </span>
            </div>
            <h2 className="k-h2 reveal" style={{ marginBottom: "2rem" }}>
              আপনার প্রশ্নের উত্তর
            </h2>
            <div className="faq reveal">
              {FAQ.map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary>{item.q}</summary>
                  <p className="faq-a">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* register */}
        <section className="k-section" id="register">
          <div className="k-container">
            <div className="k-label">
              <span>
                <span className="k-label-index">০৯</span> · রেজিস্ট্রেশন
              </span>
              <span>সীমিত আসন</span>
            </div>

            <div className="split">
              <div className="split-head reveal">
                <h2 className="k-h2">AI ওয়ার্কশপে রেজিস্টার করুন</h2>
                <p className="k-body" style={{ marginTop: "1.5rem" }}>
                  আপনার তথ্য দিন, আমরা ওয়ার্কশপের তারিখ, ভেন্যু এবং পেমেন্ট
                  ডিটেইলস জানাবো।
                </p>
                <a
                  href={`${WA_BASE}?text=AI%20ওয়ার্কশপে%20রেজিস্টার%20করতে%20চাই`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-wa"
                  style={{ marginTop: "1.75rem" }}
                >
                  <WaIcon />
                  WhatsApp-এ রেজিস্টার করুন
                </a>
              </div>

              <div className="reveal">
                <RegisterForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="kf">
        <div className="k-container kf-inner">
          <span className="kf-copy">© ২০২৬ খালিদ বিন হিলালী। ঢাকা, বাংলাদেশ।</span>
          <ul className="kf-links">
            <li>
              <a href="/">মূল সাইট</a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/khalid-bin-helaly/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com/@khalidbinhelaly"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube
              </a>
            </li>
          </ul>
          <a
            className="kf-venture"
            href="https://topzid.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            A TOPZID venture ↗
          </a>
        </div>
      </footer>

      <ScrollReveal />
    </>
  );
}
