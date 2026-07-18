import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import HeroImage from '../assets/DTLL_PromocionPrincipal.png';
import Promocion1 from '../assets/DTLL_Promocion1.png';
import DTLL1 from '../assets/DTLL_1.png';
import DTLL2 from '../assets/DTLL_2.png';
import DTLL3 from '../assets/DTLL_3.png';
import logoName from '../assets/Logo_NameSubtitle_DTLL.png';

const carouselImages = [HeroImage, Promocion1, DTLL1, DTLL2, DTLL3];

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
        }, 4000); // Cambia la imagen cada 4 segundos
        return () => clearInterval(interval);
    }, []);

    const scrollToContact = (e) => {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="Hero" className="relative w-full h-screen min-h-[600px] flex items-center bg-gradient-to-br from-dtll-warmWhite to-gray-100 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-dtll-blue opacity-5 -skew-x-12 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-dtll-turquoise opacity-5 rounded-tr-full"></div>

            <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-8 animate-fade-in-up">
                    <div className="inline-block bg-dtll-blue/10 px-4 py-2 rounded-full text-dtll-blue text-sm font-semibold tracking-wide uppercase">
                        TRANSPORTE PRIVADO DE PASAJEROS
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight text-dtll-blue">
                        <span className="font-avant-garde-medium">Más que transporte,</span>{' '}
                        <span className="relative inline-block text-dtll-orange font-avant-garde-bold">
                            tu aliado
                            <svg
                                viewBox="0 0 286 73"
                                fill="none"
                                className="absolute -left-3 -right-5 -top-3 -bottom-3 w-[112%] h-[100%] translate-y-1.5"
                            >
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                    }}
                                    d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
                                    stroke="#ed6f32"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        {'  '}  en cada traslado
                    </h1>

                    <p className="font-body text-xl text-dtll-gray max-w-lg leading-relaxed">
                        Coordinamos transporte privado de pasajeros para empresas y particulares, con un servicio coordinado, puntual y confiable.
                        Nuestro compromiso es que cada recorrido se realice con organización, confianza y tranquilidad para nuestros clientes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a href="#market-analysis" onClick={(e) => { e.preventDefault(); document.getElementById('market-analysis')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-8 py-4 border-2 border-dtll-blue text-dtll-blue font-bold rounded-full hover:bg-dtll-blue hover:text-white transition-all">
                            Conoce nuestros servicios
                        </a>

                        <a href="#contact" onClick={scrollToContact} className="group relative px-8 py-4 bg-dtll-orange text-white font-bold rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            <span className="relative z-10 flex items-center gap-2">
                                Cotiza con nosotros
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        </a>
                    </div>
                </div>

                {/* Visual Content */}
                <div className="relative hidden md:block">
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl skew-y-3 hover:skew-y-0 transition-all duration-700 border-4 border-dtll-gold aspect-[4/3] bg-dtll-blue/10">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={carouselImages[currentImageIndex]}
                                alt="Experiencia de transporte premium"
                                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 absolute top-0 left-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                            />
                        </AnimatePresence>
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-dtll-blue/60 to-transparent mix-blend-multiply z-10 pointer-events-none"></div>
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
