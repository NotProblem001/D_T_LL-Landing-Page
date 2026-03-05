import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, Clock } from 'lucide-react';

const BrandDNA = () => {
    return (
        <section id="nuestro-proposito" className="py-24 bg-dtll-warmWhite relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute right-0 top-0 w-96 h-96 bg-dtll-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute left-0 bottom-0 w-96 h-96 bg-dtll-blue rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Purpose */}
                <motion.div
                    className="text-center max-w-4xl mx-auto mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <span className="text-dtll-orange font-bold tracking-wider uppercase text-sm mb-4 block">Nuestro Propósito</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-dtll-blue mb-6">
                        Conectamos personas, empresas y destinos
                        a través de un servicio de transporte confiable
                    </h2>
                    <p className="text-xl text-dtll-gray leading-relaxed">
                        Nuestro propósito es transformar cada traslado en una experiencia segura, organizada y confiable.
                        Más que conectar puntos en el mapa, cuidamos a las personas y respaldamos tu operación en cada recorrido.
                    </p>
                </motion.div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        className="bg-white p-10 rounded-3xl shadow-lg border-l-8 border-dtll-blue transform hover:-translate-y-1 transition-all duration-300"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-dtll-blue/10 p-3 rounded-full">
                                <Shield className="text-dtll-blue" size={28} />
                            </div>
                            <h3 className="font-display text-3xl font-bold text-dtll-blue">Misión</h3>
                        </div>
                        <p className="text-dtll-gray text-lg leading-relaxed">
                            Entregar servicios de transporte privado seguros, organizados y confiables, entregando a empresas y personas la tranquilidad de un traslado bien coordinado.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white p-10 rounded-3xl shadow-lg border-l-8 border-dtll-gold transform hover:-translate-y-1 transition-all duration-300"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-dtll-gold/10 p-3 rounded-full">
                                <Heart className="text-dtll-gold" size={28} />
                            </div>
                            <h3 className="font-display text-3xl font-bold text-dtll-blue">Visión</h3>
                        </div>
                        <p className="text-dtll-gray text-lg leading-relaxed">
                            Ser un referente en transporte privado para empresas y organizaciones, reconocidos por nuestra excelencia operativa y experiencia de servicio.
                        </p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default BrandDNA;
