import { useEffect, useRef } from 'react';

/**
 * Soft amber radial glow that lazily follows the cursor.
 * Uses mix-blend-mode: screen so it adds warm light on dark surfaces
 * without washing out text.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const curr  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const SIZE = 700;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    let raf: number;
    const tick = () => {
      // Lazy follow — 7% lerp per frame
      curr.current.x += (mouse.current.x - curr.current.x) * 0.07;
      curr.current.y += (mouse.current.y - curr.current.y) * 0.07;
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
        width: 700,
        height: 700,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9998,
        willChange: 'left, top',
        mixBlendMode: 'screen',
        background:
          'radial-gradient(circle at 50% 50%, rgba(255,176,0,0.09) 0%, rgba(255,110,0,0.04) 40%, transparent 70%)',
      }}
    />
  );
}
