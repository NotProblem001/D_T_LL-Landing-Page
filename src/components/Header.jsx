import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { loginWithGoogle } from '../services/api';

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

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      // credentialResponse.credential is the Google ID Token
      const jwt = await loginWithGoogle(credentialResponse.credential);
      if (jwt) {
        localStorage.setItem('jwt_token', jwt);
        const decoded = jwtDecode(jwt);
        setUser(decoded);
        window.location.reload();
      }
    } catch (error) {
      console.error('Login Failed', error);
    }
  };

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
            <li><a href="/#inicio" onClick={() => setIsMenuOpen(false)}>Inicio</a></li>
            <li><a href="/#servicios" onClick={() => setIsMenuOpen(false)}>Servicios</a></li>

            {user && (
              <>
                <li><a href="/#agendar" className="text-accent" onClick={() => setIsMenuOpen(false)}>Agendar</a></li>
                <li><a href="/#reportes" className="text-accent" onClick={() => setIsMenuOpen(false)}>Reportes</a></li>
              </>
            )}

            {user ? (
              <li className="flex items-center gap-2">
                <a href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={() => setIsMenuOpen(false)}>
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {user.sub ? user.sub.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-sm font-bold hidden md:block" style={{ color: 'var(--text-primary)' }}>
                    {user.sub || "Usuario"}
                  </span>
                </a>
              </li>
            ) : (
              <li>
                <div className="google-login-wrapper">
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={() => console.log('Login Failed')}
                    useOneTap
                    type="icon"
                    shape="circle"
                  />
                </div>
              </li>
            )}

            <li><a href="/#contacto" className="btn-primary" onClick={() => setIsMenuOpen(false)}>Contacto</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
