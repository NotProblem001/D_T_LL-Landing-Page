import { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { loginWithGoogle } from '../services/api';
import Section from '../components/Section';

export default function Profile() {
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

    return (
        <div className="pt-20 min-h-screen bg-gray-50">
            {/* pt-20 to account for fixed header if applicable, or just spacing */}

            <Section id="perfil" title="Mi Cuenta" subtitle="Gestiona tu actividad en Donde Te Llevo">
                <div className="max-w-4xl mx-auto">

                    {!user ? (
                        /* Login Section */
                        <div className="grid grid-2 gap-8 items-center">
                            <div className="card bg-white p-8 shadow-lg text-center">
                                <h3 className="text-2xl font-bold mb-4 text-primary">Inicia Sesión</h3>
                                <p className="mb-6 text-gray-600">Accede para gestionar tus reservas y reportes de forma segura.</p>
                                <div className="flex justify-center">
                                    <GoogleLogin
                                        onSuccess={handleLoginSuccess}
                                        onError={() => console.log('Login Failed')}
                                        useOneTap
                                        shape="pill"
                                        size="large"
                                        text="signin_with"
                                    />
                                </div>
                            </div>

                            <div className="hidden md:block">
                                {/* Info/Register Teaser */}
                                <h3 className="text-xl font-bold mb-4">¿Por qué registrarse?</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2">✅ Seguimiento en tiempo real de tus viajes</li>
                                    <li className="flex items-center gap-2">✅ Historial de reservas y reportes</li>
                                    <li className="flex items-center gap-2">✅ Atención prioritaria</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        /* User Profile Section */
                        <div className="card bg-white p-8 shadow-lg">
                            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 border-b pb-8">
                                <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-4xl font-bold">
                                    {user.sub ? user.sub.charAt(0).toUpperCase() : 'U'}
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-800">Hola, {user.sub || "Usuario"}</h2>
                                    <p className="text-gray-500">{user.email || "Usuario de Google"}</p>
                                    <button onClick={handleLogout} className="mt-4 btn-secondary text-sm">
                                        Cerrar Sesión
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-2 gap-6">
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="font-bold text-lg mb-2">Mis Reservas</h4>
                                    <p className="text-gray-500 text-sm">No tienes reservas activas.</p>
                                    <a href="/#agendar" className="text-accent text-sm font-bold mt-2 inline-block">Nueva Reserva &rarr;</a>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <h4 className="font-bold text-lg mb-2">Mis Reportes</h4>
                                    <p className="text-gray-500 text-sm">No hay reportes recientes.</p>
                                    <a href="/#reportes" className="text-accent text-sm font-bold mt-2 inline-block">Crear Reporte &rarr;</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Section>
        </div>
    );
}
