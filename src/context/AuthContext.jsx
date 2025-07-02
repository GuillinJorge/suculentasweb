import { createContext, useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState(null); // 👈 nuevo
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Al montar, recuperamos autenticación y rol
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth') === 'true';
    const storedRole = localStorage.getItem('userRole');

    if (storedAuth) {
      setIsAuth(true);
      setUserRole(storedRole);
    }
  }, []);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuth && userRole) {
      navigate(userRole === 'admin' ? '/admin' : '/productos');
    }
  }, [isAuth, userRole, navigate]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const res = await fetch('/data/users.json');
      if (!res.ok) throw new Error('Error en la respuesta');

      const users = await res.json();
      const user = users.find(u =>
        u.email === email.trim() && u.password === password.trim()
      );

      if (!user) {
        throw new Error('Credenciales incorrectas');
      }

      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('userRole', user.role); // 👈 guardamos el rol

      setIsAuth(true);
      setUserRole(user.role);
      // 👇 NO navegamos acá, lo maneja el useEffect siguiente

    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        general: error.message || 'Error al iniciar sesión'
      });
    } finally {
      setLoading(false);
    }
  }, [email, password]);

 const logout = useCallback(() => {
  localStorage.removeItem('isAuth');
  setIsAuth(false);
  Swal.fire({
    icon: 'success',
    title: 'Sesión cerrada',
    text: 'Has cerrado sesión correctamente',
    timer: 1500,
    showConfirmButton: false,
  });
  navigate('/');
}, [navigate]);

  return (
    <AuthContext.Provider value={{
      email,
      setEmail,
      password,
      setPassword,
      errors,
      isAuth,
      setIsAuth,
      userRole,
      loading,
      handleSubmit,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
