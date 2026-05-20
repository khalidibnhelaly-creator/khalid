'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const brandLogos = [
  { src: '/brands/Asiatic MCL.png', alt: 'Asiatic MCL' },
  { src: '/brands/Chaldal.png', alt: 'Chaldal' },
  { src: '/brands/Berger.png', alt: 'Berger' },
  { src: '/brands/Marico.png', alt: 'Marico' },
  { src: '/brands/UPS.png', alt: 'UPS' },
  { src: '/brands/Khaas Food.png', alt: 'Khaas Food' },
  { src: '/brands/Vision Electronics.png', alt: 'Vision Electronics' },
  { src: '/brands/Finesse.png', alt: 'Finesse' },
  { src: '/brands/BIW.jpg', alt: 'BIW' },
  { src: '/brands/Wattteh Greens.png', alt: 'Wattteh Greens' },
  { src: '/brands/Plush Down BD.png', alt: 'Plush Down BD' },
  { src: '/brands/Nutrition Depot.png', alt: 'Nutrition Depot' },
  { src: '/brands/Subaitaas Heaven.png', alt: "Subaitaa's Heaven" },
  { src: '/brands/LearnOZ.png', alt: 'LearnOZ' },
  { src: '/brands/Releva.png', alt: 'Releva' },
];

const faqItems = [
  {
    q: 'আমি টেকনিক্যাল না, আমি কি পারবো?',
    a: 'অবশ্যই। এই ওয়ার্কশপ ডিজাইন করা হয়েছে নন-টেকনিক্যাল প্রফেশনালদের জন্য। কোনো কোডিং বা টেকনিক্যাল ব্যাকগ্রাউন্ড লাগবে না — শুধু শেখার আগ্রহ।',
  },
  {
    q: 'ল্যাপটপ লাগবে?',
    a: 'হ্যাঁ, নিজের ল্যাপটপ আনতে হবে। ওয়ার্কশপটি সম্পূর্ণ হ্যান্ডস-অন, তাই আপনি নিজে প্র্যাকটিস করবেন।',
  },
  {
    q: 'রেকর্ডিং পাবো?',
    a: 'ওয়ার্কশপের সেশন রেকর্ডিং এবং সব রিসোর্স ম্যাটেরিয়াল আপনার সাথে শেয়ার করা হবে।',
  },
  {
    q: 'টিম/কোম্পানির জন্য আলাদা সেশন সম্ভব?',
    a: 'হ্যাঁ, কর্পোরেট টিমের জন্য কাস্টম সেশন অ্যারেঞ্জ করা যায়। WhatsApp-এ যোগাযোগ করুন ডিটেইলসের জন্য।',
  },
];

export default function AIWorkshop() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 4 + 'px';
      cursor.style.top = e.clientY - 4 + 'px';
    };
    const onDown = () => { cursor.style.transform = 'scale(2.5)'; };
    const onUp = () => { cursor.style.transform = 'scale(1)'; };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      observer.disconnect();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'ai-workshop' }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'কিছু ভুল হয়েছে');
        setStatus('error');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '' });
    } catch {
      setErrorMsg('নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।');
      setStatus('error');
    }
  };

  return (
    <>
      <div className="cursor" ref={cursorRef} />

      <nav>
        <a href="/" className="nav-logo" style={{ textDecoration: 'none' }}>Khalid Bin Hilali</a>
        <ul className="nav-links">
          <li><a href="/">হোম</a></li>
          <li><a href="#workshop">ওয়ার্কশপ</a></li>
          <li><a href="#curriculum">কারিকুলাম</a></li>
          <li><a href="#register">রেজিস্ট্রেশন</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero" style={{ gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>
        <div className="hero-bg-num" aria-hidden="true">AI</div>

        <div className="hero-left">
          <div className="hero-tag">লাইভ ওয়ার্কশপ · AI · হ্যান্ডস-অন · বাংলাদেশ</div>
          <h1 className="hero-name">
            <em>AI</em> দিয়ে নিজেকে<br />সুপারচার্জ করুন
          </h1>
          <p className="hero-desc" style={{ maxWidth: '44ch' }}>
            খালিদ বিন হিলালীর একটি হ্যান্ডস-অন ওয়ার্কশপ। শিখুন কিভাবে AI দিয়ে
            কনটেন্ট তৈরি করবেন, ওয়ার্কফ্লো অটোমেট করবেন, এবং জেনারেটিভ AI আপনার
            ব্যবসায় ইন্টিগ্রেট করবেন — দুই দিনের ইনটেনসিভ সেশনে।
          </p>
          <div className="hero-cta-row">
            <a href="#register" className="btn-primary">এখনই রেজিস্টার করুন</a>
            <a href="#curriculum" className="btn-ghost">কারিকুলাম দেখুন</a>
          </div>
          <a
            href="https://wa.me/8801681096975?text=AI%20ওয়ার্কশপ%20সম্পর্কে%20জানতে%20চাই"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
            style={{ marginTop: '1rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp-এ মেসেজ করুন
          </a>
        </div>

        <div className="hero-right" style={{ paddingBottom: 0, alignSelf: 'end' }}>
          <div className="hero-stats">
            <div className="stat-block">
              <span className="stat-num">৫০০+</span>
              <span className="stat-label">AI কমার্শিয়াল প্রোডিউসড</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">১৫+</span>
              <span className="stat-label">AI টুলস কভার্ড</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">১০০%</span>
              <span className="stat-label">হ্যান্ডস-অন প্র্যাকটিস</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">২ দিন</span>
              <span className="stat-label">ইনটেনসিভ ফরম্যাট</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-inner">
          {[
            'AI কনটেন্ট তৈরি','প্রম্পট ইঞ্জিনিয়ারিং','AI ফিল্মমেকিং',
            'ChatGPT ও Claude','NanoBanana','ওয়ার্কফ্লো অটোমেশন',
            'AI মার্কেটিং','Higgsfield','ভয়েস ও মিউজিক AI',
            'AI কনটেন্ট তৈরি','প্রম্পট ইঞ্জিনিয়ারিং','AI ফিল্মমেকিং',
            'ChatGPT ও Claude','NanoBanana','ওয়ার্কফ্লো অটোমেশন',
            'AI মার্কেটিং','Higgsfield','ভয়েস ও মিউজিক AI',
          ].map((item, i) => (
            <span className="marquee-item" key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* What You'll Learn */}
      <section className="section" id="workshop">
        <div className="about-grid">
          <div className="reveal">
            <div className="section-label">ওয়ার্কশপ</div>
            <h2 className="about-headline">
              থিওরি না। <em>আসল</em> AI স্কিল যা আপনি আগামীকাল থেকেই ব্যবহার করবেন।
            </h2>
            <p className="about-body">
              এটা আরেকটা AI হাইপ টক না। এটা একটা স্ট্রাকচার্ড, হ্যান্ডস-অন ওয়ার্কশপ
              যেখানে আপনি আসল আউটপুট তৈরি করবেন — AI কমার্শিয়াল, অটোমেটেড কনটেন্ট
              পাইপলাইন, এবং ইন্টেলিজেন্ট মার্কেটিং সিস্টেম — যে টুলস এবং ফ্রেমওয়ার্ক
              আমি প্রতিদিন ৫০০+ AI কমার্শিয়াল প্রোডিউস করতে ব্যবহার করি।
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="section-label">কাদের জন্য</div>
            <ul className="philosophy-list">
              <li className="philosophy-item">
                <span className="philosophy-num">০১</span>
                <span className="philosophy-text">মার্কেটিং টিম যারা AI দিয়ে কনটেন্ট আউটপুট ১০ গুণ বাড়াতে চান</span>
              </li>
              <li className="philosophy-item">
                <span className="philosophy-num">০২</span>
                <span className="philosophy-text">ব্যবসার মালিক যারা রিপিটিটিভ ক্রিয়েটিভ কাজ অটোমেট করতে চান</span>
              </li>
              <li className="philosophy-item">
                <span className="philosophy-num">০৩</span>
                <span className="philosophy-text">ক্রিয়েটিভ এবং ফিল্মমেকার যারা AI-অ্যাসিস্টেড প্রোডাকশন এক্সপ্লোর করছেন</span>
              </li>
              <li className="philosophy-item">
                <span className="philosophy-num">০৪</span>
                <span className="philosophy-text">এক্সিকিউটিভ যাদের AI স্ট্র্যাটেজি বুঝতে হবে — শুধু বাজওয়ার্ড না</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="outcomes-section">
        <div className="section-label">কি কি নিয়ে যাবেন</div>
        <h2 className="services-headline reveal">
          ওয়ার্কশপ শেষে আপনার <em>হাতে</em> থাকবে
        </h2>
        <div className="outcomes-grid reveal" style={{ transitionDelay: '0.1s' }}>
          <div className="outcome-item">
            <span className="outcome-icon">01</span>
            <span className="outcome-text">আপনার প্রথম AI কমার্শিয়াল — নিজে বানানো</span>
          </div>
          <div className="outcome-item">
            <span className="outcome-icon">02</span>
            <span className="outcome-text">একটি অটোমেটেড কনটেন্ট পাইপলাইন — চালু অবস্থায়</span>
          </div>
          <div className="outcome-item">
            <span className="outcome-icon">03</span>
            <span className="outcome-text">১৫+ AI টুলে হ্যান্ডস-অন দক্ষতা</span>
          </div>
          <div className="outcome-item">
            <span className="outcome-icon">04</span>
            <span className="outcome-text">সোয়ার্টজ পিরামিড ফ্রেমওয়ার্কে মার্কেটিং স্ট্র্যাটেজি</span>
          </div>
          <div className="outcome-item">
            <span className="outcome-icon">05</span>
            <span className="outcome-text">AI ভয়েসওভার, মিউজিক ও অডিও প্রোডাকশন স্কিল</span>
          </div>
          <div className="outcome-item">
            <span className="outcome-icon">06</span>
            <span className="outcome-text">সেশন রেকর্ডিং ও সব রিসোর্স ম্যাটেরিয়াল</span>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="services-section" id="curriculum">
        <div className="section-label">কারিকুলাম</div>
        <h2 className="services-headline reveal">
          জিরো থেকে <em>প্রোডাকশন</em> — এক সেশনে
        </h2>
        <div className="services-grid">
          <div className="service-card reveal">
            <span className="service-icon">মডিউল ০১</span>
            <h3 className="service-title">AI ফাউন্ডেশন ও প্রম্পট ইঞ্জিনিয়ারিং</h3>
            <p className="service-desc">ChatGPT, Claude এবং Gemini-র জন্য প্রম্পট আর্কিটেকচার আয়ত্ত করুন। স্ট্রাকচার্ড প্রম্পটিং, চেইন-অফ-থট এবং রোল-বেসড ফ্রেমওয়ার্ক শিখুন।</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.1s' }}>
            <span className="service-icon">মডিউল ০২</span>
            <h3 className="service-title">AI ভিজ্যুয়াল কনটেন্ট ও ব্র্যান্ডিং</h3>
            <p className="service-desc">NanoBanana এবং GPT Image 2 দিয়ে প্রফেশনাল ব্র্যান্ড অ্যাসেট তৈরি করুন। প্রোডাক্ট ফটোগ্রাফি, সোশ্যাল মিডিয়া ভিজ্যুয়ালস এবং ব্র্যান্ড আইডেন্টিটি।</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.2s' }}>
            <span className="service-icon">মডিউল ০৩</span>
            <h3 className="service-title">AI ভিডিও ও সিনেমাটিক প্রোডাকশন</h3>
            <p className="service-desc">Higgsfield দিয়ে কমার্শিয়াল প্রোডিউস করুন — সব AI ভিডিও টুল একটি প্ল্যাটফর্মে ইন্টিগ্রেটেড। কনসেপ্ট থেকে ফাইনাল এডিট, সম্পূর্ণ পাইপলাইন।</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.05s' }}>
            <span className="service-icon">মডিউল ০৪</span>
            <h3 className="service-title">AI মার্কেটিং ও সোয়ার্টজ পিরামিড</h3>
            <p className="service-desc">AI-জেনারেটেড কনটেন্টে সোয়ার্টজ পিরামিড অফ অ্যাওয়ারনেস প্রয়োগ করুন। হুক সিস্টেম, অ্যাড কপি এবং ক্যাম্পেইন মেসেজিং তৈরি করুন।</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.15s' }}>
            <span className="service-icon">মডিউল ০৫</span>
            <h3 className="service-title">AI দিয়ে ওয়ার্কফ্লো অটোমেশন</h3>
            <p className="service-desc">n8n এবং AI এজেন্ট দিয়ে অটোমেটেড কনটেন্ট পাইপলাইন তৈরি করুন। টুলস কানেক্ট করুন, রিপিটিটিভ কাজ অটোমেট করুন।</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.25s' }}>
            <span className="service-icon">মডিউল ০৬</span>
            <h3 className="service-title">AI ভয়েস, মিউজিক ও অডিও</h3>
            <p className="service-desc">ElevenLabs দিয়ে ভয়েসওভার, Suno দিয়ে মিউজিক এবং পডকাস্ট-রেডি অডিও প্রোডিউস করুন। স্টুডিও ছাড়াই সম্পূর্ণ অডিও প্রোডাকশন।</p>
          </div>
        </div>
      </section>

      {/* Workshop Gallery */}
      <section className="section" id="gallery" style={{ paddingBottom: '4rem' }}>
        <div className="section-label">ওয়ার্কশপ গ্যালারি</div>
        <h2 className="about-headline reveal" style={{ marginBottom: '3rem' }}>
          আগের <em>সেশনগুলো</em> থেকে
        </h2>
        <div className="workshop-gallery reveal" style={{ transitionDelay: '0.1s' }}>
          <div className="gallery-grid">
            <div className="gallery-item">
              <Image src="/khalidworkshop.jpeg" alt="খালিদ AI ওয়ার্কশপ পরিচালনা করছেন" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6)', transition: 'filter 0.3s' }} />
            </div>
            <div className="gallery-item">
              <Image src="/khalidworkshop0.png" alt="ওয়ার্কশপ অংশগ্রহণকারীরা" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6)', transition: 'filter 0.3s' }} />
            </div>
            <div className="gallery-item">
              <Image src="/khalid_workshop2.jpg" alt="হ্যান্ডস-অন AI ট্রেনিং" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6)', transition: 'filter 0.3s' }} />
            </div>
            <div className="gallery-item">
              <Image src="/khalidworkshop3.JPG" alt="ওয়ার্কশপ প্রেজেন্টেশন" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6)', transition: 'filter 0.3s' }} />
            </div>
            <div className="gallery-item">
              <Image src="/khalidworkshop6.JPG" alt="AI টুলস ডেমোনস্ট্রেশন" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6)', transition: 'filter 0.3s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Bio */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="instructor-block reveal">
          <div className="instructor-photo">
            <Image src="/khalid.jpg" alt="খালিদ বিন হিলালী" width={200} height={280} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.5)', transition: 'filter 0.3s' }} />
          </div>
          <div className="instructor-info">
            <div className="section-label">ট্রেইনার সম্পর্কে</div>
            <h2 className="about-headline" style={{ marginBottom: '1rem' }}>
              খালিদ বিন <em>হিলালী</em>
            </h2>
            <p className="about-body">
              বাংলাদেশি AI ক্রিয়েটিভ উদ্যোক্তা। ১৩+ বছরের ডিজিটাল মার্কেটিং অভিজ্ঞতা,
              ৫০০+ AI-ড্রিভেন কমার্শিয়াল প্রোডিউসড। TOPZID AI ক্রিয়েটিভ স্টুডিওর ফাউন্ডার।
              Asiatic MCL-এ ৫০+ জনকে AI ট্রেনিং প্রদান করছেন। Chaldal PLC-র সাবেক অ্যাসিস্ট্যান্ট ডিরেক্টর অফ মার্কেটিং।
            </p>
            <p className="about-body" style={{ marginBottom: '1.5rem' }}>
              AI, স্টোরিটেলিং এবং বিজনেস স্ট্র্যাটেজির ইন্টারসেকশনে কাজ করেন — ব্র্যান্ড,
              ফিল্ম, অটোমেশন সিস্টেম এবং AI-পাওয়ার্ড প্রোডাক্ট তৈরি করেন।
            </p>
            <div className="section-label" style={{ marginBottom: '1rem' }}>যেসব ব্র্যান্ডের সাথে কাজ করেছেন</div>
            <div className="brand-logo-grid">
              {brandLogos.map((logo) => (
                <div className="brand-logo-item" key={logo.alt}>
                  <Image src={logo.src} alt={logo.alt} width={100} height={50} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'grayscale(1)', opacity: 0.6, transition: 'filter 0.3s, opacity 0.3s' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section">
        <div className="section-label" style={{ justifyContent: 'center' }}>ওয়ার্কশপ ফি</div>
        <h2 className="about-headline reveal" style={{ textAlign: 'center', marginBottom: '1rem' }}>
          ইনভেস্টমেন্ট: <em>৳৩,০০০ — ৳১০,০০০</em>
        </h2>
        <p className="about-body reveal" style={{ textAlign: 'center', maxWidth: '50ch', margin: '0 auto 1.5rem' }}>
          প্যাকেজ অনুযায়ী মূল্য ভিন্ন। আর্লি বার্ড এবং গ্রুপ ডিসকাউন্ট পেতে আজই যোগাযোগ করুন।
        </p>
        <div style={{ textAlign: 'center' }} className="reveal">
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
            letterSpacing: '0.15em', textTransform: 'uppercase' as const,
            color: 'var(--muted)',
          }}>
            তারিখ শীঘ্রই জানানো হবে · ঢাকা, বাংলাদেশ
          </span>
        </div>
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }} className="reveal">
          <a
            href="https://wa.me/8801681096975?text=AI%20ওয়ার্কশপের%20প্রাইসিং%20জানতে%20চাই"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            প্রাইসিং জানতে WhatsApp করুন
          </a>
        </div>
      </section>

      {/* Tools Section */}
      <section className="tools-section">
        <div className="section-label">যেসব টুল শিখবেন</div>
        <h3 className="tools-headline reveal">প্রতিটি টুল। এক ওয়ার্কশপ। ফুল স্ট্যাক AI।</h3>
        <div className="tools-grid reveal" style={{ transitionDelay: '0.1s' }}>
          {[
            'Claude','Claude Code','ChatGPT','Higgsfield','NanoBanana','GPT Image 2',
            'Kling','Veo','ElevenLabs','Suno','Pomelli','Google Flow',
            'n8n','Seedance 2','NotebookLM','Dashboard Building',
          ].map((tool) => (
            <span className="tool-pill" key={tool}>{tool}</span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{ paddingTop: '2rem' }}>
        <div className="section-label">সচরাচর জিজ্ঞাসা</div>
        <h2 className="about-headline reveal" style={{ marginBottom: '2rem' }}>
          আপনার <em>প্রশ্নের</em> উত্তর
        </h2>
        <div className="faq-list reveal" style={{ transitionDelay: '0.1s' }}>
          {faqItems.map((item, i) => (
            <div
              className={`faq-item ${openFaq === i ? 'faq-open' : ''}`}
              key={i}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="faq-question">
                <span>{item.q}</span>
                <span className="faq-toggle">{openFaq === i ? '−' : '+'}</span>
              </div>
              {openFaq === i && (
                <div className="faq-answer">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <section className="cta-section" id="register" style={{ padding: '6rem 3rem' }}>
        <span className="cta-tag reveal">সীমিত আসন</span>
        <h2 className="cta-headline reveal" style={{ marginBottom: '1rem' }}>
          <em>AI ওয়ার্কশপে</em><br />রেজিস্টার করুন
        </h2>
        <p className="cta-sub reveal">
          আপনার তথ্য দিন, আমরা ওয়ার্কশপের তারিখ, ভেন্যু এবং পেমেন্ট ডিটেইলস জানাবো।
        </p>

        {status === 'success' ? (
          <div className="reveal visible" style={{
            maxWidth: '480px', margin: '0 auto', padding: '2.5rem',
            border: '1px solid var(--gold)', background: 'rgba(201,168,76,0.06)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>&#10003;</div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif", fontSize: '1.5rem',
              fontWeight: 700, marginBottom: '0.75rem',
            }}>
              রেজিস্ট্রেশন সফল
            </h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              আমরা শীঘ্রই আপনার সাথে যোগাযোগ করবো ওয়ার্কশপের ডিটেইলস নিয়ে।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reveal visible" style={{
            maxWidth: '480px', margin: '0 auto', display: 'flex',
            flexDirection: 'column', gap: '1rem', position: 'relative',
          }}>
            <input
              type="text"
              placeholder="পুরো নাম *"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
            />
            <input
              type="email"
              placeholder="ইমেইল অ্যাড্রেস *"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
            />
            <input
              type="tel"
              placeholder="ফোন নম্বর"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="কোম্পানি / প্রতিষ্ঠান"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="form-input"
            />

            {status === 'error' && (
              <p style={{
                color: 'var(--rust)', fontFamily: "'DM Mono', monospace",
                fontSize: '0.75rem', letterSpacing: '0.05em',
              }}>
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={status === 'loading'}
              style={{
                width: '100%', marginTop: '0.5rem', textAlign: 'center',
                opacity: status === 'loading' ? 0.6 : 1,
              }}
            >
              {status === 'loading' ? 'রেজিস্টার হচ্ছে...' : 'ওয়ার্কশপে রেজিস্টার করুন'}
            </button>

            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
                color: 'var(--muted)', letterSpacing: '0.05em',
              }}>অথবা</span>
            </div>

            <a
              href="https://wa.me/8801681096975?text=AI%20ওয়ার্কশপে%20রেজিস্টার%20করতে%20চাই"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
              style={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp-এ রেজিস্টার করুন
            </a>
          </form>
        )}
      </section>

      <footer>
        <span className="footer-copy">&copy; ২০২৬ খালিদ বিন হিলালী। ঢাকা, বাংলাদেশ।</span>
        <ul className="footer-links">
          <li><a href="/">মূল সাইট</a></li>
          <li><a href="https://www.linkedin.com/in/khalid-bin-helaly/">LinkedIn</a></li>
          <li><a href="https://youtube.com/@khalidbinhelaly">YouTube</a></li>
        </ul>
      </footer>
      <div className="topzid-badge">
        <a href="https://topzid.com" target="_blank" rel="noopener noreferrer" className="topzid-link">
          <Image src="/Topzidlogo.png" alt="TOPZID" width={18} height={18} className="topzid-logo" />
          <span>A TOPZID Venture</span>
        </a>
      </div>
    </>
  );
}
