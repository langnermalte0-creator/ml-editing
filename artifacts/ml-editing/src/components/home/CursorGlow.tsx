import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const curr  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const SIZE = 750;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let raf: number;
    const tick = () => {
      curr.current.x += (mouse.current.x - curr.current.x) * 0.06;
      curr.current.y += (mouse.current.y - curr.current.y) * 0.06;
      if (ref.current) {
        ref.current.style.left = `${curr.current.x - SIZE / 2}px`;
        ref.current.style.top  = `${curr.current.y - SIZE / 2}px`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: -9999,
        top: -9999,
        width: 750,
        height: 750,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9998,
        willChange: 'left, top',
        mixBlendMode: 'screen',
        background: 'radial-gradient(circle at 50% 50%, rgba(255,176,0,0.065) 0%, rgba(255,110,0,0.025) 45%, transparent 70%)',
      }}
    />
  );
}
