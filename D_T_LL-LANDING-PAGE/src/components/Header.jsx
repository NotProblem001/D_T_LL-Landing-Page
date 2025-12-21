export default function Header() {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      zIndex: 100,
      padding: '1rem 2rem',
      boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2c3e50' }}>
        🚍 Donde Te Llevo
      </div>
      <nav>
        <ul style={{
          listStyle: 'none',
          display: 'flex',
          gap: '2rem',
          margin: 0,
          padding: 0
        }}>
          <li><a href="#inicio" style={{ textDecoration: 'none', color: '#2c3e50', fontWeight: '500' }}>Inicio</a></li>
          <li><a href="#servicios" style={{ textDecoration: 'none', color: '#2c3e50', fontWeight: '500' }}>Servicios</a></li>
          <li><a href="#valoraciones" style={{ textDecoration: 'none', color: '#2c3e50', fontWeight: '500' }}>Valoraciones</a></li>
          <li><a href="#galeria" style={{ textDecoration: 'none', color: '#2c3e50', fontWeight: '500' }}>Galería</a></li>
          <li><a href="#contacto" style={{ textDecoration: 'none', color: '#2c3e50', fontWeight: '500' }}>Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}
