import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container flex justify-between items-center header-content">
        <button onClick={() => scrollToSection('inicio')} className="logo" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <span className="logo-icon">🚍</span> Donde Te Llevo
        </button>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="flex nav-list items-center" style={{ gap: '2rem' }}>
            <li>
              <button
                onClick={() => scrollToSection('inicio')}
                className="text-accent font-medium hover:text-accent-hover transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '0.5rem' }}
              >
                Inicio
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('servicios')}
                className="text-accent font-medium hover:text-accent-hover transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '0.5rem' }}
              >
                Servicios
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('galeria')}
                className="text-accent font-medium hover:text-accent-hover transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '0.5rem' }}
              >
                Galería
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contacto')}
                className="btn-premium primary"
              >
                Contacto
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
