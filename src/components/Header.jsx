import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container flex justify-between items-center header-content">
        <a href="#inicio" className="logo">
          <span className="logo-icon">🚍</span> Donde Te Llevo
        </a>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}></span>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="flex nav-list">
            <li><a href="#inicio" onClick={() => setIsMenuOpen(false)}>Inicio</a></li>
            <li><a href="#servicios" onClick={() => setIsMenuOpen(false)}>Servicios</a></li>
            <li><a href="#valoraciones" onClick={() => setIsMenuOpen(false)}>Valoraciones</a></li>
            <li><a href="#galeria" onClick={() => setIsMenuOpen(false)}>Galería</a></li>
            <li><a href="#contacto" className="btn-primary" onClick={() => setIsMenuOpen(false)}>Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

