import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TrackingMap from '../components/TrackingMap';

export default function MiViaje() {
    const { viajeId } = useParams();
    const navigate = useNavigate();
    const [input, setInput] = useState('');

    if (!viajeId) {
        return (
            <div className="pt-32 pb-24 bg-gray-50 min-h-screen flex items-center justify-center px-4">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                    <h1 className="text-xl font-bold text-gray-800 mb-2">Seguimiento en vivo</h1>
                    <p className="text-gray-500 text-sm mb-6">
                        Ingresa el identificador del viaje que te compartió tu empresa para ver la ubicación
                        del conductor en tiempo real.
                    </p>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (input.trim()) navigate(`/mi-viaje/${input.trim()}`);
                        }}
                        className="flex flex-col gap-3"
                    >
                        <input
                            type="text"
                            className="form-input w-full"
                            placeholder="ID del viaje"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit" className="btn-primary w-full py-3">
                            Ver ubicación
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-16 bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 max-w-3xl">
                <h1 className="text-xl font-bold text-gray-800 mb-4">Seguimiento en vivo de tu viaje</h1>
                <TrackingMap viajeId={viajeId} />
            </div>
        </div>
    );
}
