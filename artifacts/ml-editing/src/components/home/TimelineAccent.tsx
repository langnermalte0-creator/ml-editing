import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import timelineImg2 from '@assets/Screenshot_2026-01-01_014849_1783250853702.png';

export function TimelineAccent() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Subtle parallax — image drifts up as you scroll past
  const y = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

  // Image sharpens as it centres in the viewport, blurs back out at the edges
  const filterStyle = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      'blur(6px) brightness(0.35)',
      'blur(0px) brightness(0.45)',
      'blur(0px) brightness(0.45)',
      'blur(5px) brightness(0.35)',
    ]
  );

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-background"
      style={{ height: 340 }}
    >
      {/* Full-bleed parallax image */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.img
          src={timelineImg2}
          alt="Premiere Pro Timeline — Projekt-Einblick"
          className="w-full h-full object-cover object-center"
          style={{ filter: filterStyle }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Edge gradients — blend into surrounding sections */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/70 pointer-events-none z-10" />

      {/* Label */}
      <div className="absolute inset-0 flex items-center z-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
