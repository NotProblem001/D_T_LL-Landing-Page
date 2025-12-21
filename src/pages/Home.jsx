import ScrollPath from "../components/ScrollPath";
import Section from "../components/Section";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <ScrollPath />
      <main style={{ paddingTop: '80px' }}>
        <Section title="Inicio" subtitle="Bienvenido a Donde Te Llevo" id="inicio">
          <p>Somos una empresa líder en transporte profesional dedicada a conectar personas y lugares de manera segura y eficiente. Especializados en el transporte de trabajadores para empresas y en servicios para eventos sociales, nos comprometemos a ofrecer soluciones de movilidad confiables y personalizadas.</p>
          <p>Con años de experiencia en el sector, entendemos las necesidades únicas de cada cliente, ya sea una empresa que requiere traslados diarios para su equipo o un evento que demanda puntualidad y comodidad.</p>
        </Section>
        <Section title="Nuestros Servicios" subtitle="Empresas y Eventos" id="servicios">
          <h3>Transporte Empresarial</h3>
          <p>Ofrecemos servicios de transporte seguro y eficiente para trabajadores de empresas. Nuestros vehículos están equipados con las últimas tecnologías de seguridad y comodidad, asegurando que tus empleados lleguen a tiempo y descansados.</p>
          <ul>
            <li>Traslados diarios y programados</li>
            <li>Vehículos modernos y mantenidos</li>
            <li>Conductores profesionales y capacitados</li>
            <li>Seguimiento en tiempo real</li>
          </ul>
          <h3>Servicios para Eventos</h3>
          <p>Para bodas, fiestas, conferencias y cualquier evento especial, proporcionamos transporte elegante y puntual. Haz que tu evento sea inolvidable con nuestro servicio premium.</p>
          <ul>
            <li>Flotas de lujo disponibles</li>
            <li>Coordinación completa del evento</li>
            <li>Opciones personalizadas</li>
            <li>Puntualidad garantizada</li>
          </ul>
        </Section>
        <Section title="Valoraciones" subtitle="Lo que dicen nuestros clientes" id="valoraciones">
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <blockquote style={{ borderLeft: "4px solid #007bff", paddingLeft: "1rem", fontStyle: "italic" }}>
              "Excelente servicio. Siempre puntuales y muy profesionales. Han transportado a todo nuestro equipo durante meses sin ningún problema."
              <cite> - María González, Gerente de Recursos Humanos, TechCorp</cite>
            </blockquote>
            <blockquote style={{ borderLeft: "4px solid #007bff", paddingLeft: "1rem", fontStyle: "italic" }}>
              "Para nuestra boda, el servicio fue impecable. Los vehículos eran lujosos y el conductor muy atento. Recomendado al 100%."
              <cite> - Carlos Rodríguez, Novio</cite>
            </blockquote>
            <blockquote style={{ borderLeft: "4px solid #007bff", paddingLeft: "1rem", fontStyle: "italic" }}>
              "Más de 300 empresas han confiado en nosotros para sus necesidades de transporte. Únete a nuestros clientes satisfechos."
              <cite> - Equipo Donde Te Llevo</cite>
            </blockquote>
          </div>
        </Section>
        <Section title="Galería" subtitle="Conócenos visualmente" id="galeria">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
            <img src="https://via.placeholder.com/300x200/007bff/ffffff?text=Bus+Empresarial" alt="Bus empresarial" style={{ width: "100%", borderRadius: "8px" }} />
            <img src="https://via.placeholder.com/300x200/28a745/ffffff?text=Evento+Lujo" alt="Vehículo de lujo para eventos" style={{ width: "100%", borderRadius: "8px" }} />
            <img src="https://via.placeholder.com/300x200/dc3545/ffffff?text=Equipo+Profesional" alt="Nuestro equipo" style={{ width: "100%", borderRadius: "8px" }} />
            <img src="https://via.placeholder.com/300x200/ffc107/000000?text=Cliente+Satisfecho" alt="Cliente feliz" style={{ width: "100%", borderRadius: "8px" }} />
          </div>
        </Section>
        <Section title="Contáctanos" subtitle="Solicita tu servicio hoy" id="contacto">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            <div style={{ flex: "1", minWidth: "250px" }}>
              <h3>Información de Contacto</h3>
              <p><strong>Teléfono:</strong> +1 (555) 123-4567</p>
              <p><strong>Email:</strong> info@dondetelevo.com</p>
              <p><strong>Dirección:</strong> Calle Principal 123, Ciudad, País</p>
              <p><strong>Horarios:</strong> Lunes a Viernes, 8:00 AM - 6:00 PM</p>
            </div>
            <form style={{ flex: "1", minWidth: "250px", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input type="text" placeholder="Tu nombre" required style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }} />
              <input type="email" placeholder="Correo electrónico" required style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }} />
              <input type="tel" placeholder="Teléfono" style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }} />
              <select style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}>
                <option value="">Tipo de servicio</option>
                <option value="empresarial">Transporte Empresarial</option>
                <option value="evento">Servicio para Eventos</option>
                <option value="otro">Otro</option>
              </select>
              <textarea placeholder="Cuéntanos más sobre tus necesidades" rows="4" style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}></textarea>
              <button type="submit" style={{ padding: "0.75rem", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Enviar Solicitud</button>
            </form>
          </div>
        </Section>
      </main>
      <footer style={{ backgroundColor: "#333", color: "white", textAlign: "center", padding: "2rem", marginTop: "4rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h3>Donde Te Llevo</h3>
          <p>Tu solución confiable en transporte profesional</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", margin: "1rem 0" }}>
            <a href="#" style={{ color: "white", textDecoration: "none" }}>Facebook</a>
            <a href="#" style={{ color: "white", textDecoration: "none" }}>Instagram</a>
            <a href="#" style={{ color: "white", textDecoration: "none" }}>LinkedIn</a>
          </div>
          <p>&copy; 2024 Donde Te Llevo. Todos los derechos reservados.</p>
        </div>
      </footer>
    </>
  );
}
