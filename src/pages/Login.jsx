// Importaciones necesarias
import React from 'react';
import { useAuth } from '../context/AuthContext'; // Hook personalizado para acceder al contexto de autenticación
import './Login.css'; // Estilos específicos para el formulario
import { Link } from 'react-router-dom'; // Para navegación entre rutas

const Login = () => {
  // Extraemos estados y funciones desde el contexto de autenticación
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    handleSubmit, 
    errors,
    loading  // Estado que indica si se está procesando el login
  } = useAuth();

  return (
    <div className="login-container">
      {/* Formulario de login */}
      <form onSubmit={handleSubmit} className="login-form" noValidate>
        
        {/* Logo con link a inicio */}
        <Link to="/" className="logo-link">
          <img 
            className="login-logo" 
            src="/logo_ppal.jpg"
            alt="Suculentas Web - Volver al inicio" 
          />
        </Link>
        
        {/* Título del formulario */}
        <h1 className="login-title">Inicia sesión en tu cuenta</h1>
        
        {/* Error general (como "Credenciales incorrectas") */}
        {errors.general && (
          <div className="error-message" role="alert">
            <span role="img" aria-hidden="true">❌</span> {errors.general}
          </div>
        )}

        {/* Campo de correo electrónico */}
        <div className="form-group">
          <label htmlFor="formBasicEmail" className="form-label">
            Correo electrónico
          </label>
          <input
            id="formBasicEmail"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Actualiza estado global
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            aria-describedby={errors.email ? "emailError" : undefined}
            disabled={loading}  // Deshabilita campo si está cargando
            required
          />
          {/* Mensaje de error específico del email */}
          {errors.email && (
            <div id="emailError" className="error-text">
              <span role="img" aria-hidden="true">⚠️</span> {errors.email}
            </div>
          )}
        </div>

        {/* Campo de contraseña */}
        <div className="form-group">
          <label htmlFor="formBasicPassword" className="form-label">
            Contraseña
          </label>
          <input
            id="formBasicPassword"
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualiza estado global
            className={`form-input ${errors.password ? 'input-error' : ''}`}
            aria-describedby={errors.password ? "passwordError" : undefined}
            disabled={loading}  // Deshabilita campo si está cargando
            required
          />
          {/* Mensaje de error específico de la contraseña */}
          {errors.password && (
            <div id="passwordError" className="error-text">
              <span role="img" aria-hidden="true">⚠️</span> {errors.password}
            </div>
          )}
        </div>

        {/* Botón de envío del formulario */}
        <button 
          type="submit" 
          className={`login-button ${loading ? 'button-loading' : ''}`}
          aria-label={loading ? "Procesando inicio de sesión" : "Iniciar sesión"}
          disabled={loading} // Se desactiva mientras se procesa
        >
          {/* Contenido del botón según el estado de carga */}
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              Procesando...
            </>
          ) : (
            'Iniciar sesión'
          )}
        </button>

        {/* Footer con enlaces adicionales */}
        <div className="login-footer">
          <p>¿No tienes cuenta? <Link to="/registro" className="register-link">Regístrate</Link></p>
          <Link to="/recuperar-contrasena" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
