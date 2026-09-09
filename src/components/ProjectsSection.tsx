import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FadeIn from './FadeIn';

interface ProjectData {
  number: string;
  category: string;
  name: string;
  /** Short right-aligned status. Kept factual — no invented dates. */
  meta: string;
  tagline: string;
  liveUrl?: string;
  stack: string[];
  impact: { value: string; label: string }[];
  details: string[];
  images: string[];
}

const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'CRM & Marketing Automation',
    name: 'EasyCRM',
    meta: 'Current',
    tagline:
      'Multi-tenant marketing automation and CRM platform where plain-English requirements become runnable campaign workflows. Currently in UAT.',
    // Ordered so the differentiating tech lands in the visible first five;
    // the collapsed row truncates, and table-stakes tooling can wait.
    stack: ['React', 'TypeScript', 'NestJS', 'PostgreSQL', 'AI APIs', 'Next.js', 'Prisma', 'Node.js', 'Tailwind'],
    impact: [
      { value: 'AI-native', label: 'Language → workflow' },
      { value: 'Multi-tenant', label: 'Isolated by organization' },
      { value: 'Full-stack', label: 'React through PostgreSQL' },
    ],
    details: [
      'Built the Marketing Automation surface — Campaign Builder, Broadcasts, workflow automation and customer engagement flows.',
      'Implemented AI-powered workflow generation, integrating an AI API that converts natural-language marketing requirements into structured automation workflows.',
      'Delivered the full campaign workflow lifecycle — creation, editing, execution, archiving, restoration and deletion — with safeguards preventing mutation of archived workflows.',
      'Introduced tenant-aware data access so campaigns, broadcasts and workflow data stay isolated per organization.',
      'Implemented authenticated EasyWebinar ↔ EasyCRM communication, propagating tenant and company context for secure cross-product operations.',
      'Hardened event processing against idempotency failures, duplicate email sends and timeline inconsistency.',
    ],
    images: [],
  },
  {
    number: '02',
    category: 'SaaS Platform · Real-time',
    name: 'EasyWebinar Platform',
    meta: '100K+ users',
    tagline:
      'The live webinar product itself — where a session cannot drop a frame or a message, at any audience size.',
    liveUrl: 'https://app.easywebinar.com/',
    stack: ['React', 'TypeScript', 'PubNub', 'WebSockets', 'Storybook', 'Next.js', 'Redux', 'Tailwind'],
    impact: [
      { value: '10K+', label: 'Concurrent users' },
      { value: '99.9%', label: 'Real-time uptime' },
      { value: '+20%', label: 'User engagement' },
    ],
    details: [
      'Integrated PubNub for live chat, polls, Q&A and live transcription, sustaining 10,000+ concurrent attendees at 99.9% uptime.',
      'Owned UI/UX end to end and introduced Storybook for component documentation and testing, cutting new-developer onboarding time by 50%.',
      'Optimized video streaming performance and ran user research that lifted engagement 20%.',
      'Built the AI automation module spanning multiple vertical products on the platform.',
    ],
    images: [],
  },
  {
    number: '03',
    category: 'AI Product',
    name: 'EasyWebinar.ai',
    meta: 'AI builder',
    tagline:
      'An AI-powered webinar builder that carries a raw idea through script, funnel, landing pages and emails to a live revenue-generating webinar.',
    liveUrl: 'https://www.easywebinar.ai/',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'AI APIs'],
    impact: [
      { value: 'Idea → Revenue', label: 'Fully AI-generated funnel' },
      { value: 'Minutes', label: 'From concept to live webinar' },
    ],
    details: [
      // TODO(shubham): add your specific contributions and any metrics here.
      'Frontend engineering on the AI product line alongside the core webinar platform.',
      'The product generates the full funnel from a single idea: script, landing pages, email sequences and the webinar itself.',
    ],
    images: [],
  },
  {
    number: '04',
    category: 'Marketing Site · SEO',
    name: 'EasyWebinar.com',
    meta: '40% faster',
    tagline:
      'The conversion-focused public site fronting the platform — rebuilt for speed and search visibility.',
    liveUrl: 'https://easywebinar.com/',
    stack: ['Next.js', 'React', 'WordPress', 'Tailwind', 'SCSS', 'Redux', 'Figma'],
    impact: [
      { value: '40%', label: 'Faster initial load' },
      { value: '90+', label: 'Lighthouse score' },
    ],
    details: [
      'Led full site development in Next.js with a WordPress-backed variant, optimizing for Core Web Vitals and SEO.',
      'Partnered with marketing and design on a responsive, conversion-focused UI.',
      'Managed ongoing technical SEO to grow visibility and organic traffic.',
    ],
    // Captures of the live marketing site.
    images: ['/EasyWebinarS.png', '/EasyWebinarS2.png', '/EasyWebinarS1.png'],
  },
  {
    number: '05',
    category: 'Product · Networking Platform',
    name: 'Catalyst Referrer',
    meta: 'Next.js · SSR',
    tagline:
      'A hybrid professional network and job-referral marketplace — LinkedIn-style connections meeting a referral engine.',
    stack: ['Next.js', 'TypeScript', 'Redux Toolkit', 'React Query', 'Material UI', 'Axios'],
    impact: [
      { value: 'SSR', label: 'Rendered for SEO' },
      { value: 'RTK', label: 'Complex state at scale' },
    ],
    details: [
      'Built the connection graph, profile system and job-matching flows on Next.js with TypeScript.',
      'Modelled complex user profiles, connections and matching state with Redux Toolkit.',
      'Shipped advanced search filters, real-time notifications and a navigation model that kept a dense product legible.',
      'Used SSR/SSG to make an authenticated product still indexable and fast.',
    ],
    images: [],
  },
  {
    number: '06',
    category: 'Real-time · Chat Application',
    name: 'Blabber',
    meta: '<100ms',
    tagline:
      'Real-time messaging with text, media and video calling — built to feel instant and stay accessible.',
    stack: ['React', 'PubNub', 'Redux Toolkit', 'Material UI', 'SCSS'],
    impact: [
      { value: '<100ms', label: 'Message latency' },
      { value: 'WCAG 2.1', label: 'Accessibility standard' },
    ],
    details: [
      'Designed and built the full real-time messaging experience on PubNub, sustaining sub-100ms delivery latency.',
      'Implemented accessible UI patterns compliant with WCAG 2.1.',
      'Delivered a responsive experience consistent across mobile, tablet and desktop.',
    ],
    images: [],
  },
  {
    number: '07',
    category: 'Design & Build · Newsletter App',
    name: 'TheBlackList',
    meta: 'Design + build',
    // Live link intentionally omitted — theblacklist.xyz has lapsed and now
    // resolves to a registrar parking page.
    tagline: 'A mobile news and newsletter reader designed around a calm, uninterrupted reading experience.',
    stack: ['Vue.js', 'Vuetify', 'Figma'],
    impact: [{ value: 'End-to-end', label: 'Design through build' }],
    details: [
      'Owned both the product design in Figma and the frontend implementation.',
      'Built a sleek reading interface prioritising typography, pacing and content hierarchy.',
    ],
    images: [],
  },
];

const ProjectRow = ({ project }: { project: ProjectData }) => {
  const [open, setOpen] = useState(false);
  const hasImages = project.images.length > 0;

  return (
    <div className="group relative border-t border-[#D7E2EA]/12">
      {/* Accent rule drawing left→right on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100"
      />

      {/* Screenshot washing in from the right on hover. Masked so it dissolves
          toward the left before it ever reaches the text.
          Suppressed while open — the panel shows the real images, and running
          both at once puts the same screenshot on screen twice. */}
      {hasImages && !open && (
        <span
          aria-hidden="true"
          className="proj-hover-img pointer-events-none absolute inset-y-0 right-0 w-[65%] overflow-hidden opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 sm:w-[55%]"
          style={{
            maskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.55) 45%, #000 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.55) 45%, #000 100%)',
          }}
        >
          <img
            src={project.images[0]}
            alt=""
            loading="lazy"
            draggable={false}
            className="proj-hover-img-inner h-full w-full translate-x-8 object-cover opacity-[0.17] transition-transform duration-[900ms] ease-out group-hover:translate-x-0"
          />
        </span>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="relative z-10 flex w-full items-start gap-5 py-7 text-left transition-colors duration-300 sm:gap-8 sm:py-9"
      >
        {/* Number */}
        <span
          className="shrink-0 font-black leading-none text-[#D7E2EA]/20 transition-colors duration-300 group-hover:text-white"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
        >
          {project.number}
        </span>

        {/* Name + category + stack */}
        <span className="flex min-w-0 flex-1 flex-col gap-2 transition-transform duration-500 ease-out group-hover:translate-x-1.5">
          <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span
              className="font-medium leading-tight text-[#D7E2EA]"
              style={{ fontSize: 'clamp(1.35rem, 3.2vw, 2.4rem)' }}
            >
              {project.name}
            </span>
            <span className="font-light uppercase tracking-widest text-[#D7E2EA]/45 text-[10px] sm:text-xs">
              {project.category}
            </span>
          </span>

          {/* Full stack, always visible. Truncating here and repeating the rest
              inside the panel put the same chips on screen twice. */}
          <span className="flex flex-wrap gap-2 pt-1">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[#D7E2EA]/12 px-2.5 py-1 text-xs text-[#D7E2EA]/55"
              >
                {tech}
              </span>
            ))}
          </span>
        </span>

        {/* Meta + indicator */}
        <span className="flex shrink-0 items-center gap-4 pt-1.5 sm:gap-6">
          <span className="hidden font-light uppercase tracking-widest text-[#D7E2EA]/45 text-[10px] sm:inline sm:text-xs">
            {project.meta}
          </span>
          <span
            aria-hidden="true"
            className="text-[#D7E2EA]/35 transition-all duration-300 group-hover:text-white"
            style={{ transform: open ? 'rotate(90deg)' : 'none' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </span>
      </button>

      {/* Expanded detail */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-10 sm:grid-cols-[1fr_auto] sm:gap-12 sm:pl-[calc(1.5rem+2rem)]">
              <div className="flex flex-col">
                <p
                  className="max-w-xl font-light leading-relaxed text-[#D7E2EA]/60"
                  style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)' }}
                >
                  {project.tagline}
                </p>

                {/* Impact */}
                <div className="mt-7 flex flex-wrap gap-x-8 gap-y-4">
                  {project.impact.map((m) => (
                    <div key={m.label} className="flex flex-col">
                      <span
                        className="font-bold leading-none text-[#D7E2EA]"
                        style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)' }}
                      >
                        {m.value}
                      </span>
                      <span className="mt-1.5 text-[10px] uppercase tracking-widest text-[#D7E2EA]/40">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* What I did */}
                <ul className="mt-7 flex list-none flex-col gap-3.5 border-l border-[#D7E2EA]/15 pl-5">
                  {project.details.map((d, i) => (
                    <li
                      key={i}
                      className="font-light leading-relaxed text-[#D7E2EA]/60"
                      style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1rem)' }}
                    >
                      {d}
                    </li>
                  ))}
                </ul>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#D7E2EA] px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#0C0C0C] transition hover:scale-[1.03]"
                  >
                    Live site
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Screenshots, when there are any. Fixed aspect ratio so a set of
                  mixed-size captures still reads as a tidy column. */}
              {hasImages && (
                <div className="flex w-full flex-col gap-3 sm:w-[320px] md:w-[400px]">
                  {project.images.slice(0, 2).map((src, i) => (
                    <div
                      key={src}
                      className="aspect-[16/10] overflow-hidden rounded-2xl border border-[#D7E2EA]/10"
                    >
                      <img
                        src={src}
                        alt={`${project.name} interface ${i + 1}`}
                        className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.04]"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="relative z-10 w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 130px)' }}
        >
          Projects
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="text-center font-light uppercase tracking-widest text-[#D7E2EA]/50 mb-14 sm:mb-20"
          style={{ fontSize: 'clamp(0.75rem, 1.3vw, 1rem)' }}
        >
          Selected work · Platforms, real-time systems &amp; interfaces
        </p>
      </FadeIn>

      <div className="mx-auto max-w-6xl">
        {/* Index header */}
        <FadeIn y={20}>
          <div className="flex items-baseline justify-between pb-5">
            <span className="font-light uppercase tracking-[0.28em] text-[#D7E2EA]/35 text-[10px]">
              Selected work
            </span>
            <span className="font-light uppercase tracking-[0.28em] text-[#D7E2EA]/35 text-[10px]">
              {PROJECTS.length} projects
            </span>
          </div>
        </FadeIn>

        <div className="border-b border-[#D7E2EA]/12">
          {PROJECTS.map((project, i) => (
            <FadeIn key={project.number} delay={i * 0.05} y={20}>
              <ProjectRow project={project} />
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .proj-hover-img,
          .proj-hover-img-inner { transition: none !important; transform: none !important; }
        }
        /* Touch devices have no hover — never leave the wash stuck on. */
        @media (hover: none) {
          .proj-hover-img { display: none; }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;
