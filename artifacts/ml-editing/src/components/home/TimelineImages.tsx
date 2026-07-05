import { motion } from 'framer-motion';
import timelineImg1 from '@assets/Screenshot_2025-11-09_220438_1783250853701.png';
import timelineBanner from '@assets/ML-Editing_YT_Banner_1783250853701.png';

// This strip only uses the banner + first screenshot.
// The second screenshot appears separately via TimelineAccent.

const images = [timelineBanner, timelineImg1, timelineBanner, timelineImg1];

export function TimelineImages() {
  return (
    <section className="relative w-full py-20 bg-[#050505] overflow-hidden border-y border-white/5">
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
        <motion.p
          className="text-xs font-semibold tracking-widest uppercase text-primary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Hinter den Kulissen
        </motion.p>
        <motion.h2
          className="font-display text-3xl md:text-4xl font-semibold text-white mt-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Die Timeline erzählt die halbe Geschichte.
        </motion.h2>
      </div>

      {/* Scrolling strip */}
      <div className="relative w-full overflow-hidden" style={{ height: 220 }}>
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex gap-4 absolute top-0"
          style={{ width: 'max-content' }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
        >
          {[...images, ...images].map((img, i) => (
            <div
              key={i}
              className="relative shrink-0 rounded-sm overflow-hidden border border-white/10"
              style={{ width: 420, height: 220 }}
            >
              <img
                src={img}
                alt={`Timeline ${i}`}
                className="w-full h-full object-cover"
                style={{ filter: 'blur(0.4px) brightness(0.82)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
