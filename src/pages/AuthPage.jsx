import { useState } from 'react';
import '../styles/AuthPage.css';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';

export default function AuthPage() {
    const [isSignIn, setIsSignIn] = useState(true); // Default to Sign In view
    const navigate = useNavigate();

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const toggleView = () => {
        setIsSignIn(!isSignIn);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            navigate('/profile');
        } catch (error) {
            console.error(error);
            alert("Error al iniciar sesión. Verifica tus credenciales.");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ name, email, password, role: 'CLIENT' }); // Assuming role
            alert("Registro exitoso. Ahora inicia sesión.");
            toggleView();
        } catch (error) {
            console.error(error);
            alert("Error al registrarse.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                {/* The Moving Background */}
                <div className={`card-bg ${isSignIn ? 'signin-active' : ''}`}></div>

                {/* --- HERO SECTION (The Text on the Colored Background) --- */}

                {/* Hero for Sign Up (Visible when we are in Sign In Mode context, inviting to Sign Up? 
                    Actually, logic in CSS:
                    If isSignIn is TRUE (Background is RIGHT), we see the "Hello Friend" on the RIGHT?
                    No, usually:
                    - View Login: Form Left (White), "Hello Friend" Right (Color).
                    - View Register: "Welcome Back" Left (Color), Form Right (White).
                */}

                {/* Left Hero (Visible when animating to Register? No, visible when Register Form is active ON THE RIGHT) */}
                {/* This is "Welcome Back" -> prompts to Sign In */}
                <div className={`auth-hero hero-signin ${!isSignIn ? 'active' : ''}`} style={{ left: 0 }}>
                    <h2>¡Bienvenido de nuevo!</h2>
                    <p>Para mantenerte conectado con nosotros, por favor inicia sesión con tu información personal.</p>
                    <button className="btn-toggle" onClick={toggleView}>INICIAR SESIÓN</button>
                </div>

                {/* Right Hero (Visible when Login Form is active ON THE LEFT) */}
                {/* This is "Hello Friend" -> prompts to Sign Up */}
                <div className={`auth-hero hero-signup ${isSignIn ? 'active' : ''}`} style={{ right: 0 }}>
                    <h2>¡Hola, Viajero!</h2>
                    <p>Introduce tus datos personales y comienza tu viaje con nosotros.</p>
                    <button className="btn-toggle" onClick={toggleView}>REGISTRARSE</button>
                </div>

                {/* --- FORM SECTION --- */}

                {/* Sign In Form (Left Side) */}
                <div className={`auth-form form-signin ${isSignIn ? 'active' : ''}`}>
                    <form onSubmit={handleLogin} className="auth-inputs">
                        <h2>Iniciar Sesión</h2>
                        <div className="social-icons">
                            <a href="#" className="social-icon">F</a>
                            <a href="#" className="social-icon">G</a>
                            <a href="#" className="social-icon">L</a>
                        </div>
                        <p>o usa tu cuenta de email</p>
                        <input
                            type="email"
                            placeholder="Email"
                            className="auth-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="auth-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <a href="#" style={{ fontSize: '0.8rem', color: '#333', marginTop: '10px' }}>¿Olvidaste tu contraseña?</a>
                        <button type="submit" className="btn-primary-auth">INGRESAR</button>
                        <p className="mobile-toggle-text">
                            ¿No tienes cuenta? <span className="mobile-toggle-link" onClick={toggleView}>Regístrate</span>
                        </p>
                    </form>
                </div>

                {/* Sign Up Form (Right Side) */}
                <div className={`auth-form form-signup ${!isSignIn ? 'active' : ''}`}>
                    <form onSubmit={handleRegister} className="auth-inputs">
                        <h2>Crear Cuenta</h2>
                        <div className="social-icons">
                            <a href="#" className="social-icon">F</a>
                            <a href="#" className="social-icon">G</a>
                            <a href="#" className="social-icon">L</a>
                        </div>
                        <p>o usa tu email para registrarte</p>
                        <input
                            type="text"
                            placeholder="Nombre"
                            className="auth-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="auth-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="auth-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn-primary-auth">REGISTRARSE</button>
                        <p className="mobile-toggle-text">
                            ¿Ya tienes cuenta? <span className="mobile-toggle-link" onClick={toggleView}>Inicia Sesión</span>
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
}
