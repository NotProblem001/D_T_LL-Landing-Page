import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const VoicePersonality = () => {
    const reasons = [
        {
            title: "Gestión Profesional",
            desc: "Nos encargamos de planificar y coordinar cada servicio con estructura, control y comunicación clara."
        },
        {
            title: "Respaldo y Confianza",
            desc: "Operamos con cumplimiento normativo, equipo calificado y estándares definidos que aseguran seriedad en cada traslado."
        }
    ];

    return (
        <section className="py-24 bg-dtll-blue text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#68dfd5 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
                <motion.div
                    className="md:w-1/2"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight text-white">
                        ¿Por qué elegir <br />
                        <span className="text-dtll-turquoise">Donde Te Llevo?</span>
                    </h2>
                    <p className="text-xl text-dtll-lilac mb-8 font-light">
                        Porque cumplimos. <br />
                        Llegamos a tiempo y hacemos que todo funcione.
                    </p>
                    <div className="inline-block border-l-4 border-dtll-orange pl-6 py-2">
                        <p className="font-display text-2xl font-bold italic">"La decisión es tuya. La responsabilidad, nuestra."</p>
                    </div>
                </motion.div>

                <div className="md:w-1/2 space-y-6">
                    {reasons.map((reason, idx) => (
                        <motion.div
                            key={idx}
                            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, delay: idx * 0.2 }}
                        >
                            <div className="flex items-start gap-4">
                                <CheckCircle2 className="text-dtll-turquoise shrink-0 mt-1" size={28} />
                                <div>
                                    <h3 className="font-display font-bold text-xl mb-2 text-dtll-gold">{reason.title}</h3>
                                    <p className="text-gray-200 opacity-90">{reason.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default VoicePersonality;
