import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import airbnbVideo    from '@assets/Airbnb-AD_1783250853700.mp4';
import animation3DVideo from '@assets/3D.Animation.Vertical_1783250853699.mp4';
import appleVideo     from '@assets/Apple.UI-Animation_1783250853700.mp4';
import moneyVideo     from '@assets/Money.Animation_1783250853701.mp4';
import timeline1Video from '@assets/Timeline_1_1783250853702.mp4';
import tutorialVideo  from '@assets/Tutorial_Animation_1_2_1783250853702.mp4';
import enimmVideo     from '@assets/Enimm.Ad-Final_1783251993888.mp4';

const projects = [
  {
    title: 'Enimm Ad',
    category: 'Commercial',
    description: 'Werbevideo für den YouTube-Kanal @Enimmtv – energiegeladen, schnell, auf den Punkt.',
    video: enimmVideo,
  },
  {
    title: 'Airbnb — Inoffizielles Konzept',
    category: 'Fan Edit',
    description: 'Eigenes kreatives Projekt – kein offizieller Airbnb-Auftrag. Rhythmisch geschnitten, visuell stark.',
    badge: 'Persönliches Projekt',
    video: airbnbVideo,
  },
  {
    title: '3D Animation',
    category: 'Motion Design',
    description: 'Vertikale 3D-Animation, optimiert für Social-Media-Plattformen.',
    video: animation3DVideo,
  },
  {
    title: 'Apple UI Animation',
    category: 'UI Motion',
    description: 'Cleane Interface-Animation im minimalst-cineastischen Stil.',
    video: appleVideo,
  },
  {
    title: 'Money Motion',
    category: 'Motion Design',
    description: 'Dynamische Finanz-Animation mit starker Bildsprache.',
    video: moneyVideo,
  },
  {
    title: 'Timeline Showcase',
    category: 'Editing Reel',
    description: 'Einblick in den Schnitt-Prozess direkt aus der Timeline.',
    video: timeline1Video,
  },
  {
    title: 'Tutorial Animation',
    category: 'Motion Design',
    description: 'Erklär-Animation mit cleaner Motion-Grafik und präzisem Timing.',
    video: tutorialVideo,
  },
];

function SpeakerOnIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

function VideoCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const [isMuted,    setIsMuted]    = useState(true);
  const [isPlaying,  setIsPlaying]  = useState(false);
  const [showSweep,  setShowSweep]  = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = isMuted;
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(true);
    setShowSweep(true);
    setTimeout(() => setShowSweep(false), 800);
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
      setIsMuted(true);
    }
    setIsPlaying(false);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMuted = !videoRef.current.muted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <motion.div
      className="group cursor-default"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video container */}
      <div
        className="relative aspect-video rounded-sm overflow-hidden mb-5 bg-[#111] border border-white/5 transition-all duration-500"
        style={{
          boxShadow: isPlaying
            ? '0 0 0 1px rgba(255,176,0,0.35), 0 0 50px rgba(255,176,0,0.10), 0 20px 60px rgba(0,0,0,0.5)'
            : '0 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover transition-all duration-700 ease-out"
          style={{
            opacity: isPlaying ? 1 : 0.78,
            transform: isPlaying ? 'scale(1.04)' : 'scale(1)',
          }}
        />

        {/* Light sweep on play */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <motion.div
            className="absolute top-0 bottom-0 w-[45%]"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: showSweep ? '320%' : '-100%' }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Letterbox bars (cinematic) — fade out on hover */}
        <div
          className="absolute left-0 right-0 top-0 h-[6%] bg-black transition-opacity duration-500 pointer-events-none"
          style={{ opacity: isPlaying ? 0 : 0.6 }}
        />
        <div
          className="absolute left-0 right-0 bottom-0 h-[6%] bg-black transition-opacity duration-500 pointer-events-none"
          style={{ opacity: isPlaying ? 0 : 0.6 }}
        />

        {/* Play icon — idle state */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
          style={{ opacity: isPlaying ? 0 : 1 }}
        >
          <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-black/50 backdrop-blur-sm group-hover:border-primary/50 group-hover:bg-black/70 transition-all duration-300">
            <div className="w-0 h-0 border-y-[7px] border-y-transparent border-l-[12px] border-l-white ml-1" />
          </div>
        </div>

        {/* Mute button */}
        <button
          onClick={toggleMute}
          className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/90 hover:border-primary/60 transition-all duration-200"
          style={{ opacity: isPlaying ? 1 : 0, pointerEvents: isPlaying ? 'auto' : 'none' }}
          title={isMuted ? 'Ton einschalten' : 'Ton ausschalten'}
        >
          <span className={`transition-colors ${isMuted ? 'text-white/50' : 'text-primary'}`}>
            {isMuted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
          </span>
        </button>

        {/* Badge */}
        {project.badge && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-md text-primary text-[10px] font-semibold tracking-widest uppercase border border-primary/30 rounded-sm">
            {project.badge}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="text-[10px] text-primary/60 font-semibold tracking-[0.18em] uppercase mb-2 group-hover:text-primary transition-colors duration-300">
        {project.category}
      </div>
      <h3
        className="font-display text-xl font-medium text-white mb-2 transition-all duration-300"
        style={{
          textShadow: isPlaying ? '0 0 20px rgba(255,176,0,0.3)' : 'none',
          color: isPlaying ? 'rgb(255,176,0)' : 'white',
        }}
      >
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm font-light leading-relaxed">
        {project.description}
      </p>
    </motion.div>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="py-32 bg-background border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">Portfolio</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4">
            Ausgewählte Arbeiten
          </h2>
          <p className="text-muted-foreground font-light max-w-xl text-lg">
            Hover über ein Video — Lautsprecher-Icon für Ton.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {projects.map((project, i) => (
            <VideoCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
