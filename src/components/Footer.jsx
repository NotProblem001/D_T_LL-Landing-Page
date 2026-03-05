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
                                <a href="https://wa.me/message/UJWAK6N7IUA2G1?src=qr" target="_blank" rel="noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-dtll-turquoise hover:text-dtll-blue transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-whatsapp">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                        <path d="M11.996 2.004c-5.522 0-9.996 4.475-9.996 9.998 0 1.765.46 3.486 1.336 5.003L2 22l5.122-1.343a9.963 9.963 0 0 0 4.874 1.259h.004c5.52 0 9.996-4.475 9.996-9.997 0-5.523-4.476-9.997-10.002-9.997z" />
                                    </svg>
                                </a>
                                <a href="https://www.instagram.com/dondetellevo_transportes/" target="_blank" rel="noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-dtll-turquoise hover:text-dtll-blue transition-colors"><Instagram size={28} /></a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-display font-bold text-lg mb-6 text-dtll-turquoise">Explora</h4>
                            <ul className="space-y-4 text-sm text-gray-300">
                                <li><a href="#Hero" className="hover:text-white transition-colors">Inicio</a></li>
                                <li><a href="#market-analysis" className="hover:text-white transition-colors">Entendiendo el Mercado</a></li>
                                <li><a href="#nuestro-proposito" className="hover:text-white transition-colors">Nuestro Propósito</a></li>
                                <li><a href="#diferencia" className="hover:text-white transition-colors">¿La diferencia de trabajar con Donde Te Llevo?</a></li>
                                <li><a href="#servicios" className="hover:text-white transition-colors">Contáctanos</a></li>
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
