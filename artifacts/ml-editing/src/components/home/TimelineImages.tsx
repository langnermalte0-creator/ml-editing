import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useCallback } from 'react';
import timelineImg1   from '@assets/Screenshot_2025-11-09_220438_1783250853701.png';
import timelineBanner from '@assets/ML-Editing_YT_Banner_1783250853701.png';

const images = [timelineBanner, timelineImg1, timelineBanner, timelineImg1];
const ALL_IMGS = [...images, ...images]; // doubled for seamless loop

// Pixels moved per millisecond
const SPEED_NORMAL = 0.055;
const SPEED_HOVER  = 0.015; // ~27% speed on hover

export function TimelineImages() {
  const stripRef    = useRef<HTMLDivElement>(null);
  const x           = useMotionValue(0);
  const pos         = useRef(0);
  const curSpeed    = useRef(SPEED_NORMAL);
  const targetSpeed = useRef(SPEED_NORMAL);

  // Drive the strip manually so we can change speed mid-animation without jumps
  useAnimationFrame((_, delta) => {
    // Smooth acceleration/deceleration — 4% lerp per frame
    curSpeed.current += (targetSpeed.current - curSpeed.current) * 0.04;

    pos.current -= curSpeed.current * delta;

    // Seamless loop: reset once we've scrolled one full copy of the images
    const el = stripRef.current;
    if (el) {
      const halfWidth = el.scrollWidth / 2;
      if (pos.current <= -halfWidth) pos.current += halfWidth;
    }

    x.set(pos.current);
  });

  const handleEnter = useCallback(() => { targetSpeed.current = SPEED_HOVER; }, []);
  const handleLeave = useCallback(() => { targetSpeed.current = SPEED_NORMAL; }, []);

  return (
    <section
      className="relative w-full py-20 bg-[#050505] overflow-hidden border-y border-white/5"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10 pointer-events-none">
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

        {/* Hover hint */}
        <motion.p
          className="text-[10px] tracking-widest uppercase text-white/25 mt-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          ↓ Hover zum Verlangsamen
        </motion.p>
      </div>

      {/* Scrolling strip */}
      <div className="relative w-full overflow-hidden" style={{ height: 220 }}>
        {/* Edge gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        <motion.div
          ref={stripRef}
          className="flex gap-4 absolute top-0"
          style={{ x, width: 'max-content' }}
        >
          {ALL_IMGS.map((img, i) => (
            <div
              key={i}
              className="relative shrink-0 rounded-sm overflow-hidden border border-white/10 group/img"
              style={{ width: 420, height: 220 }}
            >
              <img
                src={img}
                alt={`Timeline ${i}`}
                className="w-full h-full object-cover transition-all duration-500 group-hover/img:brightness-100"
                style={{ filter: 'blur(0.3px) brightness(0.80)' }}
              />
              {/* Warm amber tint on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent opacity-60 group-hover/img:opacity-100 transition-opacity duration-500" />
              {/* Subtle inner border glow on hover */}
              <div className="absolute inset-0 rounded-sm ring-1 ring-inset ring-primary/0 group-hover/img:ring-primary/20 transition-all duration-500" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
