import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Reports from "./pages/Reports";
import MiViaje from "./pages/MiViaje";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/reportes" element={<Reports />} />
        <Route path="/mi-viaje" element={<MiViaje />} />
        <Route path="/mi-viaje/:viajeId" element={<MiViaje />} />
        {/* Redirect all other routes to home for "One Page" feel */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
