import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { createReport, createBooking } from '../services/api';

export default function UserSections() {
    const [user, setUser] = useState(null);

    // Booking State
    const [booking, setBooking] = useState({
        origin: '',
        destination: '',
        paymentMethod: 'CASH'
    });

    // Report State
    const [report, setReport] = useState({
        subject: '',
        description: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (e) {
                setUser(null);
            }
        }
    }, []);

    if (!user) return null;

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Procesando reserva...' });
        try {
            const payload = {
                passengerId: user.sub || user.email,
                origin: { address: booking.origin, latitude: 0, longitude: 0 },
                destination: { address: booking.destination, latitude: 0, longitude: 0 },
                paymentMethod: booking.paymentMethod,
                estimatedPrice: 15000.0 // Mock price
            };
            await createBooking(payload);
            setStatus({ type: 'success', message: '¡Viaje reservado con éxito!' });
            setBooking({ origin: '', destination: '', paymentMethod: 'CASH' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Error al reservar. Intente nuevamente.' });
        }
    };

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Enviando reporte...' });
        try {
            const payload = {
                reporterId: user.sub || user.email,
                reporterType: 'CLIENT',
                subject: report.subject,
                description: report.description
            };
            await createReport(payload);
            setStatus({ type: 'success', message: 'Reporte enviado correctamente.' });
            setReport({ subject: '', description: '' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Error al enviar reporte.' });
        }
    };

    return (
        <div className="container section-padding">
            <div className="grid grid-2 gap-8">

                {/* Booking Form */}
                <div id="agendar" className="card bg-white p-6 shadow-lg rounded-lg border-l-4 border-accent">
                    <h2 className="text-2xl font-bold mb-4 text-primary">Solicitar Servicio</h2>
                    <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Origen</label>
                            <input
                                type="text"
                                required
                                className="form-input w-full"
                                placeholder="Dirección de recogida"
                                value={booking.origin}
                                onChange={e => setBooking({ ...booking, origin: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Destino</label>
                            <input
                                type="text"
                                required
                                className="form-input w-full"
                                placeholder="Dirección de destino"
                                value={booking.destination}
                                onChange={e => setBooking({ ...booking, destination: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Pago</label>
                            <select
                                className="form-select w-full"
                                value={booking.paymentMethod}
                                onChange={e => setBooking({ ...booking, paymentMethod: e.target.value })}
                            >
                                <option value="CASH">Efectivo</option>
                                <option value="CREDIT_CARD">Tarjeta de Crédito</option>
                                <option value="DEBIT_CARD">Tarjeta de Débito</option>
                            </select>
                        </div>
                        <button type="submit" className="btn-primary w-full mt-2">
                            Confirmar Viaje
                        </button>
                    </form>
                </div>

                {/* Report Form */}
                <div id="reportes" className="card bg-white p-6 shadow-lg rounded-lg border-l-4 border-secondary">
                    <h2 className="text-2xl font-bold mb-4 text-primary">Crear Reporte</h2>
                    <form onSubmit={handleReportSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Asunto</label>
                            <input
                                type="text"
                                required
                                className="form-input w-full"
                                placeholder="Objeto perdido, Queja, etc."
                                value={report.subject}
                                onChange={e => setReport({ ...report, subject: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Descripción</label>
                            <textarea
                                rows="3"
                                required
                                className="form-textarea w-full"
                                placeholder="Detalle su reporte..."
                                value={report.description}
                                onChange={e => setReport({ ...report, description: e.target.value })}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-secondary w-full mt-2">
                            Enviar Reporte
                        </button>
                    </form>
                </div>

            </div>

            {/* Toast / Status Message */}
            {status.message && (
                <div className={`mt-4 p-4 rounded text-center font-bold ${status.type === 'success' ? 'bg-green-100 text-green-800' :
                        status.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                    {status.message}
                </div>
            )}
        </div>
    );
}
