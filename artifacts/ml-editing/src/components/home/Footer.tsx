import logoImg from '@assets/logo_ml_new.png';

export function Footer() {
  return (
    <footer className="py-12 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <img
          src={logoImg}
          alt="ML-Editing"
          className="h-36 w-auto object-contain"
          style={{ mixBlendMode: 'screen', filter: 'brightness(1.15) contrast(1.1)' }}
        />
        <div className="text-muted-foreground text-sm font-light">
          &copy; {new Date().getFullYear()} ML-Editing. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
