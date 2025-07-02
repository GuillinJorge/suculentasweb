import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    handleSubmit, 
    errors,
    loading  // Añadimos el estado de carga
  } = useAuth();

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form" noValidate>
        <Link to="/" className="logo-link">
          <img 
            className="login-logo" 
            src="/logo_ppal.jpg"  // Corregida la ruta (eliminado 'public')
            alt="Suculentas Web - Volver al inicio" 
          />
        </Link>
        
        <h1 className="login-title">Inicia sesión en tu cuenta</h1>
        
        {/* Mensaje de error general */}
        {errors.general && (
          <div className="error-message" role="alert">
            <span role="img" aria-hidden="true">❌</span> {errors.general}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="formBasicEmail" className="form-label">
            Correo electrónico
          </label>
          <input
            id="formBasicEmail"
            type="email"
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-input ${errors.email ? 'input-error' : ''}`}
            aria-describedby={errors.email ? "emailError" : undefined}
            disabled={loading}  // Deshabilitado durante carga
            required
          />
          {errors.email && (
            <div id="emailError" className="error-text">
              <span role="img" aria-hidden="true">⚠️</span> {errors.email}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="formBasicPassword" className="form-label">
            Contraseña
          </label>
          <input
            id="formBasicPassword"
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`form-input ${errors.password ? 'input-error' : ''}`}
            aria-describedby={errors.password ? "passwordError" : undefined}
            disabled={loading}  // Deshabilitado durante carga
            required
          />
          {errors.password && (
            <div id="passwordError" className="error-text">
              <span role="img" aria-hidden="true">⚠️</span> {errors.password}
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className={`login-button ${loading ? 'button-loading' : ''}`}
          aria-label={loading ? "Procesando inicio de sesión" : "Iniciar sesión"}
          disabled={loading}  // Deshabilitado durante carga
        >
          {loading ? (
            <>
              <span className="spinner" aria-hidden="true"></span>
              Procesando...
            </>
          ) : (
            'Iniciar sesión'
          )}
        </button>

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