import { motion } from 'framer-motion';

const stats = [
  { value: '15+', label: 'Projekte abgeschlossen' },
  { value: '2', label: 'Jahre Erfahrung' },
  { value: '100%', label: 'Kundenzufriedenheit' },
  { value: 'Frame-Perfect', label: 'Präzise Lieferung' }
];

export function Stats() {
  return (
    <section className="py-24 bg-card border-b border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[80vw] md:w-[40vw] h-full bg-[radial-gradient(ellipse_at_right,rgba(255,176,0,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="font-display text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-primary tracking-widest uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
