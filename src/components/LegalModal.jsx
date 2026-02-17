import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const LegalModal = ({ isOpen, onClose, title, content }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-dtll-gray rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-fade-in-up border border-white/10">

                {/* Header */}
                <div className="bg-dtll-blue p-6 flex justify-between items-center text-white shrink-0">
                    <h2 className="font-display text-xl md:text-2xl font-bold text-white">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Cerrar"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar text-gray-100 text-sm md:text-base leading-relaxed [&_h3]:!text-white [&_strong]:!text-white">
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>

                {/* Footer */}
                <div className="p-4 bg-black/20 border-t border-white/10 flex justify-end shrink-0">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-dtll-orange text-white font-bold rounded-lg hover:bg-opacity-90 transition-all text-sm"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LegalModal;
