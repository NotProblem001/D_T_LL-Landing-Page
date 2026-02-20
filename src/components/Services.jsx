import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building2, ArrowRight, MessageSquareText } from 'lucide-react';
import ServiceForms from './ServiceForms';

const Services = () => {
    const [modalInfo, setModalInfo] = useState({ isOpen: false, type: null });

    const openModal = (type) => setModalInfo({ isOpen: true, type });
    const closeModal = () => setModalInfo({ isOpen: false, type: null });

    return (
        <section id="servicios" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-dtll-orange font-bold tracking-wider uppercase text-sm mb-2 block">SOLUCIONES A MEDIDA</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-dtll-blue mb-6">NUESTROS SERVICIOS</h2>
                    <p className="text-xl text-dtll-gray leading-relaxed">
                        Nos adaptamos a distintas necesidades de traslado. <br />
                        Selecciona la opción que mejor se ajuste a tu requerimiento.
                    </p>
                </div>

                {/* Cards Grid */}
                <motion.div
                    className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >

                    {/* Card 1: Traslados Puntuales */}
                    <motion.div
                        className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col group"
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { duration: 1 } }
                        }}
                    >
                        <div className="bg-dtll-turquoise/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-dtll-turquoise/20 transition-colors">
                            <Calendar className="text-dtll-turquoise" size={32} />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-dtll-blue mb-4">Traslados Puntuales</h3>
                        <p className="text-dtll-gray mb-6 flex-grow">
                            Coordinamos servicios en fechas específicas para eventos, reuniones o necesidades particulares.
                        </p>

                        <div className="bg-gray-50 rounded-xl p-5 mb-8 border border-gray-100">
                            <p className="text-sm font-semibold text-dtll-blue mb-2">Ideal para:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• Eventos corporativos</li>
                                <li>• Traslados al aeropuerto</li>
                                <li>• Visitas técnicas</li>
                            </ul>
                        </div>

                        <button
                            onClick={() => openModal('puntual')}
                            className="w-full py-4 rounded-xl border-2 border-dtll-turquoise text-dtll-blue font-bold hover:bg-dtll-turquoise hover:text-white transition-all flex items-center justify-center gap-2 group-hover:gap-3"
                        >
                            Cotizar traslado puntual
                            <ArrowRight size={20} />
                        </button>
                    </motion.div>

                    {/* Card 2: Transporte Corporativo */}
                    <motion.div
                        className="bg-dtll-blue rounded-3xl p-8 shadow-xl border border-dtll-blue hover:shadow-2xl transition-all duration-300 flex flex-col relative overflow-hidden group"
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { duration: 1 } }
                        }}
                    >
                        {/* Decorative bg */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>

                        <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                            <Building2 className="text-white" size={32} />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-white mb-4">Transporte Corporativo</h3>
                        <p className="text-gray-200 mb-6 flex-grow">
                            Diseñamos soluciones de traslado para empresas que requieren movilizar trabajadores en turnos definidos o puntos estratégicos.
                        </p>

                        <div className="bg-white/5 rounded-xl p-5 mb-8 border border-white/10">
                            <p className="text-sm font-semibold text-white mb-2">Incluye:</p>
                            <ul className="text-sm text-gray-300 space-y-1">
                                <li>• Planificación de rutas</li>
                                <li>• Gestión de turnos</li>
                                <li>• Reportabilidad mensual</li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => openModal('corporativo')}
                                className="w-full py-4 rounded-xl bg-dtll-orange text-white font-bold hover:bg-white hover:text-dtll-orange transition-all shadow-lg text-center"
                            >
                                Solicitar propuesta
                            </button>
                            <button
                                onClick={() => openModal('corporativo')} // Reuse logic or specific
                                className="w-full py-3 rounded-xl bg-transparent border border-white/30 text-white font-semibold hover:bg-white/10 transition-all text-sm"
                            >
                                Agendar reunión
                            </button>
                        </div>
                    </motion.div>

                </motion.div>

                {/* Banner Asesoría */}
                <motion.div
                    className="max-w-4xl mx-auto mt-20 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 1 }}
                >
                    <div className="flex items-start gap-4">
                        <div className="bg-dtll-gold/10 p-4 rounded-full">
                            <MessageSquareText className="text-dtll-gold" size={32} />
                        </div>
                        <div>
                            <h4 className="font-display text-xl font-bold text-dtll-blue mb-2">¿Necesitas orientación?</h4>
                            <p className="text-dtll-gray text-sm md:text-base">
                                Si aún no tienes el servicio estructurado, te asesoramos en la planificación completa.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => openModal('asesoria')}
                        className="whitespace-nowrap px-8 py-3 bg-dtll-warmWhite text-dtll-blue font-bold rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                        Solicitar Asesoría
                    </button>
                </motion.div>

            </div>

            {/* Modal */}
            <ServiceForms
                isOpen={modalInfo.isOpen}
                onClose={closeModal}
                type={modalInfo.type}
            />
        </section>
    );
};

export default Services;
