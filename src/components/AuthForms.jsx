import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

export default function AuthForms({ onGoogleSuccess, onLogin, onRegister }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            onLogin(formData.email, formData.password);
        } else {
            if (formData.password !== formData.confirmPassword) {
                alert("Las contraseñas no coinciden");
                return;
            }
            onRegister(formData);
        }
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-auto border border-gray-100">
            <div className="flex justify-center mb-8 bg-gray-100 p-1 rounded-lg">
                <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${isLogin ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Iniciar Sesión
                </button>
                <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${!isLogin ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Registrarse
                </button>
            </div>

            <h2 className="text-2xl font-bold text-center mb-2 text-primary">
                {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
            </h2>
            <p className="text-center text-gray-500 mb-8 text-sm">
                {isLogin ? 'Ingresa tus credenciales para continuar' : 'Únete a la plataforma de transporte líder'}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {!isLogin && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            placeholder="Ej. Juan Pérez"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="tucorreo@ejemplo.com"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                {!isLogin && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar Contraseña</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                )}

                <button
                    type="submit"
                    className="mt-4 bg-primary text-white font-bold py-3.5 px-4 rounded-xl hover:bg-opacity-90 transition-all transform hover:scale-[1.02] shadow-lg"
                >
                    {isLogin ? 'Ingresar' : 'Registrarse'}
                </button>
            </form>

            <div className="mt-8 relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative z-10 bg-white px-4 text-sm text-gray-500">
                    O continúa con
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <div className="transform hover:scale-105 transition-transform">
                    <GoogleLogin
                        onSuccess={onGoogleSuccess}
                        onError={() => alert('Error en Login con Google')}
                        shape="pill"
                        size="large"
                        width="300"
                    />
                </div>
            </div>
        </div>
    );
}
