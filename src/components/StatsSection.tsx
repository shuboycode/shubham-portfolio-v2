import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import FadeIn from './FadeIn';

interface Stat {
  /** Numeric target, animated from zero when the band scrolls into view. */
  value: number;
  decimals?: number;
  suffix: string;
  label: string;
}

/**
 * Four stats, deliberately. Each covers a different kind of proof — tenure,
 * reach, technical depth, measurable impact — and every label is short enough
 * to sit on one line, so the row scans as a set rather than a spec sheet.
 *
 * Cut on purpose: "20+ projects" (vague and unverifiable — every portfolio
 * claims it) and "4 engineers led" (a single digit reads small beside 100K).
 * Both are stated in the Experience section, where they carry more weight.
 */
const STATS: Stat[] = [
  { value: 5.5, decimals: 1, suffix: 'yrs', label: 'Experience' },
  { value: 100, suffix: 'K+', label: 'Users reached' },
  { value: 10, suffix: 'K+', label: 'Concurrent live' },
  { value: 40, suffix: '%', label: 'Faster loads' },
];

const Counter = ({ value, decimals = 0 }: { value: number; decimals?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    // Decelerating ease: fast start, slow settle — the number lands rather
    // than stopping dead, which is what makes a count-up feel considered.
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });

    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return <span ref={ref}>{display.toFixed(decimals)}</span>;
};

const StatsSection = () => {
  return (
    <section
      aria-label="Career highlights"
      className="relative z-10 w-full border-y border-[#D7E2EA]/10 bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-14 sm:py-20"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-12 gap-x-8 sm:gap-x-12 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.08} y={24}>
            <div className="group flex flex-col items-center text-center">
              <div className="flex items-baseline gap-0.5">
                <span
                  className="font-black leading-none text-[#D7E2EA] transition-colors duration-300 group-hover:text-white"
                  style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
                >
                  <Counter value={stat.value} decimals={stat.decimals} />
                </span>
                <span
                  className="font-black leading-none text-[#D7E2EA]/40"
                  style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.7rem)' }}
                >
                  {stat.suffix}
                </span>
              </div>

              {/* Accent rule that widens on hover */}
              <span
                aria-hidden="true"
                className="mt-3 h-px w-6 bg-[#D7E2EA]/30 transition-all duration-500 group-hover:w-12 group-hover:bg-white"
              />

              <p className="mt-3 whitespace-nowrap font-light uppercase tracking-[0.16em] text-[#D7E2EA]/45 text-[10px] sm:text-[11px]">
                {stat.label}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Freshness signal: a portfolio that shows current work reads as active,
          where a page of fixed totals reads as abandoned. */}
      <FadeIn delay={0.5} y={20}>
        <div className="mx-auto mt-12 flex max-w-5xl items-center justify-center gap-2.5">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-[#D7E2EA] opacity-70"
              style={{ animation: 'statPulse 2.4s ease-out infinite' }}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D7E2EA]" />
          </span>
          <p className="font-light uppercase tracking-[0.18em] text-[#D7E2EA]/45 text-[10px] sm:text-[11px]">
            Currently building <span className="text-[#D7E2EA]/75">EasyCRM</span> — AI-driven
            marketing automation
          </p>
        </div>
      </FadeIn>

      <style>{`
        @keyframes statPulse {
          0%   { transform: scale(1); opacity: 0.7; }
          70%  { transform: scale(2.8); opacity: 0; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="statPulse"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
