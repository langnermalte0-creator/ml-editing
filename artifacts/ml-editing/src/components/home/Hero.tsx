import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium tracking-widest uppercase inline-flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Verfügbar für Projekte
        </motion.div>

        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.1] font-bold tracking-tight text-white mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Jeder Frame <br />
          <span className="text-primary italic font-normal pr-4">erzählt die Story.</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Professionelles Videoediting aus Deutschland. Rohmaterial wird zu cineastischen Sequenzen, die Aufmerksamkeit befehlen.
        </motion.p>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}
