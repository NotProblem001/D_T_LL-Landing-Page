import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
// import { loginWithGoogle } from '../services/api'; // Moved to AuthPage if needed

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        localStorage.removeItem('jwt_token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
    window.location.reload();
  };

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
          <ul className="flex nav-list items-center">
            {/* "Reportes" Link - Always visible, protected by page logic */}
            <li>
              <a href="/reports"
                className="text-accent font-medium hover:text-accent-hover transition-colors"
                onClick={() => setIsMenuOpen(false)}>
                Reportes
              </a>
            </li>

            {user ? (
              /* Logged In State - Premium Button */
              <li className="ml-4">
                <a href="/profile" className="btn-premium profile">
                  <span className="text-sm">Hola, {user.sub || "Usuario"}</span>
                  <span style={{ fontSize: '1.2rem', lineHeight: 0 }}>👤</span>
                </a>
              </li>
            ) : (
              /* Logged Out State - Premium Button */
              <li className="ml-4">
                <a href="/login" className="btn-premium">
                  Iniciar Sesión
                </a>
              </li>
            )}

            <li>
              <a href="/#contacto" className="btn-premium primary">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
