import { useState } from 'react';
import '../styles/AuthPage.css';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, loginWithGoogle } from '../services/api';
import { useGoogleLogin } from '@react-oauth/google';

export default function AuthPage() {
    const [isSignIn, setIsSignIn] = useState(true);
    const navigate = useNavigate();

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // New State for Phone

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
            // Sending phoneNumber in the payload
            await registerUser({ name, email, password, phoneNumber, role: 'CLIENT' });
            alert("Registro exitoso. Ahora inicia sesión.");
            toggleView();
        } catch (error) {
            console.error(error);
            alert("Error al registrarse.");
        }
    };

    // Google Login Integration
    const loginToGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                // Assuming loginWithGoogle expects the access token
                await loginWithGoogle(tokenResponse.access_token);
                navigate('/profile');
            } catch (error) {
                console.error("Google Login Backend Error:", error);
                alert("Error al iniciar sesión con Google.");
            }
        },
        onError: (error) => console.log('Google Login Failed:', error)
    });

    // LinkedIn Mock
    const handleLinkedinLogin = () => {
        console.log("LinkedIn Login clicked - Logic to be implemented");
        alert("Inicio de sesión con LinkedIn próximamente.");
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                {/* Visual Overlay (Slider) */}
                <div className={`card-overlay ${isSignIn ? 'overlay-right' : 'overlay-left'}`}>
                    <div className="overlay-content overlay-signin">
                        <h2>¡Bienvenido de Nuevo!</h2>
                        <p>Para mantenerte conectado, inicia sesión con tus datos personales.</p>
                        <button className="btn-ghost" onClick={toggleView}>INICIAR SESIÓN</button>
                    </div>
                    <div className="overlay-content overlay-signup">
                        <h2>¡Hola, Viajero!</h2>
                        <p>Introduce tus datos y comienza tu viaje con nosotros hoy mismo.</p>
                        <button className="btn-ghost" onClick={toggleView}>REGISTRARSE</button>
                    </div>
                </div>

                {/* Sign In Form */}
                <div className={`form-container sign-in-container ${isSignIn ? 'active-z' : ''}`}>
                    <form onSubmit={handleLogin}>
                        <h1>Iniciar Sesión</h1>
                        <div className="social-container">
                            <button type="button" className="social-btn google" onClick={() => loginToGoogle()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                                </svg>
                                <span>Google</span>
                            </button>
                            <button type="button" className="social-btn linkedin" onClick={handleLinkedinLogin}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                                <span>LinkedIn</span>
                            </button>
                        </div>
                        <span className="divider-text">o usa tu email</span>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
                        <button type="submit" className="btn-primary">INGRESAR</button>
                        <p className="mobile-toggle">
                            ¿No tienes cuenta? <span onClick={toggleView}>Regístrate</span>
                        </p>
                    </form>
                </div>

                {/* Sign Up Form */}
                <div className={`form-container sign-up-container ${!isSignIn ? 'active-z' : ''}`}>
                    <form onSubmit={handleRegister}>
                        <h1>Crear Cuenta</h1>
                        <div className="social-container">
                            <button type="button" className="social-btn google" onClick={() => loginToGoogle()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                                </svg>
                                <span>Google</span>
                            </button>
                            <button type="button" className="social-btn linkedin" onClick={handleLinkedinLogin}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                                <span>LinkedIn</span>
                            </button>
                        </div>
                        <span className="divider-text">o usa tu email para registrarte</span>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {/* New Phone Input */}
                        <input
                            type="tel"
                            placeholder="Teléfono (Opcional)"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn-primary">REGISTRARSE</button>
                        <p className="mobile-toggle">
                            ¿Ya tienes cuenta? <span onClick={toggleView}>Inicia Sesión</span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
