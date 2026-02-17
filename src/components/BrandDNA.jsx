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
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <span className="text-dtll-orange font-bold tracking-wider uppercase text-sm mb-4 block">Nuestro Propósito</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-dtll-blue mb-6">
                        Crear conexiones humanas a través del movimiento
                    </h2>
                    <p className="text-xl text-dtll-gray leading-relaxed">
                        Existimos para que cada viaje sea una experiencia de cuidado. No solo te llevamos a un destino,
                        te acompañamos con la certeza de que tu seguridad y bienestar son nuestra prioridad.
                    </p>
                </div>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-white p-10 rounded-3xl shadow-lg border-l-8 border-dtll-blue transform hover:-translate-y-1 transition-all duration-300">
                        <h3 className="font-display text-3xl font-bold text-dtll-blue mb-4">Misión</h3>
                        <p className="text-dtll-gray text-lg">
                            Brindar un servicio de transporte privado que garantice puntualidad, confort y seguridad,
                            convirtiendo cada traslado en un momento de tranquilidad para nuestros pasajeros.
                        </p>
                    </div>
                    <div className="bg-white p-10 rounded-3xl shadow-lg border-l-8 border-dtll-gold transform hover:-translate-y-1 transition-all duration-300">
                        <h3 className="font-display text-3xl font-bold text-dtll-blue mb-4">Visión</h3>
                        <p className="text-dtll-gray text-lg">
                            Ser reconocidos como el referente de transporte corporativo más humano y confiable del país,
                            integrando tecnología y calidez en cada kilómetro recorrido.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: <Users size={32} />, title: "Cercanía", color: "text-dtll-turquoise", bg: "bg-dtll-turquoise/10" },
                        { icon: <Heart size={32} />, title: "Cuidado", color: "text-dtll-orange", bg: "bg-dtll-orange/10" },
                        { icon: <Shield size={32} />, title: "Seguridad", color: "text-dtll-blue", bg: "bg-dtll-blue/10" },
                        { icon: <Clock size={32} />, title: "Compromiso", color: "text-dtll-gold", bg: "bg-dtll-gold/10" }
                    ].map((val, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className={`p-4 rounded-full mb-4 ${val.bg} ${val.color}`}>
                                {val.icon}
                            </div>
                            <h4 className="font-display font-bold text-xl text-dtll-blue">{val.title}</h4>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default BrandDNA;
