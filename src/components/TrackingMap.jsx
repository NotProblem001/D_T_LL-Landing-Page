import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { API_URL, obtenerUbicacionViaje } from '../services/api';

const iconoConductor = L.divIcon({
    className: 'conductor-marker',
    html: '<div style="background:#1d4ed8;width:18px;height:18px;border-radius:50%;border:3px solid white;box-shadow:0 0 0 2px #1d4ed8;"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
});

export default function TrackingMap({ viajeId }) {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [estado, setEstado] = useState('conectando'); // conectando | en_vivo | sin_datos

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        const map = L.map(mapContainerRef.current).setView([-33.4489, -70.6693], 12); // Santiago por defecto
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19,
        }).addTo(map);
        mapRef.current = map;

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    const actualizarPosicion = (lat, lng) => {
        const map = mapRef.current;
        if (!map) return;

        if (!markerRef.current) {
            markerRef.current = L.marker([lat, lng], { icon: iconoConductor }).addTo(map);
        } else {
            markerRef.current.setLatLng([lat, lng]);
        }
        map.setView([lat, lng], 15);
        setEstado('en_vivo');
    };

    useEffect(() => {
        if (!viajeId) return;

        let activo = true;

        obtenerUbicacionViaje(viajeId)
            .then((data) => {
                if (activo) actualizarPosicion(data.lat, data.lng);
            })
            .catch(() => {
                if (activo) setEstado('sin_datos');
            });

        const client = new Client({
            webSocketFactory: () => new SockJS(`${API_URL}/ws`),
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe(`/topic/viaje/${viajeId}/ubicacion`, (message) => {
                    const data = JSON.parse(message.body);
                    actualizarPosicion(data.lat, data.lng);
                });
            },
        });
        client.activate();

        return () => {
            activo = false;
            client.deactivate();
        };
    }, [viajeId]);

    return (
        <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <div ref={mapContainerRef} className="w-full h-72 sm:h-96" />
            <div className="bg-white px-4 py-2 text-xs text-gray-500 flex items-center gap-2">
                <span
                    className={`inline-block w-2 h-2 rounded-full ${estado === 'en_vivo' ? 'bg-green-500' : estado === 'sin_datos' ? 'bg-gray-400' : 'bg-amber-400 animate-pulse'
                        }`}
                />
                {estado === 'en_vivo' && 'Ubicación en vivo del conductor'}
                {estado === 'conectando' && 'Conectando con el conductor...'}
                {estado === 'sin_datos' && 'Aún no hay ubicación disponible para este viaje'}
            </div>
        </div>
    );
}
