import { motion } from 'framer-motion';
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';

const TRACKS = 5;
const BLOCKS_PER_TRACK = 12;

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

function generateTracks() {
  const tracks = [];
  const colors = ['bg-[#2A2A2A]', 'bg-[#1E1E1E]', 'bg-primary/20', 'bg-primary', 'bg-[#3A3A3A]'];
  let seed = 42;
  for (let i = 0; i < TRACKS; i++) {
    const blocks = [];
    for (let j = 0; j < BLOCKS_PER_TRACK; j++) {
      const width = 40 + pseudoRandom(seed++) * 160;
      const margin = pseudoRandom(seed++) > 0.3 ? pseudoRandom(seed++) * 24 : 2;
      const colorIndex = Math.floor(pseudoRandom(seed++) * colors.length);
      blocks.push({ id: `${i}-${j}`, width, margin, color: colors[colorIndex] });
    }
    tracks.push(blocks);
  }
  return tracks;
}

const TrackRow = ({
  track,
  speed,
  direction,
  scrubOffset,
}: {
  track: { id: string; width: number; margin: number; color: string }[];
  speed: number;
  direction: 1 | -1;
  scrubOffset: number;
}) => {
  return (
    <div className="flex h-8 md:h-10 overflow-hidden relative w-[200vw] left-1/2 -translate-x-1/2">
      <div
        style={{ transform: `translateX(${scrubOffset}px)`, transition: 'none', position: 'absolute', width: '100%', height: '100%' }}
      >
        <motion.div
          className="flex whitespace-nowrap absolute"
          animate={{ x: direction === 1 ? ['-50%', '0%'] : ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: speed }}
        >
          <div className="flex">
            {track.map((b) => (
              <div
                key={`1-${b.id}`}
                className={`h-8 md:h-10 shrink-0 border border-white/5 rounded-sm ${b.color}`}
                style={{ width: b.width, marginLeft: b.margin }}
              />
            ))}
          </div>
          <div className="flex">
            {track.map((b) => (
              <div
                key={`2-${b.id}`}
                className={`h-8 md:h-10 shrink-0 border border-white/5 rounded-sm ${b.color}`}
                style={{ width: b.width, marginLeft: b.margin }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export function TimelineGraphic() {
  const tracks = useMemo(() => generateTracks(), []);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [playheadPct, setPlayheadPct] = useState(50);
  const [scrubOffset, setScrubOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, pct: 50, offset: 0 });

  const handlePlayheadMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    setDragging(true);
    dragStart.current = { x: e.clientX, pct: playheadPct, offset: scrubOffset };
    e.preventDefault();
  }, [playheadPct, scrubOffset]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const delta = e.clientX - dragStart.current.x;
      const pctDelta = (delta / rect.width) * 100;
      const newPct = Math.max(5, Math.min(95, dragStart.current.pct + pctDelta));
      setPlayheadPct(newPct);
      setScrubOffset(dragStart.current.offset - delta * 2.5);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      setDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 bg-background overflow-hidden border-y border-white/5 select-none"
      style={{ cursor: isDragging.current ? 'grabbing' : 'default' }}
    >
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Playhead — draggable */}
      <div
        className="absolute top-0 bottom-0 z-20 group"
        style={{ left: `${playheadPct}%`, cursor: 'grab', width: 24, transform: 'translateX(-12px)' }}
        onMouseDown={handlePlayheadMouseDown}
      >
        {/* Invisible wider hit area */}
        <div className="absolute inset-0 -left-3 -right-3" />

        {/* The line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-px bg-primary/80 shadow-[0_0_15px_rgba(255,176,0,0.5)]" />

        {/* Playhead arrow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
        />

        {/* Drag handle grip dots */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[3px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {[0,1,2].map(i => (
            <div key={i} className="w-1 h-1 rounded-full bg-primary" />
          ))}
        </div>
      </div>

      {/* Tracks */}
      <div className="flex flex-col gap-1.5 opacity-90 mx-auto max-w-full pointer-events-none">
        {tracks.map((track, i) => (
          <TrackRow
            key={i}
            track={track}
            speed={35 + i * 5}
            direction={i % 2 === 0 ? -1 : 1}
            scrubOffset={scrubOffset * (i % 2 === 0 ? 1 : -1)}
          />
        ))}
      </div>
    </section>
  );
}
