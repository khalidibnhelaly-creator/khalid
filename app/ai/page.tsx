'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

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
        setErrorMsg(data.error || 'Something went wrong');
        setStatus('error');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '' });
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <>
      <div className="cursor" ref={cursorRef} />

      <nav>
        <a href="/" className="nav-logo" style={{ textDecoration: 'none' }}>Khalid Bin Helaly</a>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="#workshop">Workshop</a></li>
          <li><a href="#curriculum">Curriculum</a></li>
          <li><a href="#register">Register</a></li>
        </ul>
      </nav>

      {/* Hero */}
      <section className="hero" style={{ gridTemplateColumns: '1.2fr 1fr', gap: '3rem' }}>
        <div className="hero-bg-num" aria-hidden="true">AI</div>

        <div className="hero-left">
          <div className="hero-tag">Live Workshop · AI · Hands-On · Bangladesh</div>
          <h1 className="hero-name">
            Master <em>AI</em><br />for Business
          </h1>
          <p className="hero-desc" style={{ maxWidth: '44ch' }}>
            A hands-on workshop by Khalid Bin Helaly. Learn to build AI-powered content,
            automate workflows, and integrate generative AI into your business — in one
            intensive session.
          </p>
          <div className="hero-cta-row">
            <a href="#register" className="btn-primary">Register Now</a>
            <a href="#curriculum" className="btn-ghost">See Curriculum</a>
          </div>
        </div>

        <div className="hero-right" style={{ paddingBottom: 0, alignSelf: 'end' }}>
          <div className="hero-stats">
            <div className="stat-block">
              <span className="stat-num">500+</span>
              <span className="stat-label">AI Commercials Produced</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">15+</span>
              <span className="stat-label">AI Tools Covered</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">100%</span>
              <span className="stat-label">Hands-On Practice</span>
            </div>
            <div className="stat-block">
              <span className="stat-num">1 Day</span>
              <span className="stat-label">Intensive Format</span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-inner">
          {[
            'AI Content Creation','Prompt Engineering','AI Filmmaking',
            'ChatGPT & Claude','Midjourney & Flux','Workflow Automation',
            'AI Marketing','Video Generation','Voice & Music AI',
            'AI Content Creation','Prompt Engineering','AI Filmmaking',
            'ChatGPT & Claude','Midjourney & Flux','Workflow Automation',
            'AI Marketing','Video Generation','Voice & Music AI',
          ].map((item, i) => (
            <span className="marquee-item" key={i}>{item}</span>
          ))}
        </div>
      </div>

      {/* What You'll Learn */}
      <section className="section" id="workshop">
        <div className="about-grid">
          <div className="reveal">
            <div className="section-label">The Workshop</div>
            <h2 className="about-headline">
              Not theory. <em>Real</em> AI skills you use tomorrow.
            </h2>
            <p className="about-body">
              This is not another AI hype talk. This is a structured, hands-on workshop
              where you will build real outputs — AI commercials, automated content
              pipelines, and intelligent marketing systems — using the same tools and
              frameworks I use daily to produce 500+ AI commercials.
            </p>
            <p className="about-body">
              Designed for marketing teams, creatives, entrepreneurs, and executives who
              want to stop watching AI happen and start using it.
            </p>
          </div>
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <div className="section-label">Who This Is For</div>
            <ul className="philosophy-list">
              <li className="philosophy-item">
                <span className="philosophy-num">01</span>
                <span className="philosophy-text">Marketing teams ready to 10x content output with AI tools</span>
              </li>
              <li className="philosophy-item">
                <span className="philosophy-num">02</span>
                <span className="philosophy-text">Business owners who want to automate repetitive creative work</span>
              </li>
              <li className="philosophy-item">
                <span className="philosophy-num">03</span>
                <span className="philosophy-text">Creatives and filmmakers exploring AI-assisted production</span>
              </li>
              <li className="philosophy-item">
                <span className="philosophy-num">04</span>
                <span className="philosophy-text">Executives who need to understand AI strategy — not just buzzwords</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="services-section" id="curriculum">
        <div className="section-label">Curriculum</div>
        <h2 className="services-headline reveal">
          From zero to <em>production</em> in one session
        </h2>
        <div className="services-grid">
          <div className="service-card reveal">
            <span className="service-icon">Module 01</span>
            <h3 className="service-title">AI Foundations & Prompt Engineering</h3>
            <p className="service-desc">Master prompt architecture for ChatGPT, Claude, and Gemini. Learn structured prompting, chain-of-thought, and role-based frameworks that get consistent, high-quality outputs.</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.1s' }}>
            <span className="service-icon">Module 02</span>
            <h3 className="service-title">AI Visual Content & Branding</h3>
            <p className="service-desc">Create professional brand assets with Midjourney, Flux, and DALL-E. Product photography, social media visuals, and brand identity — all AI-generated.</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.2s' }}>
            <span className="service-icon">Module 03</span>
            <h3 className="service-title">AI Video & Cinematic Production</h3>
            <p className="service-desc">Produce commercials using Kling, Runway, Veo, and Higgsfield. From concept to final edit — the complete AI filmmaking pipeline I use for client work.</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.05s' }}>
            <span className="service-icon">Module 04</span>
            <h3 className="service-title">AI Marketing & The Schwartz Pyramid</h3>
            <p className="service-desc">Apply the Schwartz Pyramid of Awareness to AI-generated content. Build hook systems, ad copy, and campaign messaging that converts at every awareness level.</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.15s' }}>
            <span className="service-icon">Module 05</span>
            <h3 className="service-title">Workflow Automation with AI</h3>
            <p className="service-desc">Build automated content pipelines using n8n and AI agents. Connect tools, automate repetitive tasks, and create systems that run while you sleep.</p>
          </div>
          <div className="service-card reveal" style={{ transitionDelay: '0.25s' }}>
            <span className="service-icon">Module 06</span>
            <h3 className="service-title">AI Voice, Music & Audio</h3>
            <p className="service-desc">Generate voiceovers with ElevenLabs, create music with Suno, and produce podcast-ready audio. Complete audio production without a studio.</p>
          </div>
        </div>
      </section>

      {/* Workshop Gallery */}
      <section className="section" id="gallery" style={{ paddingBottom: '4rem' }}>
        <div className="section-label">Workshop Gallery</div>
        <h2 className="about-headline reveal" style={{ marginBottom: '3rem' }}>
          From previous <em>sessions</em>
        </h2>
        <div className="workshop-gallery reveal" style={{ transitionDelay: '0.1s' }}>
          <div className="gallery-grid">
            <div className="gallery-item">
              <Image src="/khalidworkshop.jpeg" alt="Khalid leading AI workshop" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6)', transition: 'filter 0.3s' }} />
            </div>
            <div className="gallery-item">
              <Image src="/khalidworkshop0.png" alt="Workshop participants" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6)', transition: 'filter 0.3s' }} />
            </div>
            <div className="gallery-item">
              <Image src="/khalid_workshop2.jpg" alt="Hands-on AI training" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6)', transition: 'filter 0.3s' }} />
            </div>
            <div className="gallery-item">
              <Image src="/khalidworkshop3.JPG" alt="Workshop presentation" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6)', transition: 'filter 0.3s' }} />
            </div>
            <div className="gallery-item">
              <Image src="/khalidworkshop6.JPG" alt="AI tools demonstration" width={400} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.6)', transition: 'filter 0.3s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="tools-section">
        <div className="section-label">Tools You Will Learn</div>
        <h3 className="tools-headline reveal">Every tool. One workshop. Full stack AI.</h3>
        <div className="tools-grid reveal" style={{ transitionDelay: '0.1s' }}>
          {[
            'Claude','ChatGPT','Midjourney','Kling','Veo','Runway','Higgsfield',
            'Luma AI','ElevenLabs','Suno','Flux','Google Flow',
            'DaVinci Resolve','n8n','Seedance 2','NotebookLM',
          ].map((tool) => (
            <span className="tool-pill" key={tool}>{tool}</span>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <section className="cta-section" id="register" style={{ padding: '6rem 3rem' }}>
        <span className="cta-tag reveal">Limited Seats Available</span>
        <h2 className="cta-headline reveal" style={{ marginBottom: '1rem' }}>
          Register for the<br /><em>AI Workshop</em>
        </h2>
        <p className="cta-sub reveal">
          Fill in your details below and we will reach out with workshop dates,
          venue, and payment details.
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
              You&apos;re Registered
            </h3>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7 }}>
              We will contact you shortly with workshop details. Check your email at{' '}
              <strong style={{ color: 'var(--ink)' }}>{formData.email || 'the address you provided'}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reveal visible" style={{
            maxWidth: '480px', margin: '0 auto', display: 'flex',
            flexDirection: 'column', gap: '1rem', position: 'relative',
          }}>
            <input
              type="text"
              placeholder="Full Name *"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email Address *"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="form-input"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Company / Organization"
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
              {status === 'loading' ? 'Registering...' : 'Register for Workshop'}
            </button>
          </form>
        )}
      </section>

      <footer>
        <span className="footer-copy">&copy; 2026 Khalid Bin Helaly. Dhaka, Bangladesh.</span>
        <ul className="footer-links">
          <li><a href="/">Main Site</a></li>
          <li><a href="https://linkedin.com/in/khalidbinhelaly">LinkedIn</a></li>
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
