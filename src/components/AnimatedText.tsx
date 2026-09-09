import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

interface WordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

/**
 * One subscription per word rather than per character. The previous per-char
 * version created ~280 spans each driving its own scroll transform, which
 * dropped frames on mid-range phones.
 */
const Word = ({ word, index, total, progress }: WordProps) => {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span style={{ opacity, display: 'inline-block' }}>
      {word}
      {' '}
    </motion.span>
  );
};

const AnimatedText = ({ text, className, style }: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.4'],
  });

  if (reduceMotion) {
    return (
      <p ref={ref} className={className} style={style}>
        {text}
      </p>
    );
  }

  const words = text.split(' ');

  return (
    <p ref={ref} className={className} style={style}>
      {/* Readable copy for assistive tech; the animated words are decorative. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Word key={i} word={word} index={i} total={words.length} progress={scrollYProgress} />
        ))}
      </span>
    </p>
  );
};

export default AnimatedText;
