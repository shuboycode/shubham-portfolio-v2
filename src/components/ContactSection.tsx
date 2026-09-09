import { Mail, MessageCircle, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';

interface ContactMethod {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  /**
   * Each service's real brand colour. The rest of the site is monochrome by
   * design — these are the deliberate exception, because they identify a
   * specific service rather than decorating. Hover only.
   */
  accent: string;
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: Mail,
    label: 'Email',
    value: 'kumarshubham121998@gmail.com',
    href: 'mailto:kumarshubham121998@gmail.com',
    accent: '#EA4335',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    // wa.me requires country code + digits only — no +, no spaces, no hyphens
    value: '+91 78883 97663',
    href: 'https://wa.me/917888397663',
    accent: '#25D366',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/shubh-kumar-dev',
    href: 'https://www.linkedin.com/in/shubh-kumar-dev',
    accent: '#0A66C2',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@shuboycode',
    href: 'https://github.com/shuboycode',
    accent: '#A371F7',
  },
];

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="relative w-full bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20"
    >
      {/* Heading */}
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 130px)' }}
        >
          Get in touch
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="text-center font-light uppercase tracking-widest text-[#D7E2EA]/60 mb-12 sm:mb-16 md:mb-20"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
        >
          Pick whichever channel suits you
        </p>
      </FadeIn>

      {/* Contact cards */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {CONTACT_METHODS.map((method, i) => {
          const Icon = method.icon;
          const isExternal = method.href.startsWith('http');

          return (
            <FadeIn key={method.label} delay={i * 0.1} y={30}>
              <a
                href={method.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[28px] sm:rounded-[32px] border-2 border-[#D7E2EA]/20 bg-[#141418] p-6 sm:p-7 md:p-8 transition-all duration-300 hover:border-[#D7E2EA]/50 hover:-translate-y-1"
              >
                {/* Oversized glyph watermark, bleeding off the bottom-right corner */}
                <Icon
                  aria-hidden="true"
                  strokeWidth={1}
                  className="pointer-events-none absolute -bottom-8 -right-7 h-40 w-40 text-[#D7E2EA] opacity-[0.04] transition-all duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110 group-hover:opacity-[0.09]"
                />

                {/* Brand-tinted glow, only on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(130% 100% at 100% 100%, ${method.accent}2E 0%, ${method.accent}0A 35%, transparent 65%)`,
                  }}
                />

                {/* Top row */}
                <div className="relative flex items-start justify-between">
                  <div className="rounded-full border border-[#D7E2EA]/20 p-3 sm:p-3.5 transition-colors duration-300 group-hover:border-[#D7E2EA]/45">
                    <Icon className="text-[#D7E2EA]" size={22} strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight
                    className="text-[#D7E2EA]/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#D7E2EA]"
                    size={22}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Bottom text. The value reserves two lines so single-line
                    values don't pull their label out of line with the others. */}
                <div className="relative flex flex-col gap-2">
                  <span
                    className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
                    style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.85rem)' }}
                  >
                    {method.label}
                  </span>
                  <span
                    className="flex min-h-[2.7em] items-start font-medium leading-[1.35] text-[#D7E2EA] break-words"
                    style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)' }}
                  >
                    {method.value}
                  </span>
                </div>

                {/* Accent underline that draws in on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] w-0 transition-all duration-500 ease-out group-hover:w-full"
                  style={{ background: `linear-gradient(90deg, ${method.accent}, transparent)` }}
                />
              </a>
            </FadeIn>
          );
        })}
      </div>

      {/* Footer line */}
      <FadeIn delay={0.4} y={20}>
        <div className="mx-auto mt-20 sm:mt-24 md:mt-28 flex max-w-5xl flex-col items-center gap-3 border-t border-[#D7E2EA]/10 pt-8 text-center sm:flex-row sm:justify-between">
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            © 2026 Shubham Kumar
          </span>
          <span
            className="font-light uppercase tracking-widest text-[#D7E2EA]/50"
            style={{ fontSize: 'clamp(0.7rem, 1.1vw, 0.9rem)' }}
          >
            Designed & built in Hyderabad, India
          </span>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;
