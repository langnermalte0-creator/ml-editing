import { motion } from 'framer-motion';

const services = [
  { title: 'Werbefilm-Schnitt',   description: 'Wirkungsstarke Schnitte für Ads, Produktvideos und Markenkampagnen.' },
  { title: 'Imagefilm-Editing',  description: 'Corporate- und Imagefilme präzise geschnitten – nur Editing, kein Filming.' },
  { title: 'Social Media Content', description: 'Kurzvideos, Reels und TikToks, optimiert für maximale Aufmerksamkeit.' },
  { title: 'YouTube-Videos',     description: 'Professionell geschnittene YouTube-Inhalte – von Gaming bis Lifestyle, immer auf den Punkt.' },
  { title: 'Dokumentation',      description: 'Ruhige, atmosphärische Schnitte, die Geschichten und Menschen authentisch erzählen.' },
];

export function Services() {
  return (
    <section className="py-20 md:py-32 bg-background border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-12 md:mb-24">
          <motion.h2
            className="font-display text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
          >
            Präziser Schnitt.<br className="hidden sm:block" /> Kein Schnickschnack.
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-xl text-base md:text-xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1 }}
          >
            Ein Post-Production-Studio, das sich ausschließlich auf die Kunst des Schnitts konzentriert. Kein Filming – nur präzises Editing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-6 md:p-10 rounded-sm bg-card border border-card-border group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ borderColor: 'rgba(255,176,0,0.4)' }}
            >
              {/* Amber radial on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(255,176,0,0.07), transparent 70%)' }}
              />

              {/* Light streak */}
              <div className="absolute inset-0 overflow-hidden rounded-sm pointer-events-none">
                <div className="absolute top-0 bottom-0 -left-full w-full bg-gradient-to-r from-transparent via-white/[0.018] to-transparent group-hover:translate-x-[250%] transition-transform duration-[1800ms] ease-in-out" />
              </div>

              {/* Index ghost number */}
              <div className="absolute top-4 md:top-6 right-5 md:right-8 font-display text-4xl md:text-5xl font-bold text-white/[0.04] group-hover:text-primary/10 transition-colors duration-300 pointer-events-none select-none">
                0{index + 1}
              </div>

              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 h-[1px] bg-primary"
                initial={{ width: '0%' }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />

              <h3 className="relative z-10 font-display text-xl md:text-2xl font-medium text-white mb-3 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="relative z-10 text-muted-foreground font-light leading-relaxed text-sm md:text-base">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
