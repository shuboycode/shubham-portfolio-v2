import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import AnimatedText from './AnimatedText';

const ABOUT_TEXT =
  "I'm Shubham Kumar, a frontend engineer based in India, building for international product teams. Over 5+ years I've shipped SaaS platforms that stay fast under load — at EasyWebinar, a US webinar product, the real-time systems holding 10,000+ concurrent users and the performance work that made pages load 40% faster. On EasyCRM I work across the stack, React through NestJS and PostgreSQL, shipping AI that turns plain English into runnable marketing workflows.";

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
    label: 'Languages',
    items: [
      { name: 'JavaScript', core: true },
      { name: 'TypeScript', core: true },
      { name: 'HTML5', core: true },
      { name: 'CSS3', core: true },
      { name: 'SCSS' },
      { name: 'jQuery' },
    ],
  },
  {
    label: 'Frameworks',
    items: [
      { name: 'React', core: true },
      { name: 'Next.js — SSR / SSG / ISR', core: true },
      { name: 'Redux Toolkit', core: true },
      { name: 'React Query', core: true },
      { name: 'Vue.js' },
      { name: 'Angular' },
    ],
  },
  {
    label: 'UI & Design Systems',
    items: [
      { name: 'Storybook', core: true },
      { name: 'Tailwind CSS', core: true },
      { name: 'Material UI' },
      { name: 'Chakra UI' },
      { name: 'Bootstrap' },
      { name: 'GrapesJS' },
    ],
  },
  {
    label: 'Real-time & Backend',
    items: [
      { name: 'Event-Driven Architecture', core: true },
      { name: 'WebSockets', core: true },
      { name: 'PubNub', core: true },
      { name: 'REST APIs', core: true },
      { name: 'Node.js', core: true },
      { name: 'NestJS', core: true },
      { name: 'PostgreSQL', core: true },
      { name: 'Prisma', core: true },
      { name: 'Multi-tenant SaaS', core: true },
      { name: 'MongoDB' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    items: [
      // Shown broad by choice. Backed by hands-on work with S3, EC2, Lambda,
      // CloudFront and Route 53 — enough to answer "which services?" in a screen.
      { name: 'AWS', core: true },
      { name: 'Vercel', core: true },
      { name: 'CI/CD', core: true },
      { name: 'Azure DevOps' },
      { name: 'Git / GitHub' },
    ],
  },
  {
    label: 'Performance',
    items: [
      { name: 'Core Web Vitals', core: true },
      { name: 'Lighthouse', core: true },
      { name: 'SSR / SSG / ISR', core: true },
      { name: 'Code splitting' },
      { name: 'GTmetrix' },
      { name: 'Contentful' },
    ],
  },
  {
    label: 'AI & Design',
    items: [
      { name: 'AI API Integration', core: true },
      { name: 'Prompt Engineering', core: true },
      { name: 'Figma', core: true },
      { name: 'Framer Motion' },
      { name: 'GSAP' },
      { name: 'WCAG' },
      { name: 'Cursor' },
    ],
  },
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

          {/* Skills */}
          <FadeIn delay={0.15} className="w-full max-w-3xl">
            <div className="flex flex-col gap-5 sm:gap-6">
              {SKILL_GROUPS.map((group) => (
                <div
                  key={group.label}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5 text-left"
                >
                  <span className="text-[11px] uppercase tracking-widest text-[#D7E2EA]/35 sm:w-40 sm:shrink-0 sm:text-right">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item.name}
                        className={
                          item.core
                            ? 'rounded-full border border-[#D7E2EA]/30 bg-[#D7E2EA]/[0.07] px-3 py-1 text-sm text-[#D7E2EA] transition-colors hover:border-[#D7E2EA]/60'
                            : 'rounded-full border border-[#D7E2EA]/10 px-3 py-1 text-sm text-[#D7E2EA]/50 transition-colors hover:border-[#D7E2EA]/30 hover:text-[#D7E2EA]/80'
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
