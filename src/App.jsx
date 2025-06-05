import React, { useContext} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { CartContext } from './context/CartContext'
import Home from './pages/Home'
import AcercaDe from './pages/AcercaDe'
import GaleriaDeProductos from './pages/GaleriaDeProductos'
import Contactos from './pages/Contactos'
import NotFound from './pages/NotFound'
import DetallesProductos from './components/DetallesProductos'
import Login from './pages/Login'
import RutasProtegida from './auth/RutasProtegidas'
import Admin from './pages/Admin'
import Header from './components/estaticos/Header'
import Cart from './components/Cart'
import ProductList from './components/ProductLists'

function App() {
  const {cart, productos, cargando,error,handleAddToCart,handDeleteFromCart,isAuthenticated,} = useContext(CartContext)

  return (
    <Router>
      <Routes>
        <Route path="/"element={<Home/>}/>

        <Route path="/acercade" element={<AcercaDe />}
        />

        <Route path="/productos" element={<GaleriaDeProductos/>}/>

        <Route path="/productos/:id" element={<DetallesProductos/>} />

        <Route path="/contacto" element={<Contactos/>} />

        <Route path="/admin" element={<RutasProtegida isAuthenticated={isAuthenticated}><Admin /></RutasProtegida>}/>

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Cart />
    </Router>
  )
}

export default App
