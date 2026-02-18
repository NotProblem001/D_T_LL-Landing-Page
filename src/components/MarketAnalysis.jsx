import React from 'react';
import { ShieldCheck, UserCheck, BarChart3 } from 'lucide-react';

const MarketAnalysis = () => {
    const points = [
        {
            icon: <ShieldCheck size={40} className="text-dtll-turquoise" />,
            title: "Profesionalización",
            description: "Trabajamos bajo el Decreto 80 y estándares corporativos exigentes, asegurando formalidad y cumplimiento en cada servicio."
        },
        {
            icon: <UserCheck size={40} className="text-dtll-orange" />,
            title: "Experiencia del Pasajero",
            description: "Cuidamos cada viaje porque sabemos que impacta en las personas y en su jornada laboral."
        },
        {
            icon: <BarChart3 size={40} className="text-dtll-gold" />,
            title: "Control y Coordinación",
            description: "Supervisamos y coordinamos cada servicio con comunicación directa y seguimiento constante."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-display text-4xl font-bold text-dtll-blue mb-4">Entendiendo el Mercado</h2>
                    <p className="text-lg text-dtll-gray">
                        No ofrecemos vehículos. <br />
                        Ofrecemos experiencias de traslado diseñadas para que tu operación funcione sin interrupciones.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {points.map((item, index) => (
                        <div key={index} className="bg-dtll-warmWhite rounded-2xl p-8 hover:shadow-xl transition-shadow border border-gray-100 group">
                            <div className="mb-6 bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="font-display text-2xl font-bold text-dtll-blue mb-4">{item.title}</h3>
                            <p className="text-dtll-gray leading-relaxed text-base">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarketAnalysis;
