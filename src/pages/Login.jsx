import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setIsAuth } = useContext(CartContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!email) validationErrors.email = 'Email es requerido';
    if (!password) validationErrors.password = 'La contraseña es requerida';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch('/data/users.json');
      if (!res.ok) throw new Error('No se pudo cargar el archivo');
      const users = await res.json();

      const foundUser = users.find(
        (user) => user.email === email.trim() && user.password === password.trim()
      );

      if (!foundUser) {
        setErrors({ email: 'Credenciales inválidas' });
      } else {
        if (foundUser.role === 'admin') {
          setIsAuth(true);
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Error al cargar el archivo:', err);
      setErrors({ email: 'Algo salió mal, por favor intentalo más tarde' });
    }
  };

  return (
    <form onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '400px',
        margin: 'auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="formBasicEmail" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Email address
        </label>
        <input
          id="formBasicEmail"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '0.5rem',
            border: `1px solid ${errors.email ? 'red' : '#ced4da'}`,
            borderRadius: '0.25rem'
          }}
        />
        {errors.email && (
          <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {errors.email}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="formBasicPassword" style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Password
        </label>
        <input
          id="formBasicPassword"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: '0.5rem',
            border: `1px solid ${errors.password ? 'red' : '#ced4da'}`,
            borderRadius: '0.25rem',
          }}
        />
        {errors.password && (
          <div style={{ color: 'red', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            {errors.password}
          </div>
        )}
      </div>

      <button
        type='submit'
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '0.75rem',
          border: 'none',
          borderRadius: '0.25rem',
          cursor: 'pointer',
          fontSize: '1rem',
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default Login;
