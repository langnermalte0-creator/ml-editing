import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const posOuter = useRef({ x: -9999, y: -9999 });
  const posInner = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const OUTER_SIZE = 900;
    const INNER_SIZE = 280;

    let raf: number;
    const tick = () => {
      // Outer: very slow and dreamy
      posOuter.current.x += (mouse.current.x - posOuter.current.x) * 0.045;
      posOuter.current.y += (mouse.current.y - posOuter.current.y) * 0.045;
      // Inner: slightly faster
      posInner.current.x += (mouse.current.x - posInner.current.x) * 0.09;
      posInner.current.y += (mouse.current.y - posInner.current.y) * 0.09;

      if (outer.current) {
        outer.current.style.left = `${posOuter.current.x - OUTER_SIZE / 2}px`;
        outer.current.style.top  = `${posOuter.current.y - OUTER_SIZE / 2}px`;
      }
      if (inner.current) {
        inner.current.style.left = `${posInner.current.x - INNER_SIZE / 2}px`;
        inner.current.style.top  = `${posInner.current.y - INNER_SIZE / 2}px`;
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
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 9998,
    willChange: 'left, top',
    mixBlendMode: 'screen',
  };

  return (
    <>
      {/* Outer: large, very diffuse ambient cloud */}
      <div ref={outer} aria-hidden="true" style={{
        ...base,
        width: 900,
        height: 900,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,160,0,0.07) 0%, rgba(255,100,0,0.03) 40%, transparent 68%)',
      }} />
      {/* Inner: tighter warm bloom */}
      <div ref={inner} aria-hidden="true" style={{
        ...base,
        width: 280,
        height: 280,
        background: 'radial-gradient(circle at 50% 50%, rgba(255,190,0,0.11) 0%, rgba(255,140,0,0.05) 50%, transparent 72%)',
      }} />
    </>
  );
}
