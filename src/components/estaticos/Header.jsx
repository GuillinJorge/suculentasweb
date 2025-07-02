import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './styleEstaticos.css';

const Header = () => {
  const { cart, setIsCartOpen } = useContext(CartContext);
  const { isAuth, userRole, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <nav className="nav-container">
        <Link to="/" className="logo-link" onClick={closeMenu}>
          <img className="logonav" src="./logo_ppal.png" alt="Logo Suculentas Lumina" />
        </Link>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" className="link" onClick={closeMenu}>Inicio</Link></li>
          <li><Link to="/acercade" className="link" onClick={closeMenu}>Acerca de</Link></li>
          <li><Link to="/productos" className="link" onClick={closeMenu}>Productos</Link></li>
          <li><Link to="/contacto" className="link" onClick={closeMenu}>Contacto</Link></li>
          <li><Link to="/faq" className="link" onClick={closeMenu}>FAQ</Link></li>

          {isAuth ? (
            <li>
              <button className="link login-btn" onClick={() => { logout(); closeMenu(); }}>
                <i className="fa-solid fa-right-from-bracket"></i> Cerrar sesión
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="link login-btn" onClick={closeMenu}>
                <i className="fa-solid fa-right-to-bracket"></i> Ingresar
              </Link>
            </li>
          )}

          <li className="cartnav">
            <button className="btnCart" onClick={() => {
              setIsCartOpen(true);
              closeMenu();
            }}>
              <i className="fa-solid fa-cart-shopping"></i>
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
          </li>
        </ul>

        <button 
          className={`hamburger ${menuOpen ? 'open' : ''}`} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
