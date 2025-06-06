import React from "react";
import "./styleEstaticos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTiktok,} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faLocationDot,} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-col">
        <h4 className="footer-titulo">Contacto</h4>
        <p><FontAwesomeIcon icon={faLocationDot} /> Av. Siempre Viva 742, Springfield </p>
        <p><FontAwesomeIcon icon={faPhone} /> +54 9 11 1234-5678</p>
        <p><FontAwesomeIcon icon={faEnvelope} /> contacto@vivero.com</p>
      </div>

      <div className="footer-col">
        <h4 className="footer-titulo">Redes</h4>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /> Instagram{" "}</a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /> Facebook{" "}</a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTiktok} /> TikTok</a>
      </div>

      <div className="footer-col">
        <h4 className="footer-titulo">Enlaces</h4>
        <a href="/">Inicio</a>
        <a href="/contacto">Contacto</a>
        <a href="/productos">Tienda</a>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Suculentas.AR 🌵 - Todos los derechos
          reservados
        </p>
        <p>PERRI HD 🍁 DISEÑO</p>
      </div>
    </footer>
  );
};

export default Footer;
