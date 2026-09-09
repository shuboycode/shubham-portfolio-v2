import { useState, useEffect, useRef } from 'react';
import FadeIn from './FadeIn';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSoundHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // Auto-mute video when scrolling past hero
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          const v = videoRef.current;
          if (v && !v.muted) {
            v.muted = true;
            setMuted(true);
          }
        }
      },
      { threshold: 0, rootMargin: '-50% 0px 0px 0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    setShowSoundHint(false);
  };

  return (
    <section ref={sectionRef} className="relative h-[100dvh] min-h-[620px] w-full overflow-hidden bg-black">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/intro.mp4" type="video/mp4" />
      </video>

      {/* Legibility scrim: strong on the left where the copy sits, clearing to
          the right so the subject stays visible. */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85" />
      {/* Soft vignette */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 90% at 50% 50%, transparent 45%, rgba(0,0,0,0.55) 100%)' }}
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* ── Nav ─────────────────────────────────────────── */}
        <FadeIn delay={0} y={-20}>
          <nav className="flex items-center justify-between gap-6 px-6 pt-7 md:px-12 md:pt-9">
            <ul className="flex items-center gap-5 sm:gap-8 md:gap-11">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group relative text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] text-white/70 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-white/70 transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/25 bg-white/[0.07] px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.22em] text-white backdrop-blur-md transition-all duration-300 hover:border-white/50 hover:bg-white/15"
            >
              Resume
              <svg
                width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </a>
          </nav>
        </FadeIn>

        {/* ── Centre copy ─────────────────────────────────── */}
        <div className="flex flex-1 items-center px-6 md:px-12">
          <div className="w-full max-w-[680px] py-10">
            {/* Eyebrow */}
            <FadeIn delay={0.3} y={20}>
              <div className="flex items-center gap-3.5">
                <span aria-hidden="true" className="h-px w-8 bg-white/40 sm:w-12" />
                <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-white/65">
                  SDE 1 · Frontend Engineer
                </p>
              </div>
            </FadeIn>

            {/* Name */}
            <FadeIn delay={0.45} y={40}>
              <h1
                className="mt-6 font-black uppercase tracking-[-0.02em] text-white"
                style={{ fontSize: 'clamp(2.75rem, 8.5vw, 96px)', lineHeight: 0.9 }}
              >
                Shubham
                <br />
                Kumar
              </h1>
            </FadeIn>

            {/* Subhead */}
            <FadeIn delay={0.7} y={20}>
              <p className="mt-7 max-w-[31rem] text-[0.95rem] sm:text-base md:text-[1.05rem] font-light leading-[1.7] text-white/70">
                <span className="font-medium text-white">5+ years</span> building SaaS products
                for <span className="font-medium text-white">US-based teams</span> — real-time
                systems holding{' '}
                <span className="font-medium text-white">10,000+ concurrent users</span>, and AI
                that turns plain English into working automation.
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.9} y={20}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:gap-3 hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)]"
                >
                  View work
                  <svg
                    width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                <a
                  href="mailto:kumarshubham121998@gmail.com"
                  className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition-all duration-300 hover:border-white/60 hover:bg-white/10"
                >
                  Email me
                </a>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <FadeIn delay={1.1} y={20}>
          <div className="flex items-center justify-between gap-6 px-6 pb-7 md:px-12 md:pb-9">
            <a
              href="#about"
              aria-label="Scroll to next section"
              className="group flex items-center gap-3.5"
            >
              <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.3em] text-white/55 transition-colors group-hover:text-white">
                Scroll
              </span>
              <span className="relative h-px w-14 overflow-hidden bg-white/20 sm:w-20">
                <span
                  className="absolute inset-y-0 left-0 w-1/3 bg-white"
                  style={{ animation: 'scrollLine 2s ease-in-out infinite' }}
                />
              </span>
            </a>

            <div className="flex items-center gap-4">
              <span className="hidden md:inline text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
                Hyderabad, India · Working with international teams
              </span>

              {showSoundHint && (
                <span
                  className="hidden sm:inline text-[9px] font-medium uppercase tracking-[0.22em] text-white/60"
                  style={{ animation: 'pulseFade 2s ease-in-out infinite' }}
                >
                  Tap for sound
                </span>
              )}
              <button
                onClick={toggleMute}
                aria-label={muted ? 'Unmute video' : 'Mute video'}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] text-white backdrop-blur-md transition-all duration-300 hover:border-white/45 hover:bg-white/15"
              >
                {muted ? (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(320%); }
        }
        @keyframes pulseFade {
          0%, 100% { opacity: 0.45; }
          50%      { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="scrollLine"], [style*="pulseFade"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
