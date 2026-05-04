'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [contactError, setContactError] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('loading');
    setContactError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });

      const data = await res.json();

      if (!res.ok) {
        setContactError(data.error || 'Something went wrong');
        setContactStatus('error');
        return;
      }

      setContactStatus('success');
      setContactForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setContactError('Network error. Please try again.');
      setContactStatus('error');
    }
  };

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

  return (
    <>
      <div className="cursor" ref={cursorRef} />

      <nav>
        <span className="nav-logo">Khalid Bin Helaly</span>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-bg-num" aria-hidden="true">AI</div>

        <div className="hero-left">
          <div className="hero-tag">Generative AI · Brand · Film · Strategy</div>
          <h1 className="hero-name">
            Khalid<br />Bin <em>Helaly</em>
          </h1>
          <p className="hero-desc">
            Bangladeshi AI creative entrepreneur. I build brands, films, automation systems,
            and AI-powered products at the intersection of technology and storytelling.
          </p>
          <div className="hero-cta-row">
            <a href="#contact" className="btn-primary">Work Together</a>
            <a href="#projects" className="btn-ghost">See My Work</a>
          </div>
        </div>

        <div className="hero-photo-col">
          <div className="hero-photo-wrap">
            <Image
              src="/khalid.jpg"
              alt="Khalid Bin Helaly"
              width={300}
              height={480}
              className="photo-img"
              priority
            />
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-stats">
            <div className="stat-block">
              <span className="stat-num">500+</span>
              <span className="stat-label">AI Commercials Produced</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">13+</span>
              <span className="stat-label">Years in Digital Marketing</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">15+</span>
              <span className="stat-label">AI Tools in Daily Stack</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">∞</span>
              <span className="stat-label">Ideas in the Pipeline</span>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-inner">
          {[
            'AI Creative Production','Brand Strategy','Generative Filmmaking',
            'Marketing Automation','Prompt Engineering','Schwartz Pyramid Framework',
            'SaaS Development','AI Training & Education',
            'AI Creative Production','Brand Strategy','Generative Filmmaking',
            'Marketing Automation','Prompt Engineering','Schwartz Pyramid Framework',
            'SaaS Development','AI Training & Education',
          ].map((item, i) => (
            <span className="marquee-item" key={i}>{item}</span>
          ))}
        </div>
      </div>

      <section className="section" id="about">
        <div className="about-grid">
          <div className="reveal">
            <div className="section-label">About</div>
            <h2 className="about-headline">
              Where <em>artificial</em> intelligence meets genuine creativity
            </h2>
            <p className="about-body">
              I am a Bangladeshi creative entrepreneur working at the intersection of AI,
              storytelling, and business strategy. With over 13 years in digital marketing
              and 500+ AI-driven commercials produced, I have built a reputation for turning
              technological possibility into tangible brand impact.
            </p>
            <p className="about-body">
              My approach is systems thinking applied to creativity — designing not just
              individual pieces of content, but entire production ecosystems that generate
              results at scale.
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="section-label">Operating Principles</div>
            <ul className="philosophy-list">
              <li className="philosophy-item">
                <span className="philosophy-num">01</span>
                <span className="philosophy-text">Speed over perfection. Ship the prototype, learn from reality, iterate fast.</span>
              </li>
              <li className="philosophy-item">
                <span className="philosophy-num">02</span>
                <span className="philosophy-text">Awareness precedes desire. Every campaign starts with the Schwartz Pyramid.</span>
              </li>
              <li className="philosophy-item">
                <span className="philosophy-num">03</span>
                <span className="philosophy-text">AI is infrastructure, not decoration. Build systems that run without you.</span>
              </li>
              <li className="philosophy-item">
                <span className="philosophy-num">04</span>
                <span className="philosophy-text">Emotion converts. Data optimizes. You need both.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="section-label">What I Do</div>
        <h2 className="services-headline reveal">
          Building the next era of <em>creative</em> intelligence
        </h2>
        <div className="services-grid">
          <div className="service-card reveal">
            <span className="service-icon">01 — Film</span>
            <h3 className="service-title">AI Cinematic Production</h3>
            <p className="service-desc">Concept to screen using Kling, Runway, Higgsfield, and Veo. Full commercial production at a fraction of traditional cost and time.</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.1s' }}>
            <span className="service-icon">02 — Brand</span>
            <h3 className="service-title">Brand Strategy & Identity</h3>
            <p className="service-desc">Positioning, messaging architecture, and visual identity systems for startups and established companies across Bangladesh and beyond.</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.2s' }}>
            <span className="service-icon">03 — SaaS</span>
            <h3 className="service-title">AI Product Development</h3>
            <p className="service-desc">From concept to deployed product. Building SaaS tools on Next.js, Supabase, and Claude API with credit-based monetization models.</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.05s' }}>
            <span className="service-icon">04 — Automation</span>
            <h3 className="service-title">AI Workflow Automation</h3>
            <p className="service-desc">n8n-based multi-agent systems for creative, HR, and finance operations. Reducing manual work across entire departments.</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.15s' }}>
            <span className="service-icon">05 — Training</span>
            <h3 className="service-title">Corporate AI Education</h3>
            <p className="service-desc">Hands-on training programs for marketing teams, creatives, and executives. Teaching AI tools that produce real output, not theory.</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.25s' }}>
            <span className="service-icon">06 — Content</span>
            <h3 className="service-title">Performance Content Systems</h3>
            <p className="service-desc">Hook-driven social content engineered on the Schwartz Pyramid. Viral content formulas with psychological precision built in.</p>
          </div>
        </div>
      </section>

      <section className="framework-section" id="framework">
        <div className="framework-grid">
          <div className="reveal">
            <svg viewBox="0 0 340 320" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
              <defs>
                <linearGradient id="pyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#c9a84c', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#7a5c1e', stopOpacity: 0.3 }} />
                </linearGradient>
              </defs>
              <polygon points="20,290 320,290 280,240 60,240" fill="rgba(201,168,76,0.08)" stroke="#c9a84c" strokeWidth="1" />
              <text x="170" y="270" textAnchor="middle" fontFamily="DM Mono,monospace" fontSize="10" fill="#7a7060" letterSpacing="2">UNAWARE</text>
              <polygon points="60,240 280,240 248,190 92,190" fill="rgba(201,168,76,0.14)" stroke="#c9a84c" strokeWidth="1" />
              <text x="170" y="220" textAnchor="middle" fontFamily="DM Mono,monospace" fontSize="10" fill="#7a7060" letterSpacing="2">PROBLEM AWARE</text>
              <polygon points="92,190 248,190 216,140 124,140" fill="rgba(201,168,76,0.22)" stroke="#c9a84c" strokeWidth="1" />
              <text x="170" y="170" textAnchor="middle" fontFamily="DM Mono,monospace" fontSize="9" fill="#5a4a2a" letterSpacing="1.5">SOLUTION AWARE</text>
              <polygon points="124,140 216,140 192,90 148,90" fill="rgba(201,168,76,0.38)" stroke="#c9a84c" strokeWidth="1" />
              <text x="170" y="120" textAnchor="middle" fontFamily="DM Mono,monospace" fontSize="9" fill="#4a3a1a" letterSpacing="1">PRODUCT AWARE</text>
              <polygon points="148,90 192,90 170,40 170,40" fill="rgba(201,168,76,0.7)" stroke="#c9a84c" strokeWidth="1.5" />
              <text x="170" y="72" textAnchor="middle" fontFamily="DM Mono,monospace" fontSize="8" fill="#3a2800" letterSpacing="0.5">MOST AWARE</text>
              <text x="170" y="316" textAnchor="middle" fontFamily="Playfair Display,serif" fontSize="13" fill="#c9a84c" fontStyle="italic">The Schwartz Pyramid of Awareness</text>
            </svg>
          </div>
          <div className="reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="section-label">Core Framework</div>
            <h2 className="framework-title">
              Every message starts with <em>awareness</em>
            </h2>
            <p className="framework-body">
              The Schwartz Pyramid of Awareness is the operating framework behind everything
              I build — from a 3-second hook to a full campaign architecture. It maps where
              an audience sits in their relationship to a problem, then engineers communication
              that moves them up the pyramid toward action.
            </p>
            <p className="framework-body">Most brands speak to the wrong level. I fix that.</p>
            <div className="awareness-levels">
              <div className="awareness-item">
                <div className="awareness-bar" style={{ width: '80px' }} />
                <span className="awareness-name">Unaware</span>
                <span className="awareness-note">Emotion-first hooks</span>
              </div>
              <div className="awareness-item">
                <div className="awareness-bar" style={{ width: '65px' }} />
                <span className="awareness-name">Problem Aware</span>
                <span className="awareness-note">Identify the pain</span>
              </div>
              <div className="awareness-item">
                <div className="awareness-bar" style={{ width: '50px' }} />
                <span className="awareness-name">Solution Aware</span>
                <span className="awareness-note">Category framing</span>
              </div>
              <div className="awareness-item">
                <div className="awareness-bar" style={{ width: '35px' }} />
                <span className="awareness-name">Product Aware</span>
                <span className="awareness-note">Differentiation</span>
              </div>
              <div className="awareness-item">
                <div className="awareness-bar" style={{ width: '20px' }} />
                <span className="awareness-name">Most Aware</span>
                <span className="awareness-note">Offer + urgency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-section" id="projects">
        <div className="projects-header reveal">
          <h2 className="projects-headline">Active <em>Ventures</em></h2>
        </div>
        <div className="projects-list">
          <div className="project-row reveal">
            <span className="project-num">01</span>
            <span className="project-name">HookMeDaddy</span>
            <span className="project-desc">AI hook-generation SaaS built on the Schwartz Pyramid. Credit-based model with free tier and $9–$79/mo plans. Next.js + Claude API.</span>
            <span className="project-tag">SaaS · Live</span>
          </div>
          <div className="project-row reveal" style={{ transitionDelay: '0.05s' }}>
            <span className="project-num">02</span>
            <span className="project-name">TOPZID</span>
            <span className="project-desc">AI creative production studio. Fixed-price tiers targeting international brand managers. Speed + cost as the primary positioning.</span>
            <span className="project-tag">Studio · Active</span>
          </div>
          <div className="project-row reveal" style={{ transitionDelay: '0.1s' }}>
            <span className="project-num">03</span>
            <span className="project-name">BrandSnap</span>
            <span className="project-desc">AI brand identity and content subscription for Bangladeshi SMEs. BDT 2,999–5,999/mo. TOPZID sub-brand with interactive generator.</span>
            <span className="project-tag">Product · Active</span>
          </div>
          <div className="project-row reveal" style={{ transitionDelay: '0.15s' }}>
            <span className="project-num">04</span>
            <span className="project-name">vylre</span>
            <span className="project-desc">Hand-painted jeans, hoodies, and minimalist clothing. Fashion as art object. Shopify-based, BDT pricing, Bangladeshi market.</span>
            <span className="project-tag">Fashion · Live</span>
          </div>
        </div>
      </section>

      <section className="tools-section">
        <div className="section-label">AI Arsenal</div>
        <h3 className="tools-headline reveal">15+ tools. One workflow. Zero compromise.</h3>
        <div className="tools-grid reveal" style={{ transitionDelay: '0.1s' }}>
          {[
            'Claude','ChatGPT','Midjourney','Kling','Veo','Runway','Higgsfield',
            'Luma AI','ElevenLabs','Suno','NanoBanana','Google Flow',
            'DaVinci Resolve','NotebookLM','n8n','Seedance 2',
          ].map((tool) => (
            <span className="tool-pill" key={tool}>{tool}</span>
          ))}
        </div>
      </section>

      <section className="cta-section" id="contact" style={{ padding: '6rem 3rem' }}>
        <span className="cta-tag reveal">Ready to build something extraordinary?</span>
        <h2 className="cta-headline reveal" style={{ marginBottom: '1rem' }}>
          Let&apos;s make<br /><em>something</em><br />remarkable
        </h2>
        <p className="cta-sub reveal">
          Whether it is a brand, a film, an AI product, or a system that runs while you
          sleep — I am interested in conversations that lead somewhere real.
        </p>

        {contactStatus === 'success' ? (
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
              Message Sent
            </h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              Thank you for reaching out. I will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="reveal visible" style={{
            maxWidth: '480px', margin: '0 auto', display: 'flex',
            flexDirection: 'column', gap: '1rem', position: 'relative',
          }}>
            <input
              type="text"
              placeholder="Your Name *"
              required
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email Address *"
              required
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              className="form-input"
            />
            <input
              type="tel"
              placeholder="Phone / WhatsApp"
              value={contactForm.phone}
              onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
              className="form-input"
            />
            <textarea
              placeholder="Your Message *"
              required
              rows={4}
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              className="form-input"
              style={{ resize: 'vertical', fontFamily: 'inherit' }}
            />

            {contactStatus === 'error' && (
              <p style={{
                color: 'var(--rust)', fontFamily: "'DM Mono', monospace",
                fontSize: '0.75rem', letterSpacing: '0.05em',
              }}>
                {contactError}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={contactStatus === 'loading'}
              style={{
                width: '100%', marginTop: '0.5rem', textAlign: 'center',
                opacity: contactStatus === 'loading' ? 0.6 : 1,
              }}
            >
              {contactStatus === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </section>

      <footer>
        <span className="footer-copy">&copy; 2026 Khalid Bin Helaly. Dhaka, Bangladesh.</span>
        <ul className="footer-links">
          <li><a href="https://linkedin.com/in/khalidbinhelaly">LinkedIn</a></li>
          <li><a href="https://youtube.com/@khalidbinhelaly">YouTube</a></li>
          <li><a href="https://facebook.com/khalidbinhelaly">Facebook</a></li>
        </ul>
      </footer>
    </>
  );
}
