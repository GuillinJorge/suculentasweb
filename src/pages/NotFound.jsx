import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './NotFound.css';

const NotFound = () => {
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    // Detectar si es de noche (6pm a 6am)
    const hour = new Date().getHours();
    setIsNightMode(hour > 18 || hour < 6);
  }, []);

  return (
    <div className={`not-found-container ${isNightMode ? 'night-mode' : ''}`}>
      {/* Efecto de arena cayendo */}
      <div className="sand-fall">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="sand-particle" 
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }} 
          />
        ))}
      </div>

      <div className="not-found-content">
        {/* Ilustración SVG animada */}
        <div className="not-found-illustration">
          <svg className="cactus-svg" width="150" height="150" viewBox="0 0 100 100">
            {/* Sol/Luna */}
            <circle 
              cx="80" 
              cy="20" 
              r="15" 
              fill={isNightMode ? "#F0E68C" : "#FFD700"} 
              className="sun-moon" 
            />
            {/* Maceta */}
            <rect x="40" y="70" width="20" height="15" fill="#A0522D" />
            {/* Cactus */}
            <rect x="45" y="40" width="10" height="40" fill="#3ddc97" rx="5" />
            <rect x="35" y="50" width="10" height="15" fill="#2bc48a" rx="5" />
            <rect x="55" y="45" width="10" height="12" fill="#2bc48a" rx="5" />
            {/* Ojos */}
            <circle cx="48" cy="50" r="1.5" fill="#333" />
            <circle cx="52" cy="50" r="1.5" fill="#333" />
            <path d="M48 55 Q50 53 52 55" stroke="#333" fill="transparent" />
          </svg>
          <div className="error-code">404</div>
        </div>
        
        <h1 className="not-found-title">
          {isNightMode ? '¡Ups! Noche de cactus solitarios' : '¡Oops! Página no encontrada'}
        </h1>
        <p className="not-found-message">
          {isNightMode 
            ? 'Mientras las suculentas duermen, esta página escapó del vivero.' 
            : 'La página que buscas parece haberse evaporado como el agua en el desierto.'
          }
        </p>
        
        <div className="not-found-buttons">
          <Link to="/" className="not-found-button primary">
            <FontAwesomeIcon icon={faHome} /> Volver al inicio
          </Link>
          <button onClick={() => window.history.back()} className="not-found-button secondary">
            <FontAwesomeIcon icon={faArrowLeft} /> Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;