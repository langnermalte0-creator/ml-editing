import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const layerA = useRef<HTMLDivElement>(null);
  const layerB = useRef<HTMLDivElement>(null);
  const mouse  = useRef({ x: -9999, y: -9999 });
  const posA   = useRef({ x: -9999, y: -9999 });
  const posB   = useRef({ x: -9999, y: -9999 });

  // Verschoben aus useEffect: werden auch im JSX unten gebraucht
  const SA = 1600;
  const SB = 700;

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let raf: number;
    const tick = () => {
      posA.current.x += (mouse.current.x - posA.current.x) * 0.025;
      posA.current.y += (mouse.current.y - posA.current.y) * 0.025;
      posB.current.x += (mouse.current.x - posB.current.x) * 0.05;
      posB.current.y += (mouse.current.y - posB.current.y) * 0.05;

      if (layerA.current) {
        layerA.current.style.transform =
          `translate(${posA.current.x - SA / 2}px, ${posA.current.y - SA / 2}px)`;
      }
      if (layerB.current) {
        layerB.current.style.transform =
          `translate(${posB.current.x - SB / 2}px, ${posB.current.y - SB / 2}px)`;
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const base: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9998,
    willChange: 'transform',
    mixBlendMode: 'screen',
  };

  return (
    <>
      {/* Riesige äußere Lichtwolke — beginnt schon bei sehr niedriger Opazität */}
      <div ref={layerA} aria-hidden="true" style={{
        ...base,
        width: SA,
        height: SA,
        // Gradient beginnt bei 0.04 und wird bei 45% schon transparent —
        // kein scharfer Rand, kein sichtbarer Kreis
        background: 'radial-gradient(circle at 50% 50%, rgba(255,160,0,0.045) 0%, rgba(255,110,0,0.015) 30%, transparent 52%)',
      }} />
      {/* Mittlere weiche Bloom-Schicht — niedriger als vorher */}
      <div ref={layerB} aria-hidden="true" style={{
        ...base,
        width: SB,
        height: SB,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,175,0,0.05) 0%, rgba(255,130,0,0.018) 35%, transparent 55%)',
      }} />
    </>
  );
}
