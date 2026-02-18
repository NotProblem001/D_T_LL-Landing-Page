import React from 'react';
import { Heart, Shield, Users, Clock } from 'lucide-react';

const BrandDNA = () => {
    return (
        <section className="py-24 bg-dtll-warmWhite relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute right-0 top-0 w-96 h-96 bg-dtll-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute left-0 bottom-0 w-96 h-96 bg-dtll-blue rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Purpose */}
                <div className="text-center max-w-4xl mx-auto mb-20 animate-fade-in-up">
                    <span className="text-dtll-orange font-bold tracking-wider uppercase text-sm mb-4 block">Nuestro Propósito</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-dtll-blue mb-6">
                        Crear conexiones humanas a través del movimiento
                    </h2>
                    <p className="text-xl text-dtll-gray leading-relaxed">
                        Existimos para transformar el traslado en una experiencia que suma valor.
                        No solo conectamos puntos en el mapa; protegemos a las personas, cuidamos los procesos y respaldamos tu operación en cada kilómetro.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-white p-10 rounded-3xl shadow-lg border-l-8 border-dtll-blue transform hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-dtll-blue/10 p-3 rounded-full">
                                <Shield className="text-dtll-blue" size={28} />
                            </div>
                            <h3 className="font-display text-3xl font-bold text-dtll-blue">Misión</h3>
                        </div>
                        <p className="text-dtll-gray text-lg leading-relaxed">
                            Ser el referente en transporte privado para personas y organizaciones, reconocidos por nuestra excelencia operativa y experiencia de servicio.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-3xl shadow-lg border-l-8 border-dtll-gold transform hover:-translate-y-1 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-dtll-gold/10 p-3 rounded-full">
                                <Heart className="text-dtll-gold" size={28} />
                            </div>
                            <h3 className="font-display text-3xl font-bold text-dtll-blue">Visión</h3>
                        </div>
                        <p className="text-dtll-gray text-lg leading-relaxed">
                            Consolidarnos como el referente en transporte privado para personas y organizaciones, reconocidos por nuestra excelencia operativa y experiencia de servicio.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BrandDNA;
