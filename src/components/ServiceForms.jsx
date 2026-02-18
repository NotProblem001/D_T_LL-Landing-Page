import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Clock, User, Briefcase, ChevronDown, Mail, Phone, FileText } from 'lucide-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';

registerLocale('es', es);

const InputGroup = ({ icon: Icon, children }) => (
    <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dtll-blue/60 pointer-events-none">
            <Icon size={18} />
        </div>
        {children}
    </div>
);

const ServiceForms = ({ isOpen, onClose, type }) => {
    const [formData, setFormData] = useState({});

    // Initialize/Reset form data
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (type === 'puntual' && !formData.tipo_viaje) {
                setFormData(prev => ({ ...prev, tipo_viaje: 'ida' }));
            }
        } else {
            document.body.style.overflow = 'unset';
            setFormData({});
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleDateChange = (date, name) => {
        setFormData(prev => ({
            ...prev,
            [name]: date
        }));
    };

    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('es-CL', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
    };

    const formatTime = (date) => {
        if (!date) return '';
        return date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    };

    const sendToWhatsApp = (e) => {
        e.preventDefault();

        let message = "";
        const fechaStr = formatDate(formData.fecha);
        const horaStr = formatTime(formData.fecha); // Getting time from the same date object or separate if needed
        // Note: DatePicker usually handles both, or we use separate inputs. 
        // For simplicity in UX, let's assume 'fecha' carries date. 
        // We might need a separate time picker or just use text for simplicity if strict time isn't needed.
        // Let's use separate DatePicker for time to be precise.

        const fechaIda = formData.fecha ? formatDate(formData.fecha) : 'No definida';
        const horaIda = formData.hora ? formatTime(formData.hora) : 'No definida';

        const fechaRegreso = formData.fecha_regreso ? formatDate(formData.fecha_regreso) : 'No definida';
        const horaRegreso = formData.hora_regreso ? formatTime(formData.hora_regreso) : 'No definida';

        if (type === 'puntual') {
            message = `*SOLICITUD DE TRASLADO PUNTUAL* 🚗\n\n` +
                `*Contacto:*\n` +
                `- Nombre: ${formData.nombre || ''}\n` +
                `- Email: ${formData.email || ''}\n` +
                `- Tel: ${formData.telefono || ''}\n\n` +
                `*Servicio:*\n` +
                `- Origen: ${formData.origen || ''}\n` +
                `- Destino: ${formData.destino || ''}\n` +
                `- Pasajeros: ${formData.pasajeros || ''}\n` +
                `- Paradas: ${formData.paradas ? 'Sí' : 'No'}\n` +
                (formData.paradas ? `- Direcciones Paradas: ${formData.direcciones_paradas || ''}\n` : '') +
                `\n*Fecha y Hora:*\n` +
                `- Ida: ${fechaIda} a las ${horaIda}\n` +
                `- Tipo: ${formData.tipo_viaje === 'ida_vuelta' ? 'Ida y Regreso' : 'Solo Ida'}\n` +
                (formData.tipo_viaje === 'ida_vuelta' ? `- Regreso: ${fechaRegreso} a las ${horaRegreso}\n` : '') +
                `\n*Comentarios:* ${formData.comentarios || 'Ninguno'}`;
        } else if (type === 'corporativo') {
            const inicioEstimado = formData.fecha_inicio ? formatDate(formData.fecha_inicio) : 'No definido';
            message = `*PROPUESTA TRANSPORTE CORPORATIVO* 🏢\n\n` +
                `*Empresa:* ${formData.empresa || ''}\n` +
                `*Contacto:* ${formData.contacto || ''} (${formData.cargo || 'Sin cargo'})\n` +
                `*Email:* ${formData.email || ''}\n` +
                `*Tel:* ${formData.telefono || ''}\n\n` +
                `*Detalles:*\n` +
                `- Tipo: ${formData.tipo_traslado || ''}\n` +
                `- Comunas: ${formData.comunas || ''}\n` +
                `- Pasajeros aprox: ${formData.pasajeros || ''}\n` +
                `- Turno: ${formData.turno || ''}\n` +
                `- Horarios: ${formData.horarios || ''}\n` +
                `- Días: ${formData.dias || ''}\n` +
                `- Inicio estimado: ${inicioEstimado}\n\n` +
                `*Necesidad:* ${formData.necesidad || ''}`;
        } else if (type === 'asesoria') {
            message = `*SOLICITUD DE ASESORÍA* 🤝\n\n` +
                `*Nombre:* ${formData.nombre || ''}\n` +
                `*Empresa:* ${formData.empresa || ''}\n` +
                `*Email:* ${formData.email || ''}\n` +
                `*Tel:* ${formData.telefono || ''}\n\n` +
                `*Mensaje:* ${formData.descripcion || ''}`;
        }

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/56954390949?text=${encodedMessage}`, '_blank');
        onClose();
    };

    const getTitle = () => {
        switch (type) {
            case 'puntual': return 'Cotizar Traslado Puntual';
            case 'corporativo': return 'Propuesta Corporativa';
            case 'asesoria': return 'Solicitar Asesoría';
            default: return '';
        }
    };



    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">

                {/* Header with EXPLICIT text-white to fix visibility issue */}
                <div className="bg-dtll-blue p-6 flex justify-between items-center shrink-0">
                    <h2 className="font-display text-xl md:text-2xl font-bold text-white tracking-wide">{getTitle()}</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"><X size={24} /></button>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                    <form onSubmit={sendToWhatsApp} className="space-y-6">

                        {type === 'puntual' && (
                            <>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-dtll-blue border-b border-gray-200 pb-2 flex items-center gap-2">
                                        <User size={18} /> Datos de contacto
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <InputGroup icon={User}>
                                            <input required name="nombre" value={formData.nombre || ''} placeholder="Nombre completo *" className="input-field pl-10" onChange={handleChange} />
                                        </InputGroup>
                                        <InputGroup icon={Mail}>
                                            <input required type="email" name="email" value={formData.email || ''} placeholder="Email *" className="input-field pl-10" onChange={handleChange} />
                                        </InputGroup>
                                        <InputGroup icon={Phone}>
                                            <input required type="tel" name="telefono" value={formData.telefono || ''} placeholder="Teléfono *" className="input-field pl-10" onChange={handleChange} />
                                        </InputGroup>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-bold text-dtll-blue border-b border-gray-200 pb-2 flex items-center gap-2">
                                        <MapPin size={18} /> Detalles del viaje
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <InputGroup icon={MapPin}>
                                            <input required name="origen" value={formData.origen || ''} placeholder="Dirección de Origen *" className="input-field pl-10" onChange={handleChange} />
                                        </InputGroup>
                                        <InputGroup icon={MapPin}>
                                            <input required name="destino" value={formData.destino || ''} placeholder="Dirección de Destino *" className="input-field pl-10" onChange={handleChange} />
                                        </InputGroup>
                                    </div>
                                    <div className="flex gap-4">
                                        <InputGroup icon={User}>
                                            <input required type="number" name="pasajeros" value={formData.pasajeros || ''} placeholder="Pasajeros" className="input-field pl-10 w-full" onChange={handleChange} min="1" />
                                        </InputGroup>
                                        <label className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-4 rounded-lg cursor-pointer border border-gray-200 w-full hover:bg-gray-100 transition-colors">
                                            <input type="checkbox" name="paradas" checked={formData.paradas || false} className="accent-dtll-orange w-4 h-4" onChange={handleChange} />
                                            ¿Paradas intermedias?
                                        </label>
                                    </div>

                                    {formData.paradas && (
                                        <InputGroup icon={MapPin}>
                                            <input name="direcciones_paradas" value={formData.direcciones_paradas || ''} placeholder="Indicar direcciones de paradas..." className="input-field pl-10" onChange={handleChange} />
                                        </InputGroup>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <InputGroup icon={Calendar}>
                                            <DatePicker
                                                selected={formData.fecha}
                                                onChange={(date) => handleDateChange(date, 'fecha')}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Fecha de Ida"
                                                className="input-field pl-10 w-full"
                                                locale="es"
                                                minDate={new Date()}
                                                required
                                            />
                                        </InputGroup>
                                        <InputGroup icon={Clock}>
                                            <DatePicker
                                                selected={formData.hora}
                                                onChange={(date) => handleDateChange(date, 'hora')}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={15}
                                                timeCaption="Hora"
                                                dateFormat="HH:mm"
                                                placeholderText="Hora Salida"
                                                className="input-field pl-10 w-full"
                                                locale="es"
                                                required
                                            />
                                        </InputGroup>
                                    </div>

                                    <div className="flex gap-6 justify-center py-2">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-dtll-orange transition-colors">
                                                <input type="radio" name="tipo_viaje" value="ida" checked={formData.tipo_viaje === 'ida'} onChange={handleChange} className="appearance-none w-3 h-3 rounded-full checked:bg-dtll-orange" />
                                            </div>
                                            <span className="group-hover:text-dtll-blue transition-colors">Solo Ida</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-dtll-orange transition-colors">
                                                <input type="radio" name="tipo_viaje" value="ida_vuelta" checked={formData.tipo_viaje === 'ida_vuelta'} onChange={handleChange} className="appearance-none w-3 h-3 rounded-full checked:bg-dtll-orange" />
                                            </div>
                                            <span className="group-hover:text-dtll-blue transition-colors">Ida y Vuelta</span>
                                        </label>
                                    </div>

                                    {formData.tipo_viaje === 'ida_vuelta' && (
                                        <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 animate-fade-in-up">
                                            <InputGroup icon={Calendar}>
                                                <DatePicker
                                                    selected={formData.fecha_regreso}
                                                    onChange={(date) => handleDateChange(date, 'fecha_regreso')}
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Fecha Regreso"
                                                    className="input-field pl-10 w-full"
                                                    locale="es"
                                                    minDate={formData.fecha || new Date()}
                                                    required
                                                />
                                            </InputGroup>
                                            <InputGroup icon={Clock}>
                                                <DatePicker
                                                    selected={formData.hora_regreso}
                                                    onChange={(date) => handleDateChange(date, 'hora_regreso')}
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={15}
                                                    timeCaption="Hora"
                                                    dateFormat="HH:mm"
                                                    placeholderText="Hora Regreso"
                                                    className="input-field pl-10 w-full"
                                                    locale="es"
                                                    required
                                                />
                                            </InputGroup>
                                        </div>
                                    )}
                                </div>
                                <textarea name="comentarios" value={formData.comentarios || ''} placeholder="Comentarios adicionales..." className="input-field h-24 pt-3" onChange={handleChange}></textarea>
                            </>
                        )}

                        {type === 'corporativo' && (
                            <>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-dtll-blue border-b border-gray-200 pb-2 flex items-center gap-2">
                                        <Briefcase size={18} /> Empresa y Contacto
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <InputGroup icon={Briefcase}>
                                            <input required name="empresa" value={formData.empresa || ''} placeholder="Empresa *" className="input-field pl-10" onChange={handleChange} />
                                        </InputGroup>
                                        <InputGroup icon={User}>
                                            <input required name="contacto" value={formData.contacto || ''} placeholder="Nombre contacto *" className="input-field pl-10" onChange={handleChange} />
                                        </InputGroup>
                                        <InputGroup icon={Mail}>
                                            <input required type="email" name="email" value={formData.email || ''} placeholder="Email *" className="input-field pl-10" onChange={handleChange} />
                                        </InputGroup>
                                        <InputGroup icon={Phone}>
                                            <input required type="tel" name="telefono" value={formData.telefono || ''} placeholder="Teléfono *" className="input-field pl-10" onChange={handleChange} />
                                        </InputGroup>
                                    </div>
                                    <InputGroup icon={FileText}>
                                        <input name="cargo" value={formData.cargo || ''} placeholder="Cargo (Opcional)" className="input-field pl-10" onChange={handleChange} />
                                    </InputGroup>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-dtll-blue border-b border-gray-200 pb-2 flex items-center gap-2">
                                        <FileText size={18} /> Requerimiento
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="relative">
                                            <select name="tipo_traslado" value={formData.tipo_traslado || ''} className="input-field appearance-none" onChange={handleChange}>
                                                <option value="" disabled>Tipo de Traslado</option>
                                                <option value="Acercamiento Metro">Acercamiento Metro</option>
                                                <option value="Domicilio-Empresa">Domicilio - Empresa</option>
                                                <option value="Mixto">Mixto</option>
                                                <option value="Otro">Otro</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                        </div>
                                        <InputGroup icon={MapPin}>
                                            <input required name="comunas" value={formData.comunas || ''} placeholder="Comunas Involucradas *" className="input-field pl-10" onChange={handleChange} />
                                        </InputGroup>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <InputGroup icon={User}>
                                            <input required name="pasajeros" value={formData.pasajeros || ''} placeholder="N° Pasajeros aprox *" className="input-field pl-10" onChange={handleChange} />
                                        </InputGroup>
                                        <InputGroup icon={Calendar}>
                                            <DatePicker
                                                selected={formData.fecha_inicio}
                                                onChange={(date) => handleDateChange(date, 'fecha_inicio')}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Inicio estimado servicio"
                                                className="input-field pl-10 w-full"
                                                locale="es"
                                                minDate={new Date()}
                                            />
                                        </InputGroup>
                                    </div>
                                    <InputGroup icon={Clock}>
                                        <input required name="turno" value={formData.turno || ''} placeholder="Tipo de Turno (Fijo, Rotativo, etc)" className="input-field pl-10" onChange={handleChange} />
                                    </InputGroup>
                                    <InputGroup icon={Clock}>
                                        <input required name="horarios" value={formData.horarios || ''} placeholder="Horarios de entrada/salida" className="input-field pl-10" onChange={handleChange} />
                                    </InputGroup>
                                    <InputGroup icon={Calendar}>
                                        <input required name="dias" value={formData.dias || ''} placeholder="Días de operación (ej: Lun a Vie)" className="input-field pl-10" onChange={handleChange} />
                                    </InputGroup>
                                    <textarea required name="necesidad" value={formData.necesidad || ''} placeholder="Describe brevemente la necesidad..." className="input-field h-24 pt-3" onChange={handleChange}></textarea>
                                </div>
                            </>
                        )}

                        {type === 'asesoria' && (
                            <div className="space-y-4">
                                <InputGroup icon={User}>
                                    <input required name="nombre" value={formData.nombre || ''} placeholder="Nombre *" className="input-field pl-10" onChange={handleChange} />
                                </InputGroup>
                                <InputGroup icon={Briefcase}>
                                    <input required name="empresa" value={formData.empresa || ''} placeholder="Empresa *" className="input-field pl-10" onChange={handleChange} />
                                </InputGroup>
                                <InputGroup icon={Mail}>
                                    <input required type="email" name="email" value={formData.email || ''} placeholder="Email *" className="input-field pl-10" onChange={handleChange} />
                                </InputGroup>
                                <InputGroup icon={Phone}>
                                    <input required type="tel" name="telefono" value={formData.telefono || ''} placeholder="Teléfono *" className="input-field pl-10" onChange={handleChange} />
                                </InputGroup>
                                <textarea required name="descripcion" value={formData.descripcion || ''} placeholder="¿En qué podemos ayudarte?" className="input-field h-32 pt-3" onChange={handleChange}></textarea>
                            </div>
                        )}

                        <button type="submit" className="w-full btn-primary py-4 text-lg shadow-lg hover:shadow-xl transform transition-transform active:scale-95 flex items-center justify-center gap-2">
                            Enviar por WhatsApp
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ServiceForms;
