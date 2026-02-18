import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import logoOnly from '../assets/Logo_Only_DTLL.png';
import LegalModal from './LegalModal';
import { legalContent } from '../data/legalContent';

const Footer = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentLegalDoc, setCurrentLegalDoc] = useState(null);

    const openLegalModal = (docType) => {
        const doc = legalContent[docType];
        if (doc) {
            setCurrentLegalDoc(doc);
            setModalOpen(true);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setCurrentLegalDoc(null);
    };

    return (
        <>
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
                            <ul className="space-y-4 text-sm text-gray-300 cursor-pointer">
                                <li><button onClick={() => openLegalModal('terminos')} className="hover:text-white transition-colors text-left">Términos y Condiciones</button></li>
                                <li><button onClick={() => openLegalModal('privacidad')} className="hover:text-white transition-colors text-left">Política de Privacidad</button></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-display font-bold text-lg mb-6 text-dtll-turquoise">Contacto</h4>
                            <ul className="space-y-4 text-sm text-gray-300 mb-6">
                                <li className="flex items-start gap-3">
                                    <Phone size={18} className="text-dtll-orange mt-1" />
                                    <span>+56 9 5439 0949</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Mail size={18} className="text-dtll-orange mt-1" />
                                    <span>transportes.dondetellevo@gmail.com</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <MapPin size={18} className="text-dtll-orange mt-1" />
                                    <span>Región Metropolitana,<br />Chile</span>
                                </li>
                            </ul>

                            {/* WhatsApp QR & Link */}
                            <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10">
                                <img src="/src/assets/QR_DondeTeLlevo_CONTACTO.jpg" alt="QR WhatsApp" className="w-16 h-16 rounded-lg bg-white" />
                                <div>
                                    <p className="text-xs text-dtll-turquoise mb-1 font-bold">CONTACTO DIRECTO</p>
                                    <a
                                        href="https://wa.me/message/UJWAK6N7IUA2G1?src=qr"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm text-white hover:text-dtll-orange transition-colors flex items-center gap-1"
                                    >
                                        Abrir WhatsApp <ArrowRight size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">© 2026 Donde Te Llevo. Todos los derechos reservados.</p>
                        <p className="text-gray-500 text-xs">
                            Cumplimiento Decreto 80 | Ley 19.628
                        </p>
                    </div>
                </div>
            </footer>

            {/* Modal Render */}
            {currentLegalDoc && (
                <LegalModal
                    isOpen={modalOpen}
                    onClose={closeModal}
                    title={currentLegalDoc.title}
                    content={currentLegalDoc.content}
                />
            )}
        </>
    );
};

export default Footer;
