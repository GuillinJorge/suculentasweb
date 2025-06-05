import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './styleEstaticos.css';

const Header = () => {
  const {cart, productos,cargando,error,handleAddToCart,handDeleteFromCart,isAuthenticated, setIsCartOpen } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav>
        <ul className={menuOpen ? 'open' : ''}>
          <li><img className="logonav" src="./logo_ppal.jpg" alt="Logo" /></li>
          <li><Link to='/' className='link' onClick={() => setMenuOpen(false)}>Inicio</Link></li>
          <li><Link to='/acercade' className='link' onClick={() => setMenuOpen(false)}>Acerca de nosotros</Link></li>
          <li><Link to='/productos' className='link' onClick={() => setMenuOpen(false)}>Galería de productos</Link></li>
          <li><Link to='/contacto' className='link' onClick={() => setMenuOpen(false)}>Contacto</Link></li>
          <li className='cartnav'>
            <button className='btnCart' onClick={() => setIsCartOpen(true)}>
              <i className="fa-solid fa-cart-shopping"></i>
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </button>
          </li>
        </ul>

        {/* Botón hamburguesa */}
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="fa fa-bars"></i>
        </button>
      </nav>
    </header>
  );
};

export default Header;
