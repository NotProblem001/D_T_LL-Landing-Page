import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoMain from '../assets/Logo_Main_DTLL.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <button onClick={() => scrollToSection('inicio')} className="flex items-center gap-2 z-50 relative">
          <img src={logoMain} alt="Donde Te Llevo" className="h-10 md:h-12 object-contain" />
        </button>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 text-dtll-blue relative"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 font-medium text-dtll-gray">
            <li>
              <button onClick={() => scrollToSection('inicio')} className="hover:text-dtll-blue transition-colors">
                Inicio
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('servicios')} className="hover:text-dtll-blue transition-colors">
                Servicios
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('galeria')} className="hover:text-dtll-blue transition-colors">
                Galería
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contacto')}
                className="btn-primary py-2 px-6 text-sm"
              >
                Contacto
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile Nav Overlay */}
        <div className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
          <ul className="flex flex-col items-center gap-8 text-xl font-medium text-dtll-blue">
            <li><button onClick={() => scrollToSection('inicio')}>Inicio</button></li>
            <li><button onClick={() => scrollToSection('servicios')}>Servicios</button></li>
            <li><button onClick={() => scrollToSection('galeria')}>Galería</button></li>
            <li>
              <button onClick={() => scrollToSection('contacto')} className="btn-primary text-xl px-10 py-3">
                Contacto
              </button>
            </li>
          </ul>
        </div>

      </div>
    </header>
  );
}
