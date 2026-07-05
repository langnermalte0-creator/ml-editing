import { motion } from 'framer-motion';
import imgAe from '@assets/logo_ae.png';
import imgPr from '@assets/logo_pr.png';
import imgDaVinci from '@assets/logo_davinci.png';

// All three logos have black backgrounds — mix-blend-mode: screen makes black
// transparent on any dark surface, revealing only the coloured icon.

const LOGO_STYLE: React.CSSProperties = {
  mixBlendMode: 'screen',
  filter: 'brightness(1.1)',
};

// ─── Data ───────────────────────────────────────────────────────────────────

const tools = [
  {
    name: 'Premiere Pro',
    img: imgPr,
    accent: 'rgba(153,153,255,0.10)',
    border: 'rgba(153,153,255,0.25)',
  },
  {
    name: 'After Effects',
    img: imgAe,
    accent: 'rgba(157,196,251,0.10)',
    border: 'rgba(157,196,251,0.25)',
  },
  {
    name: 'DaVinci Resolve',
    img: imgDaVinci,
    accent: 'rgba(100,200,255,0.08)',
    border: 'rgba(100,200,255,0.20)',
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

export function Collaborations() {
  return (
    <section className="py-32 bg-card border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Tools ─────────────────────────────────────────────────────── */}
        <div className="mb-28">
          <motion.p
            className="text-xs font-semibold tracking-widest uppercase text-primary mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Software
          </motion.p>
          <motion.h2
            className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Die Tools hinter jedem Schnitt.
          </motion.h2>

          <div className="flex flex-wrap gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.name}
                className="flex items-center gap-4 px-6 py-4 rounded-sm border overflow-hidden"
                style={{ background: tool.accent, borderColor: tool.border }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {/* Real logo — black bg removed via mix-blend-mode: screen */}
                <img
                  src={tool.img}
                  alt={tool.name}
                  className="w-12 h-12 object-contain shrink-0"
                  style={LOGO_STYLE}
                />
                <span className="font-display text-white font-medium text-lg">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Collaborations ────────────────────────────────────────────── */}
        <div>
          <motion.p
            className="text-xs font-semibold tracking-widest uppercase text-primary mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Zusammenarbeit
          </motion.p>
          <motion.h2
            className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Kanäle, mit denen ich gearbeitet habe.
          </motion.h2>

          <motion.a
            href="https://www.youtube.com/@Enimmtv"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-6 p-8 rounded-sm bg-background border border-card-border hover:border-primary/50 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* YouTube icon */}
            <div className="w-14 h-14 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/30 flex items-center justify-center shrink-0 group-hover:bg-[#FF0000]/20 transition-colors">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#FF0000]">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>

            <div className="flex-1">
              <div className="font-display text-2xl font-semibold text-white group-hover:text-primary transition-colors mb-1">
                @Enimmtv
              </div>
              <div className="text-muted-foreground text-sm font-light">
                YouTube-Kanal · 7 Projekte umgesetzt
              </div>
            </div>

            <svg
              className="w-5 h-5 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </div>

      </div>
    </section>
  );
}
