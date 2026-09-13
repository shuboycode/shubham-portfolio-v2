import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Boxes, Database, Gauge, Palette, Radio, UsersRound } from 'lucide-react';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import AnimatedText from './AnimatedText';

const ABOUT_TEXT =
  "I'm an SDE 1 and Frontend Engineer with 5+ years of experience building production web applications with React, Next.js and TypeScript. I specialize in scalable UI architecture, performance optimization, real-time experiences and design-driven product development.";

const HOW_I_BUILD = [
  {
    title: 'Scalable Frontends',
    description: 'React, Next.js and TypeScript applications built with reusable component architecture.',
    tags: ['React', 'Next.js', 'TypeScript'],
    icon: Boxes,
  },
  {
    title: 'Performance Engineering',
    description: 'Code splitting, lazy loading, caching and rendering strategy for better Core Web Vitals.',
    tags: ['Lighthouse', 'SSR', 'Caching'],
    icon: Gauge,
  },
  {
    title: 'Real-Time Systems',
    description: 'Interactive product experiences built for live collaboration and reliable event-driven flows.',
    tags: ['PubNub', 'WebSockets', 'Realtime'],
    icon: Radio,
  },
  {
    title: 'Backend & Data',
    description: 'API-driven product architecture with NestJS, PostgreSQL and Prisma for production systems.',
    tags: ['NestJS', 'PostgreSQL', 'Prisma'],
    icon: Database,
  },
  {
    title: 'Product Development',
    description: 'Turning product requirements and Figma designs into production-ready experiences.',
    tags: ['Figma', 'Product', 'UI'],
    icon: Palette,
  },
  {
    title: 'Team Leadership',
    description: 'Frontend delivery, technical decisions, mentoring and collaborative engineering execution.',
    tags: ['Leadership', 'Reviews', 'Mentoring'],
    icon: UsersRound,
  },
];

/**
 * Decorative 3D renders, self-hosted in /public/decor.
 *
 * `depth` drives the parallax: the number is how far (in px) the object travels
 * across the section's full scroll range. Larger = nearer the viewer = moves
 * more. Opposite signs on the top and bottom pairs make them separate as you
 * scroll instead of drifting as one flat plane.
 */
const DECOR = [
  {
    src: '/decor/moon.png',
    className: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[60px] sm:w-[160px] md:w-[210px]',
    x: -80,
    delay: 0.1,
    depth: -70,
    spin: -6,
  },
  {
    src: '/decor/orb.png',
    className: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[55px] sm:w-[140px] md:w-[180px]',
    x: -80,
    delay: 0.25,
    depth: 130,
    spin: 8,
  },
  {
    src: '/decor/blocks.png',
    className: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[60px] sm:w-[160px] md:w-[210px]',
    x: 80,
    delay: 0.15,
    depth: -110,
    spin: 7,
  },
  {
    src: '/decor/shape.png',
    className: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[65px] sm:w-[170px] md:w-[220px]',
    x: 80,
    delay: 0.3,
    depth: 90,
    spin: -9,
  },
];

interface DecorLayerProps {
  item: (typeof DECOR)[number];
  progress: MotionValue<number>;
}

/**
 * Outer element owns the scroll parallax, inner element owns the entry fade.
 * They have to stay on separate nodes — a `whileInView` y animation and a
 * scroll-bound y MotionValue would otherwise fight over the same transform.
 */
const DecorLayer = ({ item, progress }: DecorLayerProps) => {
  const reduceMotion = useReducedMotion();

  const rawY = useTransform(progress, [0, 1], [item.depth, -item.depth]);
  const rawRotate = useTransform(progress, [0, 1], [-item.spin, item.spin]);

  // Spring smoothing keeps the motion from feeling pinned to the scrollbar.
  const y = useSpring(rawY, { stiffness: 60, damping: 20, mass: 0.6 });
  const rotate = useSpring(rawRotate, { stiffness: 50, damping: 20, mass: 0.6 });

  if (reduceMotion) {
    return (
      <FadeIn
        delay={item.delay}
        x={item.x}
        y={0}
        duration={0.9}
        className={`pointer-events-none absolute ${item.className}`}
      >
        <img src={item.src} alt="" className="h-auto w-full" loading="lazy" draggable={false} />
      </FadeIn>
    );
  }

  return (
    <motion.div
      style={{ y, rotate, willChange: 'transform' }}
      className={`pointer-events-none absolute ${item.className}`}
    >
      <motion.img
        src={item.src}
        alt=""
        className="h-auto w-full"
        loading="lazy"
        draggable={false}
        initial={{ opacity: 0, x: item.x }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '50px' }}
        transition={{ delay: item.delay, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </motion.div>
  );
};

/**
 * `core` marks the primary stack — rendered brighter so a hiring manager can
 * tell depth from familiarity instead of reading one flat wall of tags.
 */
const SKILL_GROUPS: { label: string; items: { name: string; core?: boolean }[] }[] = [
  {
    label: 'Frontend Engineering',
    items: [
      { name: 'JavaScript', core: true },
      { name: 'TypeScript', core: true },
      { name: 'React.js', core: true },
      { name: 'Next.js', core: true },
      { name: 'HTML5', core: true },
      { name: 'CSS3', core: true },
      { name: 'SCSS' },
    ],
  },
  {
    label: 'State & Data',
    items: [
      { name: 'Redux Toolkit', core: true },
      { name: 'TanStack Query', core: true },
      { name: 'REST APIs', core: true },
      { name: 'JSON' },
      { name: 'SSR / SSG / ISR', core: true },
    ],
  },
  {
    label: 'UI & Design',
    items: [
      { name: 'Storybook', core: true },
      { name: 'Tailwind CSS', core: true },
      { name: 'Material UI' },
      { name: 'Figma', core: true },
      { name: 'Framer Motion' },
    ],
  },
  {
    label: 'Real-time & Backend',
    items: [
      { name: 'WebSockets', core: true },
      { name: 'PubNub', core: true },
      { name: 'Node.js', core: true },
      { name: 'NestJS', core: true },
      { name: 'PostgreSQL', core: true },
      { name: 'Prisma', core: true },
      { name: 'Multi-tenant SaaS', core: true },
      { name: 'Event-Driven Architecture', core: true },
    ],
  },
  {
    label: 'Cloud & Tools',
    items: [
      { name: 'AWS', core: true },
      { name: 'Vercel', core: true },
      { name: 'Git / GitHub', core: true },
      { name: 'CI/CD', core: true },
      { name: 'WordPress' },
    ],
  },
  {
    label: 'Performance',
    items: [
      { name: 'Core Web Vitals', core: true },
      { name: 'Lighthouse', core: true },
      { name: 'Code splitting', core: true },
      { name: 'SEO', core: true },
      { name: 'Responsive Design', core: true },
    ],
  },
  {
    label: 'AI & Product',
    items: [
      { name: 'AI API Integration', core: true },
      { name: 'Prompt Engineering', core: true },
      { name: 'Frontend Architecture', core: true },
      { name: 'Product Development', core: true },
      { name: 'Team Leadership', core: true },
    ],
  },
];

const CAPABILITIES = [
  'Frontend Architecture',
  'Performance Engineering',
  'Real-Time Applications',
  'Full-Stack Development',
  'Team Leadership',
  'Product Development',
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // One scroll subscription for the whole section, shared by every layer,
  // rather than four independent listeners.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Corner decorative 3D renders, drifting at different rates */}
      {DECOR.map((d) => (
        <DecorLayer key={d.src} item={d} progress={scrollYProgress} />
      ))}

      {/* Center content */}
      <div className="relative z-10 flex w-full flex-col items-center gap-10 sm:gap-14 md:gap-16 text-center">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 130px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex w-full flex-col items-center gap-12 sm:gap-16 md:gap-20">
          <AnimatedText
            text={ABOUT_TEXT}
            className="font-light leading-relaxed text-[#D7E2EA] max-w-[640px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}
          />

          <FadeIn delay={0.15} className="w-full max-w-5xl">
            <div className="hidden flex-col items-center gap-4 md:flex">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#D7E2EA]/45">
                How I build
              </p>
              <div className="grid w-full gap-3 md:grid-cols-2 xl:grid-cols-3">
                {HOW_I_BUILD.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[18px] border border-[#D7E2EA]/10 bg-[#141418]/60 px-3.5 py-3 text-left transition-colors duration-300 hover:border-[#D7E2EA]/20"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-medium text-[#D7E2EA] text-sm sm:text-base">{item.title}</h3>
                      <span className="text-[9px] uppercase tracking-[0.18em] text-[#D7E2EA]/45">{item.tags[0]}</span>
                    </div>
                    <p className="mt-2 font-light leading-relaxed text-[#D7E2EA]/65 text-xs sm:text-[0.8rem]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="w-full max-w-md md:hidden">
            <div className="flex flex-col gap-5 text-left">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#D7E2EA]/45">
                  Engineering capabilities
                </p>
                <p className="mt-3 max-w-sm font-light leading-relaxed text-[#D7E2EA]/65 text-sm">
                  I design and build scalable, high-performance web applications with a focus on clean architecture, real-world impact, and great user experiences.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {HOW_I_BUILD.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <article
                      key={item.title}
                      className="group relative overflow-hidden rounded-2xl border border-[#D7E2EA]/10 bg-[#111217]/90 px-4 py-4 transition-colors duration-300 hover:border-[#D7E2EA]/25"
                    >
                      <span className="absolute left-0 top-0 h-full w-px bg-[#D7E2EA]/20 transition-colors duration-300 group-hover:bg-[#D7E2EA]/70" />
                      <div className="flex items-start gap-3.5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D7E2EA]/10 bg-[#D7E2EA]/[0.04] text-[#D7E2EA]/80">
                          <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-baseline gap-2.5">
                              <span className="text-[9px] font-medium tracking-[0.16em] text-[#D7E2EA]/35">
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <h3 className="font-medium leading-tight text-[#D7E2EA] text-sm">
                                {item.title}
                              </h3>
                            </div>
                          </div>
                          <p className="mt-1.5 font-light leading-relaxed text-[#D7E2EA]/55 text-[11px]">
                            {item.description}
                          </p>
                          <div className="mt-2.5 flex flex-wrap gap-1.5">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-[#D7E2EA]/10 px-2 py-1 text-[9px] text-[#D7E2EA]/55"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.18} className="w-full max-w-4xl">
            <div className="hidden flex-col items-center gap-4 md:flex">
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#D7E2EA]/45">
                Engineering capabilities
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {CAPABILITIES.map((capability) => (
                  <span
                    key={capability}
                    className="rounded-full border border-[#D7E2EA]/20 bg-[#D7E2EA]/[0.04] px-3.5 py-2 text-sm text-[#D7E2EA]/75"
                  >
                    {capability}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Skills */}
          <FadeIn delay={0.22} className="w-full max-w-3xl">
            <div className="mx-auto flex w-full max-w-md flex-col gap-5 sm:max-w-3xl sm:gap-6">
              {SKILL_GROUPS.map((group) => (
                <div
                  key={group.label}
                  className="flex flex-col items-start gap-2.5 text-left sm:flex-row sm:items-baseline sm:gap-5"
                >
                  <span className="w-full text-[10px] uppercase tracking-[0.2em] text-[#D7E2EA]/35 sm:w-40 sm:shrink-0 sm:text-right sm:text-[11px] sm:tracking-widest">
                    {group.label}
                  </span>
                  <div className="flex w-full flex-wrap justify-start gap-1.5 sm:gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item.name}
                        className={
                          item.core
                            ? 'rounded-full border border-[#D7E2EA]/30 bg-[#D7E2EA]/[0.07] px-2.5 py-1 text-xs text-[#D7E2EA] transition-colors hover:border-[#D7E2EA]/60 sm:px-3 sm:text-sm'
                            : 'rounded-full border border-[#D7E2EA]/10 px-2.5 py-1 text-xs text-[#D7E2EA]/50 transition-colors hover:border-[#D7E2EA]/30 hover:text-[#D7E2EA]/80 sm:px-3 sm:text-sm'
                        }
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
