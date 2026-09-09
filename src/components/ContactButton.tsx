interface ContactButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const ContactButton = ({
  label = 'Contact Me',
  href = '#contact',
  onClick,
  className = '',
}: ContactButtonProps) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full bg-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-widest text-[#0C0C0C] whitespace-nowrap transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(215,226,234,0.2)] active:scale-[0.98] ${className}`}
    >
      {label}
    </a>
  );
};

export default ContactButton;
