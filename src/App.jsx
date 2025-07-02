import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Faq from './pages/Faq';
import AcercaDe from './pages/AcercaDe';
import GaleriaDeProductos from './pages/GaleriaDeProductos';
import Contactos from './pages/Contactos';
import NotFound from './pages/NotFound';
import DetallesProductos from './components/DetallesProductos';
import Login from './pages/Login';
import RutasProtegida from './auth/RutasProtegidas';
import Admin from './pages/Admin';
import Cart from './components/Cart';

// ✅ IMPORTANTE: usar AuthContext para validar si el usuario está autenticado
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuth } = useAuth(); // ✅ Esto reemplaza el uso incorrecto del CartContext

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/acercade" element={<AcercaDe />} />
        <Route path="/productos" element={<GaleriaDeProductos />} />
        <Route path="/productos/:id" element={<DetallesProductos />} />
        <Route path="/contacto" element={<Contactos />} />
        <Route path="/faq" element={<Faq />} />

        {/* ✅ Proteger la ruta del Admin con isAuth */}
        <Route
          path="/admin"
          element={
            <RutasProtegida isAuthenticated={isAuth}>
              <Admin />
            </RutasProtegida>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Cart />
    </>
  );
}

export default App;
