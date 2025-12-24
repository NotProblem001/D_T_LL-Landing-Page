import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <footer className="footer section-padding">
        <div className="container text-center">
          <h3 className="footer-title">Donde Te Llevo</h3>
          <p className="footer-desc">Tu aliado en movilidad segura y eficiente.</p>
          <div className="flex justify-center social-links">
            <a href="#" className="footer-link">Facebook</a>
            <a href="#" className="footer-link">Instagram</a>
            <a href="#" className="footer-link">LinkedIn</a>
          </div>
          <div className="footer-copyright">
            &copy; 2024 Donde Te Llevo. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
}
