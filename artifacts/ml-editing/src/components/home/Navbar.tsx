import logoImg from '@assets/logo_ml_new.png';

export function Navbar() {
  const scrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('portfolio');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[rgba(8,8,8,0.85)] backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-32 flex items-center justify-between">
        <a href="/" className="inline-block">
          <img
            src={logoImg}
            alt="ML-Editing Logo"
            className="h-24 w-auto object-contain"
            style={{ mixBlendMode: 'screen', filter: 'brightness(1.15) contrast(1.1)' }}
          />
        </a>

        <div className="flex items-center gap-6">
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
      </div>
    </nav>
  );
}
