import React, { useState } from "react";
import "./styleEstaticos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faInstagram, 
  faFacebook, 
  faTiktok,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
import { 
  faEnvelope, 
  faPhone, 
  faLocationDot,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email.includes('@')) {
      Swal.fire({
        icon: 'error',
        title: 'Email inválido',
        text: 'Por favor ingresa un email válido',
        confirmButtonColor: '#3ddc97'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mnnvweve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: 'Nueva suscripción al newsletter',
          email: email,
          _replyto: email,
          _format: 'plain'
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Gracias por suscribirte! 🌵',
          text: 'Te enviaremos novedades sobre nuestras suculentas',
          confirmButtonColor: '#3ddc97',
          footer: 'Puedes darte de baja en cualquier momento'
        });
        setEmail('');
      } else {
        throw new Error('Error en la suscripción');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al suscribirse',
        text: 'Por favor intenta nuevamente más tarde',
        confirmButtonColor: '#3ddc97'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="footer" aria-label="Pie de página">
      <div className="footer-grid">
        {/* Sección Contacto */}
        <div className="footer-col">
          <h2 className="footer-titulo">Contacto</h2>
          <ul className="footer-list">
            <li>
              <FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />
              <span>Calle Jardin 123, Villa Verde, CDBA</span>
            </li>
            <li>
              <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
              <a href="tel:+5491112345678">+54 9 11 1234-5678</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faWhatsapp} aria-hidden="true" />
              <a 
                href="https://wa.me/5491112345678" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Envíanos un WhatsApp
              </a>
            </li>
            <li>
              <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
              <a href="mailto:contacto@vivero.com">contacto@vivero.com</a>
            </li>
            <li>
              <FontAwesomeIcon icon={faClock} aria-hidden="true" />
              <span>Lunes a Viernes: 9:00 - 18:00</span>
            </li>
          </ul>
        </div>

        {/* Sección Redes */}
        <div className="footer-col">
          <h2 className="footer-titulo">Redes Sociales</h2>
          <ul className="footer-list social-links">
            <li>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
                <span>Instagram</span>
              </a>
            </li>
            <li>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FontAwesomeIcon icon={faTiktok} />
                <span>TikTok</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Sección Enlaces */}
        <div className="footer-col">
          <h2 className="footer-titulo">Enlaces Rápidos</h2>
          <ul className="footer-list">
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/productos">Productos</Link>
            </li>
            <li>
              <Link to="/acercade">Nosotros</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Sección Newsletter */}
        <div className="footer-col">
          <h2 className="footer-titulo">Newsletter</h2>
          <p>Suscríbete para recibir ofertas y novedades</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico" 
              aria-label="Correo electrónico para newsletter"
              required
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className={isLoading ? 'loading' : ''}
            >
              {isLoading ? (
                <>
                  <span className="spinner" aria-hidden="true"></span>
                  Enviando...
                </>
              ) : (
                'Suscribirse'
              )}
            </button>
          </form>
          <p className="newsletter-disclaimer">
            Solo contenido sobre suculentas. Sin spam.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          © {currentYear} Suculentas.AR 🌵 - Todos los derechos reservados
        </p>
        <p>
          Diseñado con ❤️ por <span>PERRI HD</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;