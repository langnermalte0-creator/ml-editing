import { useState, useEffect, useRef } from 'react';
import logoImg from '@assets/logo_ml_new.png';
import igLogo from '@assets/logo_instagram.png';
import tallyLogo from '@assets/logo_tally.png';

const LOGO_BLEND: React.CSSProperties = { mixBlendMode: 'screen', filter: 'brightness(1.1)' };

export function Navbar() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
  const [showContact, setShowContact] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!showContact) return;
    const handler = (e: MouseEvent) => {
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) {
        setShowContact(false);
      }
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowContact(false); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', onKey);
    };
  }, [showContact]);

  const scrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Inline dropdown JSX — NOT a sub-component (avoids remount on state change)
  const dropdownJSX = showContact ? (
    <div
      className="absolute top-full right-0 mt-3 w-64 rounded-sm overflow-hidden z-50"
      style={{
        background: 'rgba(14,14,14,0.97)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,176,0,0.08)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <p className="text-[10px] font-semibold tracking-widest uppercase text-white/30 px-5 pt-4 pb-2">
        Anfrage senden über
      </p>
      <div className="flex flex-col gap-1 px-3 pb-3">
        <a
          href="https://www.instagram.com/ml.editing.media?igsh=MXhzbjhjeXo2eG5vdA%3D%3D&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3.5 px-3 py-3 rounded-sm hover:bg-white/5 transition-colors group"
        >
          <div className="w-9 h-9 rounded-sm bg-black/40 flex items-center justify-center shrink-0">
            <img src={igLogo} alt="Instagram" className="w-7 h-7 object-contain" style={LOGO_BLEND} />
          </div>
          <div>
            <div className="text-sm font-semibold text-white group-hover:text-primary transition-colors">Instagram</div>
            <div className="text-[11px] text-white/40">@ml.editing.media</div>
          </div>
        </a>
        <a
          href="https://tally.so/r/MeNzj0"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3.5 px-3 py-3 rounded-sm hover:bg-white/5 transition-colors group"
        >
          <div className="w-9 h-9 rounded-sm bg-black/40 flex items-center justify-center shrink-0">
            <img src={tallyLogo} alt="Tally" className="w-7 h-7 object-contain" style={LOGO_BLEND} />
          </div>
          <div>
            <div className="text-sm font-semibold text-white group-hover:text-primary transition-colors">Anfrageformular</div>
            <div className="text-[11px] text-white/40">via Tally.so</div>
          </div>
        </a>
      </div>
    </div>
  ) : null;

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(8,8,8,0.94)' : 'rgba(8,8,8,0.72)',
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
            style={{ mixBlendMode: 'screen', filter: 'brightness(1.35) contrast(1.05) drop-shadow(0 0 14px rgba(255,176,0,0.28))' }}
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
          <div ref={contactRef} className="relative">
            <button
              onClick={() => setShowContact(o => !o)}
              className="px-6 py-3 bg-primary text-black font-semibold text-sm tracking-widest uppercase hover:bg-white transition-all rounded-sm flex items-center gap-2"
            >
              Anfragen
              <svg className={`w-3 h-3 transition-transform duration-200 ${showContact ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 8L1 3h10L6 8z" />
              </svg>
            </button>
            {dropdownJSX}
          </div>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-3">
          <div ref={contactRef} className="relative">
            <button
              onClick={() => setShowContact(o => !o)}
              className="px-4 py-2 bg-primary text-black font-semibold text-xs tracking-widest uppercase rounded-sm active:scale-95 transition-transform flex items-center gap-1.5"
            >
              Anfragen
              <svg className={`w-2.5 h-2.5 transition-transform duration-200 ${showContact ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 8L1 3h10L6 8z" />
              </svg>
            </button>
            {dropdownJSX}
          </div>
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Menü"
          >
            <span className={`block h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'w-5 rotate-45 translate-y-[6.5px]' : 'w-5'}`} />
            <span className={`block h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : 'w-4'}`} />
            <span className={`block h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'w-5 -rotate-45 -translate-y-[6.5px]' : 'w-5'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pb-4 border-t border-white/5 pt-3">
          <a href="#portfolio" onClick={scrollToPortfolio} className="text-sm font-semibold tracking-widest uppercase text-white/70 py-2 block">
            Portfolio
          </a>
        </div>
      </div>
    </nav>
  );
}
