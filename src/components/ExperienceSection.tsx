import FadeIn from './FadeIn';

interface Role {
  title: string;
  company: string;
  team: string;
  location: string;
  period: string;
  duration: string;
  current?: boolean;
  focus: string;
  points: string[];
  tech: string[];
}

// Metrics are wrapped in ** markers below and rendered as highlights —
// recruiters scan for numbers before they read sentences.
const ROLES: Role[] = [
  {
    title: 'SDE 1 | Frontend Engineer',
    company: 'Softobiz',
    team: 'EasyWebinar & EasyCRM',
    location: 'Hyderabad, India',
    period: 'Mar 2023 — Present',
    duration: '3.5 yrs',
    current: true,
    focus:
      'Real-time systems, AI automation and multi-tenant architecture for a US-based SaaS product, delivered from India across time zones.',
    points: [
      'Building **EasyCRM**, a marketing automation and CRM platform — Campaign Builder, Broadcasts and workflow automation across **React, NestJS, Prisma and PostgreSQL**.',
      'Shipped **AI-powered workflow generation** that converts natural-language marketing requirements into structured, executable automation workflows.',
      'Introduced **tenant-aware data access** for multi-tenant isolation of campaigns, broadcasts and workflow data, plus authenticated cross-product communication between EasyWebinar and EasyCRM.',
      'Hardened event processing against **idempotency failures, duplicate sends and timeline inconsistency** across marketing workflows.',
      'Scaled real-time chat, polls, Q&A and live transcription on PubNub WebSockets to **10,000+ concurrent users** at **99.9% uptime**, on a platform with **100,000+ registered users**.',
      'Cut initial page loads by up to **40%** with SSR, SSG and ISR in Next.js, and improved overall app performance **15–40%** through code splitting, lazy loading, memoization and caching.',
      'Architected a Storybook component library adopted by **5+ enterprise applications**, cutting development time **30%**.',
      'Led a team of **4 frontend developers**, running code reviews and mentoring that reduced production bugs **25%**.',
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'PubNub', 'Storybook', 'AI APIs'],
  },
  {
    title: 'Frontend Developer',
    company: 'Softobiz',
    team: 'Design & Development',
    location: 'Mohali, India',
    period: 'Mar 2021 — Mar 2023',
    duration: '2 yrs',
    focus: 'Interface design, design systems & performance',
    points: [
      'Designed and shipped interfaces for SaaS platforms, CRMs and real-time apps serving **50,000+ monthly active users**.',
      'Translated Figma prototypes into responsive builds at **98%+ design accuracy** using React and modern CSS architecture.',
      'Tuned performance with Lighthouse and GTmetrix to average scores of **90+** across performance, accessibility and SEO.',
      'Built reusable UI systems on Material UI, Chakra UI, Tailwind and Semantic UI, reducing development time **40%**.',
      'Integrated REST APIs and managed complex state with Redux Toolkit and React Query for data-heavy applications.',
    ],
    tech: ['React', 'Figma', 'Redux Toolkit', 'React Query', 'Material UI', 'Chakra UI', 'Tailwind', 'SCSS'],
  },
];

/** Renders **bold** spans as metric highlights. */
const withHighlights = (text: string) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-[#D7E2EA]">
        {part}
      </strong>
    ) : (
      part
    )
  );

const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 130px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="text-center font-light uppercase tracking-widest text-[#D7E2EA]/50 mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(0.75rem, 1.3vw, 1rem)' }}
        >
          5+ years · Softobiz · Building US SaaS products from India
        </p>
      </FadeIn>

      {/* Editorial two-column layout. Roles are separated by structure and a
          hairline rule rather than card chrome, which reads calmer at this scale. */}
      <div className="mx-auto flex max-w-5xl flex-col gap-16 sm:gap-24 md:gap-28">
        {ROLES.map((role, i) => (
          <FadeIn key={role.period} delay={i * 0.1} y={30}>
            <article
              className={
                i > 0
                  ? 'grid gap-6 border-t border-[#D7E2EA]/10 pt-16 sm:gap-10 sm:pt-24 md:grid-cols-[minmax(160px,200px)_1fr] md:gap-14'
                  : 'grid gap-6 sm:gap-10 md:grid-cols-[minmax(160px,200px)_1fr] md:gap-14'
              }
            >
              {/* Left rail: when it happened */}
              <div className="flex flex-col gap-2.5 md:sticky md:top-24 md:self-start">
                <span className="font-light uppercase tracking-[0.18em] text-[#D7E2EA]/45 text-[11px] sm:text-xs">
                  {role.period}
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="font-bold leading-none text-[#D7E2EA]/85"
                    style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2rem)' }}
                  >
                    {role.duration}
                  </span>

                  {role.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D7E2EA]/30 bg-[#D7E2EA]/[0.08] px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-[#D7E2EA]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span
                          className="absolute inline-flex h-full w-full rounded-full bg-[#D7E2EA] opacity-70"
                          style={{ animation: 'nodePulse 2.4s ease-out infinite' }}
                        />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D7E2EA]" />
                      </span>
                      Current
                    </span>
                  )}
                </div>

                <span className="mt-1 text-sm text-[#D7E2EA]/40">{role.location}</span>
              </div>

              {/* Right: what it was */}
              <div className="flex flex-col">
                <h3
                  className="font-medium text-[#D7E2EA] leading-tight"
                  style={{ fontSize: 'clamp(1.35rem, 2.6vw, 2.1rem)' }}
                >
                  {role.title}
                </h3>

                <p className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-[#D7E2EA]/55">
                  <span className="font-medium text-[#D7E2EA]/85">{role.company}</span>
                  <span aria-hidden="true" className="text-[#D7E2EA]/25">/</span>
                  <span>{role.team}</span>
                </p>

                {/* One-glance summary before the detail */}
                <p
                  className="mt-6 font-light italic leading-relaxed text-[#D7E2EA]/55"
                  style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)' }}
                >
                  {role.focus}
                </p>

                <ul className="mt-7 flex flex-col gap-4">
                  {role.points.map((point, pi) => (
                    <li
                      key={pi}
                      className="flex gap-3.5 font-light leading-relaxed text-[#D7E2EA]/65"
                      style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)' }}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.65em] h-1 w-1 shrink-0 rounded-full bg-[#D7E2EA]/30"
                      />
                      <span>{withHighlights(point)}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-2">
                  {role.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-[#D7E2EA]/12 px-2.5 py-1 text-xs text-[#D7E2EA]/50 transition-colors hover:border-[#D7E2EA]/30 hover:text-[#D7E2EA]/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>

      <style>{`
        @keyframes nodePulse {
          0%   { transform: scale(1); opacity: 0.7; }
          70%  { transform: scale(2.8); opacity: 0; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="nodePulse"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;
