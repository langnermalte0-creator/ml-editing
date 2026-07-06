import { motion } from 'framer-motion';

const word1 = ['Jeder', 'Frame'];
const word2 = ['erzählt', 'die', 'Story.'];

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const wordVariant = {
  hidden: { opacity: 0, y: 40, skewY: 2 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.8, delay: 0.1 + i * 0.12, ease: EASE },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">

      {/* ── Deep amber radial background glow ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full bg-primary/5 blur-[140px]" />
        <div className="absolute top-[30%] left-[20%] w-[30vw] h-[30vw] rounded-full bg-red-900/5 blur-[100px]" />
      </div>

      {/* ── Film grain overlay ── */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full z-[1] pointer-events-none select-none"
        style={{ opacity: 0.045 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="grain-hero">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-hero)" />
      </svg>

      {/* ── Vignette ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 px-5 py-2 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-semibold tracking-[0.18em] uppercase inline-flex items-center gap-2.5 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Verfügbar für Projekte
        </motion.div>

        {/* Headline — word by word */}
        <div className="overflow-hidden mb-3">
          <h1 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.1] font-bold tracking-tight text-white inline-flex flex-wrap justify-center gap-x-[0.25em]">
            {word1.map((w, i) => (
              <motion.span
                key={w}
                custom={i}
                variants={wordVariant}
                initial="hidden"
                animate="visible"
                style={{ display: 'inline-block' }}
              >
                {w}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Italic subtitle line */}
        <div className="overflow-hidden mb-10">
          <h1 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.1] font-normal tracking-tight text-primary italic inline-flex flex-wrap justify-center gap-x-[0.22em] pr-4">
            {word2.map((w, i) => (
              <motion.span
                key={w}
                custom={word1.length + i}
                variants={wordVariant}
                initial="hidden"
                animate="visible"
                style={{ display: 'inline-block' }}
              >
                {w}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Sub-copy */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto leading-relaxed mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          Professionelles Videoediting aus Deutschland. Rohmaterial wird zu cineastischen Sequenzen, die Aufmerksamkeit befehlen.
        </motion.p>

        {/* Divider line */}
        <motion.div
          className="w-px h-1 bg-primary/40 mb-2 rounded-full"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        />
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 1, delay: 1.3 }}
      >
        <span className="text-[10px] uppercase tracking-[0.22em] text-white">Scroll</span>
        <motion.div
          className="w-px bg-gradient-to-b from-white/60 to-transparent"
          initial={{ height: 0 }}
          animate={{ height: 48 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </section>
  );
}
