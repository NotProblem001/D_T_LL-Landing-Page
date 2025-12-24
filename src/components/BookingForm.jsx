import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { createBooking } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function BookingForm() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Booking State
    const [booking, setBooking] = useState({
        origin: '',
        destination: '',
        travelDate: '',
        passengers: 1,
        stops: 0,
        paymentMethod: 'CREDIT_CARD',
        passengerName: '',
        passengerEmail: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
                // Pre-fill data
                setBooking(prev => ({
                    ...prev,
                    passengerName: decoded.name || '',
                    passengerEmail: decoded.email || decoded.sub || ''
                }));
            } catch (e) { }
        }
    }, []);

    const handleFocus = () => {
        if (!user) {
            if (confirm("Necesitas iniciar sesión para solicitar un viaje. ¿Ir al login?")) {
                navigate('/profile');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            navigate('/profile');
            return;
        }

        setStatus({ type: 'loading', message: 'Calculando cotización y procesando...' });
        try {
            const payload = {
                passengerId: user.sub || user.email,
                origin: { address: booking.origin, latitude: 0, longitude: 0 },
                destination: { address: booking.destination, latitude: 0, longitude: 0 },
                paymentMethod: booking.paymentMethod,
                metadata: { // Send extra fields in metadata if backend DTO doesn't support them explicitly yet
                    travelDate: booking.travelDate,
                    passengers: parseInt(booking.passengers),
                    stops: parseInt(booking.stops)
                },
                estimatedPrice: 0.0
            };
            await createBooking(payload);
            setStatus({ type: 'success', message: '¡Solicitud recibida! Te enviaremos la cotización a tu correo.' });
            // Reset core fields
            setBooking(prev => ({
                ...prev,
                origin: '',
                destination: '',
                travelDate: '',
                passengers: 1,
                stops: 0
            }));
        } catch (error) {
            setStatus({ type: 'error', message: 'Error al enviar solicitud. Intente nuevamente.' });
        }
    };

    return (
        <div className="booking-form-container card bg-white p-8 shadow-2xl rounded-2xl border-t-8 border-accent relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg">2.0</div>
            <h3 className="text-2xl font-bold mb-6 text-primary border-b pb-2">Solicitar Traslado</h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {!user && (
                    <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm mb-2 cursor-pointer border border-blue-100 flex items-center gap-2" onClick={() => navigate('/profile')}>
                        <span>🔒</span> <strong>Inicia Sesión</strong> para cotizar tu viaje.
                    </div>
                )}

                {/* Read-only User Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Pasajero</label>
                        <input
                            type="text"
                            className="form-input w-full bg-gray-50 border-gray-200"
                            value={booking.passengerName}
                            readOnly
                            placeholder="Tu Nombre"
                            onFocus={handleFocus}
                            onChange={e => setBooking({ ...booking, passengerName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Contacto</label>
                        <input
                            type="email"
                            className="form-input w-full bg-gray-50 border-gray-200"
                            value={booking.passengerEmail}
                            readOnly
                            placeholder="Tu Correo"
                            onFocus={handleFocus}
                            onChange={e => setBooking({ ...booking, passengerEmail: e.target.value })}
                        />
                    </div>
                </div>

                {/* Logistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Origen</label>
                        <input
                            type="text"
                            required
                            className="form-input w-full"
                            placeholder="Dirección de recogida"
                            value={booking.origin}
                            onFocus={handleFocus}
                            onChange={e => setBooking({ ...booking, origin: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Destino</label>
                        <input
                            type="text"
                            required
                            className="form-input w-full"
                            placeholder="Dirección de destino"
                            value={booking.destination}
                            onFocus={handleFocus}
                            onChange={e => setBooking({ ...booking, destination: e.target.value })}
                        />
                    </div>
                </div>

                {/* Details: Date, Pax, Stops */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                        <label className="text-sm font-semibold text-gray-700">Fecha de Viaje</label>
                        <input
                            type="datetime-local"
                            required
                            className="form-input w-full"
                            value={booking.travelDate}
                            onFocus={handleFocus}
                            onChange={e => setBooking({ ...booking, travelDate: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Pasajeros</label>
                        <input
                            type="number"
                            min="1"
                            max="60"
                            required
                            className="form-input w-full"
                            value={booking.passengers}
                            onFocus={handleFocus}
                            onChange={e => setBooking({ ...booking, passengers: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Paradas Extra</label>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            className="form-input w-full"
                            value={booking.stops}
                            onFocus={handleFocus}
                            onChange={e => setBooking({ ...booking, stops: e.target.value })}
                        />
                    </div>
                </div>

                {/* Payment */}
                <div>
                    <label className="text-sm font-semibold text-gray-700">Método de Pago</label>
                    <select
                        className="form-select w-full"
                        value={booking.paymentMethod}
                        onFocus={handleFocus}
                        onChange={e => setBooking({ ...booking, paymentMethod: e.target.value })}
                    >
                        <option value="CREDIT_CARD">Tarjeta de Crédito</option>
                        <option value="DEBIT_CARD">Tarjeta de Débito</option>
                        <option value="TRANSFER">Transferencia (Empresas)</option>
                    </select>
                </div>

                <button type="submit" className="btn-primary form-submit w-full text-lg py-3 mt-2 shadow-lg hover:shadow-xl transition-shadow">
                    {user ? "Confirmar Cotización" : "Iniciar Sesión"}
                </button>
            </form>

            {/* Toast */}
            {status.message && (
                <div className={`mt-4 p-4 rounded-lg text-center font-bold animate-fade-in ${status.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
                        status.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-blue-50 text-blue-800'
                    }`}>
                    {status.message}
                </div>
            )}
        </div>
    );
}
