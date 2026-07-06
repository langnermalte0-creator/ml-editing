import { motion } from 'framer-motion';

const projects = [
  {
    title: "Airbnb: Unofficial Concept Cut",
    category: "Fan Edit",
    description: "A fast-paced, rhythm-driven conceptual commercial exploring travel transitions and architectural symmetry.",
    badge: "Personal Project",
    color: "from-[#8B4513]/40 to-background"
  },
  {
    title: "Neon Nights",
    category: "Music Video",
    description: "Seamless beat-matching and dynamic visual effects for an independent electronic artist's debut single.",
    color: "from-[#1A365D]/40 to-background"
  },
  {
    title: "Lumina Series",
    category: "Commercial Cut",
    description: "High-end product showcase emphasizing macro textures, light flares, and sleek, deliberate pacing.",
    color: "from-[#2D3748]/40 to-background"
  },
  {
    title: "Urban Pulse",
    category: "Social Media Reel",
    description: "High-retention vertical format edit optimized for maximum engagement with aggressive speed ramps.",
    color: "from-[#4C1D95]/40 to-background"
  }
];

export function Projects() {
  return (
    <section className="py-32 bg-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="flex flex-col mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Selected Work
          </h2>
          <p className="text-muted-foreground font-light max-w-xl text-lg">
            A curated selection of commercial cuts, music videos, and personal projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="group cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 2) * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`relative aspect-[16/9] rounded-sm overflow-hidden mb-6 bg-gradient-to-br ${project.color} border border-white/5 group-hover:border-primary/30 transition-colors duration-500`}>
                {/* Abstract placeholder for the video thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-black/30 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                    <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[12px] border-l-white ml-1 opacity-90 group-hover:border-l-primary transition-colors" />
                  </div>
                </div>
                
                {project.badge && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md text-primary text-xs font-semibold tracking-widest uppercase border border-primary/20 rounded-sm">
                    {project.badge}
                  </div>
                )}
              </div>
              
              <div>
                <div className="text-xs text-muted-foreground font-semibold tracking-widest uppercase mb-3">
                  {project.category}
                </div>
                <h3 className="font-display text-2xl font-medium text-white mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}