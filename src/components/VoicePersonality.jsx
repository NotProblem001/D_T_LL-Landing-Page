import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const VoicePersonality = () => {
    const reasons = [
        {
            title: "Seguridad y Puntualidad",
            desc: "Nuestros protocolos son estrictos. Tu tiempo y tu integridad son innegociables para nosotros."
        },
        {
            title: "Trato Respetuoso y Humano",
            desc: "Nuestros conductores son seleccionados no solo por su pericia al volante, sino por su calidad humana."
        },
        {
            title: "Tecnología y Reportabilidad",
            desc: "Plataforma de gestión, tracking GPS y reportes detallados para que siempre tengas el control."
        }
    ];

    return (
        <section className="py-24 bg-dtll-blue text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#68dfd5 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">

                <div className="md:w-1/2">
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight text-white">
                        ¿Por qué elegir <br />
                        <span className="text-dtll-turquoise">Donde Te Llevo?</span>
                    </h2>
                    <p className="text-xl text-dtll-lilac mb-8">
                        Porque entendemos que detrás de cada traslado hay una reunión importante, un evento especial o el regreso a casa de un equipo de trabajo.
                    </p>
                    <div className="inline-block border-l-4 border-dtll-orange pl-6 py-2">
                        <p className="font-display text-2xl font-bold italic">"Tu viaje, nuestro compromiso"</p>
                    </div>
                </div>

                <div className="md:w-1/2 space-y-6">
                    {reasons.map((reason, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                            <div className="flex items-start gap-4">
                                <CheckCircle2 className="text-dtll-turquoise shrink-0 mt-1" size={28} />
                                <div>
                                    <h3 className="font-display font-bold text-xl mb-2 text-dtll-gold">{reason.title}</h3>
                                    <p className="text-gray-200 opacity-90">{reason.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default VoicePersonality;
