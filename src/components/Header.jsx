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
        // console.log("Login Success", decoded);
        setUser(decoded);
        window.location.reload();
      } else {
        alert("El servidor no devolvió un token válido.");
      }
    } catch (error) {
      console.error('Login Failed', error);
      alert("Error al iniciar sesión: " + (error.response?.data || error.message));
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
            {/* "Reportes" Link - Always visible, protected by page logic */}
            <li>
              <a href="/reports"
                className="text-accent font-medium hover:text-accent-hover transition-colors"
                onClick={() => setIsMenuOpen(false)}>
                Reportes
              </a>
            </li>

            {user ? (
              /* Logged In State */
              <li className="flex items-center gap-2 border-l pl-6 ml-2 border-gray-200">
                <a href="/profile"
                  className="flex items-center gap-3 hover:opacity-90 transition-all px-4 py-2 rounded-full border border-white/20 shadow-lg backdrop-blur-md"
                  style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)' }}> {/* Slate-900 with opacity */}
                  <div className="w-9 h-9 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold shadow-inner border border-white/30">
                    {user.sub ? user.sub.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-300 font-medium leading-none uppercase tracking-wider">Hola,</span>
                    <span className="text-sm font-bold leading-none text-white">
                      {user.sub || "Usuario"}
                    </span>
                  </div>
                </a>
              </li>
            ) : (
              /* Logged Out State */
              <li className="ml-4">
                <div className="google-login-wrapper transform hover:scale-105 transition-transform">
                  <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={() => console.log('Login Failed')}
                    useOneTap
                    type="standard"
                    theme="filled_blue"
                    size="medium"
                    text="signin"
                    shape="pill"
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
