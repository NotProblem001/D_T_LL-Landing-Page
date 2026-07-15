import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { createReport } from '../services/api';
import { useNavigate } from 'react-router-dom';

function usuarioDesdeSesion(navigate) {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
        navigate('/perfil');
        return null;
    }
    try {
        return jwtDecode(token);
    } catch {
        navigate('/perfil');
        return null;
    }
}

export default function Reports() {
    const navigate = useNavigate();
    const [user] = useState(() => usuarioDesdeSesion(navigate));

    // Report State
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');

    // Dynamic Fields State
    const [details, setDetails] = useState({
        subject: '',
        description: '',
        driverName: '',
        licensePlate: '',
        travelDate: '',
        incidentLocation: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'loading', message: 'Enviando reporte...' });

        // Construct detailed subject or description based on fields
        let fullDescription = details.description;
        if (category === 'QUEJA' && (subCategory === 'CONDUCTOR' || subCategory === 'VIAJE')) {
            fullDescription += `\n\n[Detalles Adicionales]`;
            if (details.driverName) fullDescription += `\nConductor: ${details.driverName}`;
            if (details.licensePlate) fullDescription += `\nPatente: ${details.licensePlate}`;
            if (details.travelDate) fullDescription += `\nFecha: ${details.travelDate}`;
            if (details.incidentLocation) fullDescription += `\nLugar: ${details.incidentLocation}`;
        }

        try {
            const payload = {
                reporterId: user.sub || user.email,
                reporterType: 'CLIENT',
                subject: `[${category}${subCategory ? ' - ' + subCategory : ''}] ${details.subject}`,
                description: fullDescription
            };
            await createReport(payload);
            setStatus({ type: 'success', message: 'Reporte enviado correctamente. Gracias por tu feedback.' });
            // Reset form
            setDetails({ subject: '', description: '', driverName: '', licensePlate: '', travelDate: '', incidentLocation: '' });
            setCategory('');
            setSubCategory('');
        } catch {
            setStatus({ type: 'error', message: 'Error al enviar reporte.' });
        }
    };

    if (!user) return null;

    return (
        <div className="container section-padding pt-24 min-h-screen">
            <div className="max-w-2xl mx-auto">
                <div className="card bg-white p-8 shadow-lg rounded-lg border-t-4 border-secondary">
                    <h1 className="text-3xl font-bold mb-2 text-primary">Centro de Ayuda y Reportes</h1>
                    <p className="text-gray-600 mb-6">¿En qué podemos ayudarte hoy? Selecciona una categoría para empezar.</p>

                    <form onSubmit={handleReportSubmit} className="flex flex-col gap-6">

                        {/* Categoria */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Solicitud</label>
                            <select
                                className="form-select w-full"
                                required
                                value={category}
                                onChange={e => { setCategory(e.target.value); setSubCategory(''); }}
                            >
                                <option value="">Seleccione una opción...</option>
                                <option value="CONSULTA">Consulta o Duda</option>
                                <option value="SUGERENCIA">Sugerencia</option>
                                <option value="QUEJA">Problema o Queja</option>
                                <option value="OBJETO_PERDIDO">Objeto Perdido</option>
                                <option value="OTRO">Otro</option>
                            </select>
                        </div>

                        {/* Sub-Categoria Condicional (Solo para Quejas) */}
                        {category === 'QUEJA' && (
                            <div className="animate-fade-in">
                                <label className="block text-sm font-medium text-gray-700 mb-1">¿Con qué tuviste problemas?</label>
                                <select
                                    className="form-select w-full"
                                    required
                                    value={subCategory}
                                    onChange={e => setSubCategory(e.target.value)}
                                >
                                    <option value="">Detalles del problema...</option>
                                    <option value="SITIO_WEB">Sitio Web / App</option>
                                    <option value="VIAJE">Experiencia de Viaje</option>
                                    <option value="CONDUCTOR">Conductor / Trato</option>
                                </select>
                            </div>
                        )}

                        {/* Campos Dinámicos para Conductor/Viaje */}
                        {(subCategory === 'CONDUCTOR' || subCategory === 'VIAJE') && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded border border-gray-200 animate-fade-in">
                                <h4 className="md:col-span-2 font-bold text-sm text-gray-700">Detalles del Incidente (Opcional)</h4>
                                <input
                                    type="text" placeholder="Nombre del Conductor" className="form-input"
                                    value={details.driverName} onChange={e => setDetails({ ...details, driverName: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="Patente / Vehículo" className="form-input"
                                    value={details.licensePlate} onChange={e => setDetails({ ...details, licensePlate: e.target.value })}
                                />
                                <input
                                    type="date" className="form-input"
                                    value={details.travelDate} onChange={e => setDetails({ ...details, travelDate: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="Lugar aproximado" className="form-input"
                                    value={details.incidentLocation} onChange={e => setDetails({ ...details, incidentLocation: e.target.value })}
                                />
                            </div>
                        )}

                        {/* Campos Comunes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Asunto Breve</label>
                            <input
                                type="text"
                                required
                                className="form-input w-full"
                                placeholder={category === 'OBJETO_PERDIDO' ? "Ej: Dejé mi mochila azul..." : "Ej: Error al reservar..."}
                                value={details.subject}
                                onChange={e => setDetails({ ...details, subject: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Detallada</label>
                            <textarea
                                rows="5"
                                required
                                className="form-textarea w-full"
                                placeholder="Cuéntanos más detalles..."
                                value={details.description}
                                onChange={e => setDetails({ ...details, description: e.target.value })}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn-secondary w-full py-3 text-lg">
                            Enviar Solicitud
                        </button>
                    </form>

                    {/* Toast */}
                    {status.message && (
                        <div className={`mt-6 p-4 rounded text-center font-bold animate-fade-in ${status.type === 'success' ? 'bg-green-100 text-green-800' :
                            status.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                            {status.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
