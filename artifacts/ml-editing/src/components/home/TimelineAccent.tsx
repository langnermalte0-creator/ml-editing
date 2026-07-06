import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import timelineImg1   from '@assets/Screenshot_2025-11-09_220438_1783250853701.png';
import timelineImg2   from '@assets/Screenshot_2026-01-01_014849_1783250853702.png';
import timelineBanner from '@assets/ML-Editing_YT_Banner_1783250853701.png';

const slides = [timelineImg2, timelineImg1, timelineBanner];

export function TimelineAccent() {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  // Slow cross-dissolve slideshow — change every 5 s
  useEffect(() => {
    const id = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Subtle parallax
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  // Brightness animates as section scrolls into / out of view
  const brightness = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.30, 0.48, 0.48, 0.30]
  );

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-background"
      style={{ height: 360 }}
    >
      {/* Parallax wrapper */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {/* Cross-dissolve slideshow */}
        <AnimatePresence>
          <motion.img
            key={current}
            src={slides[current]}
            alt="Premiere Pro Timeline"
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        {/* Brightness overlay controlled by scroll */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: useTransform(brightness, b => 1 - b) }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />

      {/* Edge gradients — blend into surrounding sections */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60 pointer-events-none z-10" />

      {/* Slide indicator dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-1 h-1 rounded-full transition-all duration-500"
            style={{
              background: i === current ? 'rgba(255,176,0,0.9)' : 'rgba(255,255,255,0.25)',
              transform: i === current ? 'scale(1.6)' : 'scale(1)',
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Label */}
      <div className="absolute inset-0 flex items-center z-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Direkt aus Premiere Pro
            </p>
            <p className="font-display text-2xl md:text-3xl font-medium text-white/90 max-w-sm leading-snug">
              Frame-perfekter Schnitt.<br />
              <span className="text-primary">Kein Kompromiss.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
