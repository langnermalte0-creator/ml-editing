import { useEffect, useRef } from 'react';

/**
 * Multi-layer cinematic cursor glow.
 * Three rings at different speeds create depth + comet-tail feel.
 * Hidden on touch devices (no cursor there).
 */
export function CursorGlow() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const midRef    = useRef<HTMLDivElement>(null);
  const coreRef   = useRef<HTMLDivElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);

  const mouse  = useRef({ x: -9999, y: -9999 });
  const outer  = useRef({ x: -9999, y: -9999 });
  const mid    = useRef({ x: -9999, y: -9999 });
  const core   = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let raf: number;
    const tick = () => {
      // Each layer lerps at a different speed → depth
      outer.current.x += (mouse.current.x - outer.current.x) * 0.04;
      outer.current.y += (mouse.current.y - outer.current.y) * 0.04;

      mid.current.x += (mouse.current.x - mid.current.x) * 0.10;
      mid.current.y += (mouse.current.y - mid.current.y) * 0.10;

      core.current.x += (mouse.current.x - core.current.x) * 0.22;
      core.current.y += (mouse.current.y - core.current.y) * 0.22;

      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${outer.current.x - 500}px, ${outer.current.y - 500}px)`;
      }
      if (midRef.current) {
        midRef.current.style.transform =
          `translate(${mid.current.x - 200}px, ${mid.current.y - 200}px)`;
      }
      if (coreRef.current) {
        coreRef.current.style.transform =
          `translate(${core.current.x - 60}px, ${core.current.y - 60}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x - 3}px, ${mouse.current.y - 3}px)`;
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
    pointerEvents: 'none',
    zIndex: 9998,
    willChange: 'transform',
    mixBlendMode: 'screen',
    borderRadius: '50%',
  };

  return (
    <>
      {/* Layer 1 — huge ambient cloud, slowest */}
      <div ref={outerRef} aria-hidden="true" style={{
        ...base,
        width: 1000,
        height: 1000,
        background: 'radial-gradient(circle, rgba(255,160,0,0.055) 0%, rgba(255,80,0,0.025) 45%, transparent 70%)',
      }} />

      {/* Layer 2 — medium bloom, medium speed */}
      <div ref={midRef} aria-hidden="true" style={{
        ...base,
        width: 400,
        height: 400,
        background: 'radial-gradient(circle, rgba(255,185,0,0.13) 0%, rgba(255,120,0,0.06) 50%, transparent 72%)',
      }} />

      {/* Layer 3 — tight hot core, fast */}
      <div ref={coreRef} aria-hidden="true" style={{
        ...base,
        width: 120,
        height: 120,
        background: 'radial-gradient(circle, rgba(255,220,80,0.30) 0%, rgba(255,176,0,0.14) 50%, transparent 75%)',
      }} />

      {/* Dot — exact cursor position, instant */}
      <div ref={dotRef} aria-hidden="true" style={{
        ...base,
        width: 6,
        height: 6,
        mixBlendMode: 'normal',
        background: 'rgba(255,200,50,0.85)',
        boxShadow: '0 0 8px 3px rgba(255,176,0,0.5)',
        borderRadius: '50%',
      }} />
    </>
  );
}
