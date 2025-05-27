import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styleEstaticos.css';

const Header = ({ cartItems, abrirCarrito }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      <nav>
        <ul className={menuOpen ? 'open' : ''}>
          <li>
            <img className="logonav" src="./logo_ppal.jpg" alt="Logo" />
          </li>
          <li>
            <Link to='/' className='link' onClick={() => setMenuOpen(false)}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to='/acercade' className='link' onClick={() => setMenuOpen(false)}>
              Acerca de nosotros
            </Link>
          </li>
          <li>
            <Link to='/productos' className='link' onClick={() => setMenuOpen(false)}>
              Galería de productos
            </Link>
          </li>
          <li>
            <Link to='/contacto' className='link' onClick={() => setMenuOpen(false)}>
              Contacto
            </Link>
          </li>
          <li className='cartnav'>
            <button className='btnCart' onClick={abrirCarrito}>
              <i className="fa-solid fa-cart-shopping"></i>
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
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

