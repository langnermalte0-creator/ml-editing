import { useState, useEffect } from 'react';
import logoImg from '@assets/logo_ml_new.png';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(8,8,8,0.92)' : 'rgba(8,8,8,0.75)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(255,255,255,0.03)',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="inline-block flex-shrink-0">
          <img
            src={logoImg}
            alt="ML-Editing Logo"
            className="h-24 md:h-36 w-auto object-contain"
            style={{ mixBlendMode: 'screen', filter: 'brightness(1.15) contrast(1.1)' }}
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#portfolio"
            onClick={scrollToPortfolio}
            className="text-sm font-semibold tracking-widest uppercase text-white/70 hover:text-white transition-colors"
          >
            Portfolio
          </a>
          <a
            href="https://www.instagram.com/moltete/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary text-black font-semibold text-sm tracking-widest uppercase hover:bg-white transition-all rounded-sm"
          >
            Anfragen
          </a>
        </div>

        {/* Mobile: Anfragen + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href="https://www.instagram.com/moltete/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-black font-semibold text-xs tracking-widest uppercase rounded-sm active:scale-95 transition-transform"
          >
            Anfragen
          </a>
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] group"
            aria-label="Menü"
          >
            <span className={`block h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'w-5 rotate-45 translate-y-[6.5px]' : 'w-5'}`} />
            <span className={`block h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : 'w-4'}`} />
            <span className={`block h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'w-5 -rotate-45 -translate-y-[6.5px]' : 'w-5'}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 flex flex-col gap-3 border-t border-white/5 pt-3">
          <a
            href="#portfolio"
            onClick={scrollToPortfolio}
            className="text-sm font-semibold tracking-widest uppercase text-white/70 py-2"
          >
            Portfolio
          </a>
        </div>
      </div>
    </nav>
  );
}
