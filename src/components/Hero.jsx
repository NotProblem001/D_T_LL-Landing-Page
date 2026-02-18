import React from 'react';
import { ChevronRight } from 'lucide-react';
import HeroImage from '../assets/DTLL_PromocionPrincipal.png';
import logoName from '../assets/Logo_NameSubtitle_DTLL.png';

const Hero = () => {
    const scrollToContact = (e) => {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-center bg-gradient-to-br from-dtll-warmWhite to-gray-100 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-dtll-blue opacity-5 -skew-x-12 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-dtll-turquoise opacity-5 rounded-tr-full"></div>

            <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-8 animate-fade-in-up">
                    <div className="inline-block bg-dtll-blue/10 px-4 py-2 rounded-full text-dtll-blue text-sm font-semibold tracking-wide uppercase">
                        TRANSPORTE DE PASAJEROS
                    </div>

                    <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-tight text-dtll-blue">
                        Más que transporte, <span className="text-dtll-orange relative">tu aliado
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-dtll-gold opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </span>
                    </h1>

                    <p className="font-body text-xl text-dtll-gray max-w-lg leading-relaxed">
                        Transporte de pasajeros para empresas y particulares.
                        Nos adaptamos a cada necesidad y aseguramos un servicio organizado, puntual y confiable.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a href="#contact" onClick={scrollToContact} className="group relative px-8 py-4 bg-dtll-orange text-white font-bold rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            <span className="relative z-10 flex items-center gap-2">
                                Cotizar Traslado
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </a>

                        <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-8 py-4 border-2 border-dtll-blue text-dtll-blue font-bold rounded-full hover:bg-dtll-blue hover:text-white transition-all">
                            Nuestros servicios
                        </a>
                    </div>
                </div>

                {/* Visual Content */}
                <div className="relative hidden md:block">
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl skew-y-3 hover:skew-y-0 transition-all duration-700 border-4 border-white">
                        <img
                            src={HeroImage}
                            alt="Experiencia de transporte premium"
                            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dtll-blue/60 to-transparent mix-blend-multiply"></div>
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl z-20 max-w-xs animate-float">
                        <div className="flex items-center gap-4">
                            <div className="bg-green-100 p-3 rounded-full text-green-600">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-semibold">Garantía de Servicio</p>
                                <p className="text-dtll-blue font-bold">¿Listo para el recorrido?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
