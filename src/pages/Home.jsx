import Section from "../components/Section";
import ScrollBus from "../components/ScrollBus";
import qrContact from "../assets/QR_DondeTeLlevo_CONTACTO.jpg";

export default function Home() {
  return (
    <main className="main-content">
      <ScrollBus />

      {/* Hero Section */}
      <Section id="inicio" className="hero-section">
        <div className="grid grid-2 items-center">
          <div className="hero-text">
            <h1 className="hero-title">
              Tu viaje, <span className="text-accent">nuestra responsabilidad</span>
            </h1>
            <h3 className="hero-subtitle">
              Conectamos empresas y eventos con movilidad premium y segura.
            </h3>
            <div className="flex hero-buttons gap-4">
              <a href="#contacto" onClick={(e) => { e.preventDefault(); document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' }); }} className="btn-primary shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-lg px-8 py-3 rounded-full">
                Solicita tu traslado
              </a>
              <a href="#servicios" onClick={(e) => { e.preventDefault(); document.getElementById('servicios').scrollIntoView({ behavior: 'smooth' }); }} className="btn-secondary text-lg px-8 py-3 rounded-full">
                Conoce más
              </a>
            </div>
          </div>
          <div className="hero-image-container">
            <img src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
              alt="Autobús Premium"
              className="hero-image" />
          </div>
        </div>
      </Section>

      {/* Servicios Section */}
      <Section id="servicios" title="Nuestros Servicios" subtitle="Soluciones de transporte a tu medida" variant="offset">
        <div className="grid grid-2">
          <div className="card service-card">
            <div className="service-icon">🏢</div>
            <h3>Transporte Empresarial</h3>
            <p>Traslados seguros y puntuales para tu equipo. Garantiza la llegada a tiempo y descansada de tus colaboradores.</p>
            <ul className="feature-list">
              <li>Rutas optimizadas diarias</li>
              <li>Unidades modernas y sanitizadas</li>
              <li>Monitoreo en tiempo real</li>
            </ul>
          </div>
          <div className="card service-card">
            <div className="service-icon">🎉</div>
            <h3>Eventos Especiales</h3>
            <p>Logística de transporte para bodas, congresos y celebraciones. La mejor experiencia para tus invitados.</p>
            <ul className="feature-list">
              <li>Coordinación logística completa</li>
              <li>Vehículos ejecutivos y de lujo</li>
              <li>Disponibilidad 24/7</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Valoraciones Section */}
      <Section id="valoraciones" title="Lo que dicen nuestros clientes" subtitle="Confianza respaldada por experiencias reales">
        <div className="grid grid-3">
          <div className="card review-card">
            <p className="review-text">"Excelente servicio. Nuestro equipo llega puntual y seguro todos los días. Un aliado estratégico indispensable."</p>
            <div className="review-author">María González</div>
            <div className="review-role">Gerente RRHH, TechCorp</div>
          </div>
          <div className="card review-card">
            <p className="review-text">"Para nuestra boda queríamos lo mejor, y 'Donde Te Llevo' superó las expectativas. Los choferes muy amables."</p>
            <div className="review-author">Carlos Rodríguez</div>
            <div className="review-role">Cliente Particular</div>
          </div>
          <div className="card review-card">
            <p className="review-text">"Organización impecable para nuestro congreso anual. Movilizaron a 500 personas sin contratiempos."</p>
            <div className="review-author">Ana Torres</div>
            <div className="review-role">Event Planner</div>
          </div>
        </div>
      </Section>

      {/* Galeria Section */}
      <Section id="galeria" title="Nuestra Flota" subtitle="Confort y seguridad en cada viaje" variant="dark">
        <div className="grid grid-4 gallery-grid">
          <img src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Interior Bus" className="gallery-img" />
          <img src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bus Exterior" className="gallery-img" />
          <img src="https://images.unsplash.com/photo-1494515855673-b8a2001e4a28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Conductor Profesional" className="gallery-img" />
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Viaje en carretera" className="gallery-img" />
        </div>
      </Section>

      {/* Contacto Section */}
      <Section id="contacto" title="Contáctanos Directamente" subtitle="Empieza tu próximo viaje con nosotros">
        <div className="contact-container grid grid-2 items-center">
          <div className="contact-info">
            <h3 className="mb-4">Información de Contacto</h3>
            <p className="contact-desc mb-6">¿Listo para partir? Escríbenos por WhatsApp para agendar tu servicio de manera inmediata.</p>

            <a
              href="https://wa.me/message/UJWAK6N7IUA2G1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp shadow-xl transition-all text-lg px-8 py-4 rounded-full inline-flex items-center gap-3 mb-8"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382C17.112 14.202 15.344 13.332 15.013 13.216C14.682 13.101 14.441 13.043 14.2 13.404C13.96 13.765 13.269 14.576 13.058 14.806C12.848 15.036 12.638 15.065 12.277 14.885C11.917 14.704 10.758 14.325 9.38505 13.1C8.28305 12.117 7.53805 10.903 7.32805 10.542C7.11705 10.182 7.30505 9.98703 7.48505 9.80803C7.64705 9.64803 7.84405 9.39003 8.02405 9.18003C8.20505 8.96903 8.26505 8.81903 8.38505 8.57903C8.50505 8.33803 8.44505 8.12803 8.35505 7.94803C8.26505 7.76703 7.54405 5.99303 7.24305 5.27103C6.95005 4.56903 6.65305 4.66503 6.42705 4.65503C6.21605 4.64603 5.97605 4.64303 5.73505 4.64303C5.49505 4.64303 5.10505 4.73303 4.77405 5.09403C4.44405 5.45403 3.51305 6.32503 3.51305 8.09703C3.51305 9.86903 4.80405 11.581 4.98405 11.821C5.16505 12.062 7.53805 15.723 11.171 17.292C12.036 17.665 12.711 17.887 13.238 18.055C14.072 18.32 14.836 18.281 15.437 18.192C16.107 18.092 17.499 17.349 17.79 16.538C18.081 15.727 18.081 15.036 17.991 14.886C17.901 14.736 17.661 14.653 17.3 14.473H17.472Z" />
              </svg>
              <span>Chatea con Nosotros</span>
            </a>

            <div className="contact-details mt-4">
              <div>
                <strong>📞 Teléfono</strong>
                <div className="contact-detail-text">+56 9 5439 0949</div>
              </div>
              <div>
                <strong>✉️ Email</strong>
                <div className="contact-detail-text">info@dondetelevo.com</div>
              </div>
            </div>
          </div>

          <div className="contact-qr-wrapper flex justify-center">
            <div style={{ background: 'white', padding: '1rem', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
              <img
                src={qrContact}
                alt="Escanea para contactarnos en WhatsApp"
                style={{ maxWidth: '100%', width: '300px', borderRadius: '0.5rem' }}
              />
              <p style={{ textAlign: 'center', marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>Escanea para chatear</p>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
