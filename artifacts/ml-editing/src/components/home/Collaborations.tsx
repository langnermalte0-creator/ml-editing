import { motion } from 'framer-motion';

// ─── Accurate software logo SVGs ───────────────────────────────────────────

function PremiereLogo() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <text
        x="24" y="33"
        textAnchor="middle"
        fill="#9999FF"
        fontFamily="'Arial', sans-serif"
        fontSize="22"
        fontWeight="200"
        letterSpacing="-0.5"
      >Pr</text>
    </svg>
  );
}

function AfterEffectsLogo() {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      <text
        x="24" y="33"
        textAnchor="middle"
        fill="#9DC4FB"
        fontFamily="'Arial', sans-serif"
        fontSize="22"
        fontWeight="200"
        letterSpacing="-0.5"
      >Ae</text>
    </svg>
  );
}

function DaVinciLogo() {
  // Stylised lens/eye shape — DaVinci Resolve's trademark mark
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
      {/* Outer eye / lens shape */}
      <path
        d="M 6,24 Q 24,8 42,24 Q 24,40 6,24 Z"
        fill="none"
        stroke="#FF8C42"
        strokeWidth="1.6"
      />
      {/* Iris ring */}
      <circle cx="24" cy="24" r="7.5" fill="none" stroke="#FF8C42" strokeWidth="1.6"/>
      {/* Pupil */}
      <circle cx="24" cy="24" r="3.2" fill="#FF8C42"/>
      {/* Specular glint */}
      <circle cx="26" cy="22" r="1" fill="#FFD4A8" opacity="0.7"/>
    </svg>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────

const tools = [
  {
    name: 'Premiere Pro',
    logo: <PremiereLogo />,
    accent: 'rgba(153,153,255,0.12)',
    border: 'rgba(153,153,255,0.25)',
  },
  {
    name: 'After Effects',
    logo: <AfterEffectsLogo />,
    accent: 'rgba(157,196,251,0.12)',
    border: 'rgba(157,196,251,0.25)',
  },
  {
    name: 'DaVinci Resolve',
    logo: <DaVinciLogo />,
    accent: 'rgba(255,140,66,0.12)',
    border: 'rgba(255,140,66,0.25)',
  },
];

// ─── Component ─────────────────────────────────────────────────────────────

export function Collaborations() {
  return (
    <section className="py-32 bg-card border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── Tools ────────────────────────────────────────────────────── */}
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
                className="flex items-center gap-4 px-6 py-4 rounded-sm border"
                style={{ background: tool.accent, borderColor: tool.border }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {tool.logo}
                <span className="font-display text-white font-medium text-lg">
                  {tool.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Collaborations ───────────────────────────────────────────── */}
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
