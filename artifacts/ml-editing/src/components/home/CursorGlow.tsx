import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const layerA = useRef<HTMLDivElement>(null);
  const layerB = useRef<HTMLDivElement>(null);
  const layerC = useRef<HTMLDivElement>(null);
  const mouse  = useRef({ x: -9999, y: -9999 });
  const posA   = useRef({ x: -9999, y: -9999 });
  const posB   = useRef({ x: -9999, y: -9999 });
  const posC   = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    // Sizes — all large so the visible "circle edge" disappears
    const SA = 1400; // outer: huge ambient nebula
    const SB = 600;  // mid:   warm core glow
    const SC = 200;  // inner: faint tight bloom

    let raf: number;
    const tick = () => {
      // Very different lerp speeds → layers drift apart organically
      posA.current.x += (mouse.current.x - posA.current.x) * 0.028;
      posA.current.y += (mouse.current.y - posA.current.y) * 0.028;

      posB.current.x += (mouse.current.x - posB.current.x) * 0.055;
      posB.current.y += (mouse.current.y - posB.current.y) * 0.055;

      posC.current.x += (mouse.current.x - posC.current.x) * 0.10;
      posC.current.y += (mouse.current.y - posC.current.y) * 0.10;

      if (layerA.current) {
        layerA.current.style.transform =
          `translate(${posA.current.x - SA / 2}px, ${posA.current.y - SA / 2}px)`;
      }
      if (layerB.current) {
        layerB.current.style.transform =
          `translate(${posB.current.x - SB / 2}px, ${posB.current.y - SB / 2}px)`;
      }
      if (layerC.current) {
        layerC.current.style.transform =
          `translate(${posC.current.x - SC / 2}px, ${posC.current.y - SC / 2}px)`;
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
      {/* Layer A – giant outer haze, barely visible, very long tail */}
      <div ref={layerA} aria-hidden="true" style={{
        ...base,
        width: 1400,
        height: 1400,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,150,0,0.055) 0%, rgba(255,100,0,0.02) 30%, transparent 60%)',
      }} />

      {/* Layer B – medium warm bloom */}
      <div ref={layerB} aria-hidden="true" style={{
        ...base,
        width: 600,
        height: 600,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,180,0,0.09) 0%, rgba(255,130,0,0.04) 40%, transparent 65%)',
      }} />

      {/* Layer C – tight subtle hotspot */}
      <div ref={layerC} aria-hidden="true" style={{
        ...base,
        width: 200,
        height: 200,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,210,80,0.10) 0%, rgba(255,170,0,0.04) 50%, transparent 75%)',
      }} />
    </>
  );
}
