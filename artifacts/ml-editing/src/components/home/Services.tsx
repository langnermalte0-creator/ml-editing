import { motion } from 'framer-motion';

const services = [
  {
    title: 'Werbefilm-Schnitt',
    description: 'Wirkungsstarke Schnitte für Ads, Produktvideos und Markenkampagnen.'
  },
  {
    title: 'Imagefilm-Editing',
    description: 'Corporate- und Imagefilme präzise geschnitten – nur Editing, kein Filming.'
  },
  {
    title: 'Social Media Content',
    description: 'Kurzvideos, Reels und TikToks, optimiert für maximale Aufmerksamkeit.'
  },
  {
    title: 'YouTube-Videos',
    description: 'Professionell geschnittene YouTube-Inhalte – von Gaming bis Lifestyle, immer auf den Punkt.'
  },
  {
    title: 'Dokumentation',
    description: 'Ruhige, atmosphärische Schnitte, die Geschichten und Menschen authentisch erzählen.'
  }
];

export function Services() {
  return (
    <section className="py-32 bg-background border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 md:mb-28">
          <motion.h2
            className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
          >
            Präziser Schnitt. <br className="hidden md:block" /> Kein Schnickschnack.
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-xl text-lg md:text-xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
          >
            Ein Post-Production-Studio, das sich ausschließlich auf die Kunst des Schnitts konzentriert. Kein Filming – nur präzises Editing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-10 rounded-sm bg-card border border-card-border hover:border-primary/50 transition-colors group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-6 right-8 font-display text-5xl font-bold text-white/5 group-hover:text-primary/10 transition-colors pointer-events-none">
                0{index + 1}
              </div>
              <h3 className="relative z-10 font-display text-2xl font-medium text-white mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="relative z-10 text-muted-foreground font-light leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
