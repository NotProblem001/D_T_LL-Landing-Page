import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logoOnly from '../assets/Logo_Only_DTLL.png';

const Footer = () => {
    return (
        <footer className="bg-dtll-gray text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">

                    {/* Logo & Intro */}
                    <div className="col-span-1 md:col-span-1">
                        <img src={logoOnly} alt="Donde Te Llevo" className="h-16 mb-6 opacity-90" />
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Tu aliado estratégico en transporte corporativo y privado. Certeza, seguridad y flexibilidad en cada ruta.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-dtll-turquoise hover:text-dtll-blue transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-dtll-turquoise hover:text-dtll-blue transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-dtll-turquoise hover:text-dtll-blue transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-display font-bold text-lg mb-6 text-dtll-turquoise">Explora</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
                            <li><a href="#servicios" className="hover:text-white transition-colors">Servicios</a></li>
                            <li><a href="#contacto" className="hover:text-white transition-colors">Cotizar</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Trabaja con nosotros</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="font-display font-bold text-lg mb-6 text-dtll-turquoise">Legal</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li><a href="#" className="hover:text-white transition-colors">Términos y Condiciones</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Reglamento Interno</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-display font-bold text-lg mb-6 text-dtll-turquoise">Contacto</h4>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-start gap-3">
                                <Phone size={18} className="text-dtll-orange mt-1" />
                                <span>+56 9 5439 0949</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail size={18} className="text-dtll-orange mt-1" />
                                <span>info@dondetelevo.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-dtll-orange mt-1" />
                                <span>Región Metropolitana,<br />Chile</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">© 2026 Donde Te Llevo. Todos los derechos reservados.</p>
                    <p className="text-gray-500 text-xs">
                        Diseñado con la nueva Identidad Corporativa
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
