import Section from "../components/Section";
import ScrollBus from "../components/ScrollBus";
import BookingForm from "../components/BookingForm";

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
              <a href="#contacto" className="btn-primary shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-lg px-8 py-3 rounded-full">
                Solicita tu traslado
              </a>
              <a href="#servicios" className="btn-secondary text-lg px-8 py-3 rounded-full">
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

      {/* Contacto Section (Booking Form) */}
      <Section id="contacto" title="Contáctanos y Reserva" subtitle="Empieza tu próximo viaje con nosotros">
        <div className="contact-container grid grid-2">
          <div className="contact-info">
            <h3>Información de Contacto</h3>
            <p className="contact-desc">Estamos listos para atenderte.</p>
            <div className="contact-details">
              <div>
                <strong>📞 Teléfono</strong>
                <div className="contact-detail-text">+1 (555) 123-4567</div>
              </div>
              <div>
                <strong>✉️ Email</strong>
                <div className="contact-detail-text">info@dondetelevo.com</div>
              </div>
              <div>
                <strong>📍 Oficina</strong>
                <div className="contact-detail-text">Calle Principal 123, Ciudad</div>
              </div>
            </div>
          </div>
          <div className="contact-form-wrapper">
            <BookingForm />
          </div>
        </div>
      </Section>
    </main>
  );
}
