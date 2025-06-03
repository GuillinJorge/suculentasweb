import React, { useEffect } from 'react';
import './ToastSimple.css';

const ToastSimple = ({ mensaje, mostrar, onCerrar, duracion = 3000 }) => {
  useEffect(() => {
    if (mostrar) {
      const timer = setTimeout(() => {
        onCerrar();
      }, duracion);

      return () => clearTimeout(timer);
    }
  }, [mostrar, onCerrar, duracion]);

  return (
    <div className={`toast ${mostrar ? 'show' : ''}`}>
      {mensaje}
    </div>
  );
};

export default ToastSimple;
