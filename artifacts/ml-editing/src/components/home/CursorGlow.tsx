import { useEffect, useRef } from 'react';

const GLOW_WIDTH = 1100;
const GLOW_HEIGHT = 760;

export function CursorGlow() {
  const glow = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -9999, y: -9999 });
  const position = useRef({ x: -9999, y: -9999 });
  const hasPointer = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (event: MouseEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;

      // Start directly under the pointer instead of leaving a visible trail
      // from outside the viewport on the first mouse movement.
      if (!hasPointer.current) {
        position.current.x = event.clientX;
        position.current.y = event.clientY;
        hasPointer.current = true;
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    let frame = 0;
    const animate = () => {
      // Close enough to feel attached to the pointer, while still easing
      // smoothly instead of snapping on every mouse event.
      position.current.x += (target.current.x - position.current.x) * 0.11;
      position.current.y += (target.current.y - position.current.y) * 0.11;

      if (glow.current) {
        glow.current.style.transform =
          `translate(${position.current.x - GLOW_WIDTH / 2}px, ${position.current.y - GLOW_HEIGHT / 2}px)`;
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={glow}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: GLOW_WIDTH,
        height: GLOW_HEIGHT,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9998,
        willChange: 'transform',
        mixBlendMode: 'screen',
        filter: 'blur(38px)',
        background:
          'radial-gradient(ellipse at center, rgba(255, 170, 0, 0.045) 0%, rgba(255, 115, 0, 0.018) 32%, transparent 62%)',
      }}
    />
  );
}