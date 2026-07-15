import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { loginWithGoogle, loginUser, registerUser, updateUser } from '../services/api';
import AuthForms from '../components/AuthForms';

function estadoInicial() {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
        return { user: null, formData: { name: '', email: '', phoneNumber: '', rut: '' } };
    }
    try {
        const decoded = jwtDecode(token);
        return {
            user: decoded,
            formData: {
                name: decoded.name || '',
                email: decoded.email || decoded.sub || '',
                phoneNumber: decoded.phoneNumber || '',
                rut: decoded.rut || ''
            }
        };
    } catch {
        localStorage.removeItem('jwt_token');
        return { user: null, formData: { name: '', email: '', phoneNumber: '', rut: '' } };
    }
}

export default function Profile() {
    const [{ user: usuarioInicial, formData: formDataInicial }] = useState(estadoInicial);
    const [user, setUser] = useState(usuarioInicial);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(formDataInicial);
    const [status, setStatus] = useState({ type: '', message: '' });

    const processLogin = (token) => {
        if (token) {
            localStorage.setItem('jwt_token', token);
            const decoded = jwtDecode(token);
            setUser(decoded);
            setFormData({
                name: decoded.name || '',
                email: decoded.email || decoded.sub || '',
                phoneNumber: decoded.phoneNumber || '',
                rut: decoded.rut || ''
            });
            window.location.reload();
        } else {
            alert("No se recibió un token válido.");
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const jwt = await loginWithGoogle(credentialResponse.credential);
            processLogin(jwt);
        } catch (error) {
            console.error('Login Google Failed', error);
            alert("Error en Google Login: " + (error.response?.data || error.message));
        }
    };

    const handleLogin = async (email, password) => {
        try {
            const jwt = await loginUser(email, password);
            processLogin(jwt);
        } catch (error) {
            console.error('Login Failed', error);
            alert("Error al iniciar sesión: " + (error.response?.data || error.message));
        }
    };

    const handleRegister = async (formData) => {
        try {
            await registerUser(formData);
            alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
        } catch (error) {
            console.error('Register Failed', error);
            alert("Error al registrarse: " + (error.response?.data || error.message));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        setUser(null);
        window.location.reload();
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Guardando cambios...' });
        try {
            await updateUser({ nombre: formData.name });
            setStatus({ type: 'success', message: 'Datos actualizados correctamente.' });
            setIsEditing(false);
            // In a real app, we might want to refresh the token if claims changed, 
            // but for now we just update local state visually if needed or assume token is still valid for identity.
        } catch {
            setStatus({ type: 'error', message: 'Error al actualizar perfil.' });
        }
    };

    if (!user) {
        return (
            <div className="pt-32 pb-24 bg-gray-50 min-h-screen flex items-center justify-center px-4">
                <AuthForms
                    onGoogleSuccess={handleGoogleSuccess}
                    onLogin={handleLogin}
                    onRegister={handleRegister}
                />
            </div>
        );
    }

    return (
        <div className="pt-32 pb-16 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Sidebar / User Info */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-4 border-accent">
                                {user.sub ? user.sub.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 break-words">{user.name || user.sub}</h2>
                            <p className="text-gray-500 text-sm mb-6">{user.email || user.sub}</p>

                            <button
                                onClick={handleLogout}
                                className="w-full py-2 px-4 rounded border border-red-500 text-red-500 hover:bg-red-50 transition-colors font-medium">
                                Cerrar Sesión
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                            <h3 className="font-bold text-gray-700 mb-3">Navegación</h3>
                            <a href="/mi-viaje" className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100 text-primary mb-1">
                                📍 Mi Viaje en Vivo
                            </a>
                            <a href="/reportes" className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100 text-primary mb-1">
                                📋 Mis Reportes
                            </a>
                            <a href="/#contacto" className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100 text-primary">
                                🚌 Solicitar Viaje
                            </a>
                        </div>
                    </div>

                    {/* Main Content: Personal Data Form */}
                    <div className="md:col-span-2">
                        <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-primary">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold text-gray-800">Mi Perfil</h1>
                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="text-accent font-bold hover:text-accent-hover underline">
                                        Editar Datos
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleUpdateSubmit} className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
                                        <input
                                            type="text"
                                            className={`form-input w-full ${!isEditing ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                                            value={formData.name}
                                            readOnly={!isEditing}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">RUT</label>
                                        <input
                                            type="text"
                                            className={`form-input w-full ${!isEditing ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                                            value={formData.rut}
                                            readOnly={!isEditing}
                                            placeholder="12.345.678-9"
                                            onChange={e => setFormData({ ...formData, rut: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            className="form-input w-full bg-gray-100 text-gray-500 cursor-not-allowed" // Always readonly for identity
                                            value={formData.email}
                                            readOnly={true}
                                            title="El correo no se puede modificar"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                        <input
                                            type="tel"
                                            className={`form-input w-full ${!isEditing ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                                            value={formData.phoneNumber}
                                            readOnly={!isEditing}
                                            placeholder="+56 9 1234 5678"
                                            onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                                        />
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex gap-4 mt-4">
                                        <button
                                            type="submit"
                                            className="btn-primary flex-1">
                                            Guardar Cambios
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="btn-secondary bg-gray-300 text-gray-700 hover:bg-gray-400 flex-1 border-none">
                                            Cancelar
                                        </button>
                                    </div>
                                )}
                            </form>

                            {/* Status Message */}
                            {status.message && (
                                <div className={`mt-6 p-4 rounded text-center font-bold ${status.type === 'success' ? 'bg-green-100 text-green-800' :
                                    status.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    {status.message}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}