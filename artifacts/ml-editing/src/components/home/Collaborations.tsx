import { motion } from 'framer-motion';
import imgAe from '@assets/logo_ae.png';
import imgPr from '@assets/logo_pr.png';
import imgDaVinci from '@assets/logo_davinci.png';
import enimmtvAvatar from '@assets/logo-mascot_1790272822957.jpg';
import lezgolezgoAvatar from '@assets/channels4_profile_1790272832874.jpg';

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

const collaborations = [
  {
    name: 'Enimmtv',
    handle: '@Enimmtv',
    href: 'https://www.youtube.com/@Enimmtv',
    avatar: enimmtvAvatar,
    detail: 'YouTube-Kanal · 3,5 Tsd. Abonnenten',
  },
  {
    name: 'Lezan',
    handle: '@lezgolezgo',
    href: 'https://www.youtube.com/@lezgolezgo',
    avatar: lezgolezgoAvatar,
    detail: 'YouTube-Kanal · 16,4 Tsd. Abonnenten',
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {collaborations.map((collaboration, i) => (
              <motion.a
                key={collaboration.handle}
                href={collaboration.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 p-6 md:p-8 rounded-sm bg-background border border-card-border hover:border-primary/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <img
                  src={collaboration.avatar}
                  alt={`${collaboration.name} Profilbild`}
                  className="w-14 h-14 rounded-full object-cover shrink-0 border border-white/15 group-hover:border-primary/60 transition-colors"
                />

                <div className="flex-1 min-w-0">
                  <div className="font-display text-2xl font-semibold text-white group-hover:text-primary transition-colors mb-1">
                    {collaboration.name}
                  </div>
                  <div className="text-muted-foreground text-sm font-light">
                    {collaboration.detail}
                  </div>
                </div>

                <svg
                  className="w-5 h-5 text-white/30 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
