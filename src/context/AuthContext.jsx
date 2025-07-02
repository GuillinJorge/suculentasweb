// Importación de hooks de React y utilidades de navegación
import { createContext, useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from 'react-router-dom';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Componente proveedor del contexto
export const AuthProvider = ({ children }) => {
  // Estados para controlar el formulario de login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Errores del formulario (general o campos específicos)
  const [errors, setErrors] = useState({});
  
  // Estado de autenticación
  const [isAuth, setIsAuth] = useState(false);
  
  // Rol del usuario (puede ser 'admin' o 'cliente')
  const [userRole, setUserRole] = useState(null);
  
  // Estado de carga para mostrar un spinner o deshabilitar el botón
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Al montar el componente, intentamos recuperar estado desde localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth') === 'true';
    const storedRole = localStorage.getItem('userRole');

    if (storedAuth) {
      setIsAuth(true); // Restauramos estado de login
      setUserRole(storedRole); // Restauramos el rol
    }
  }, []);

  // Si el usuario está autenticado, redireccionar según el rol
  useEffect(() => {
    if (isAuth && userRole) {
      navigate(userRole === 'admin' ? '/admin' : '/productos');
    }
  }, [isAuth, userRole, navigate]);

  // Función para enviar el formulario de login
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault(); // Evita que se recargue la página
    setLoading(true); // Activa estado de carga
    setErrors({}); // Limpiar errores anteriores

    try {
      // Simular un pequeño retraso como si hubiera una llamada a backend
      await new Promise(resolve => setTimeout(resolve, 500));

      // Obtener usuarios desde archivo local JSON
      const res = await fetch('/data/users.json');
      if (!res.ok) throw new Error('Error en la respuesta');

      const users = await res.json();

      // Buscar un usuario que coincida con los datos ingresados
      const user = users.find(u =>
        u.email === email.trim() && u.password === password.trim()
      );

      if (!user) {
        throw new Error('Credenciales incorrectas');
      }

      // Guardar autenticación y rol en localStorage
      localStorage.setItem('isAuth', 'true');
      localStorage.setItem('userRole', user.role);

      // Actualizar estados internos
      setIsAuth(true);
      setUserRole(user.role);

      // ⚠️ No navegamos directamente, lo hace el useEffect

    } catch (error) {
      console.error('Login error:', error);

      // Mostrar mensaje de error general
      setErrors({
        general: error.message || 'Error al iniciar sesión'
      });
    } finally {
      setLoading(false); // Finalizar estado de carga
    }
  }, [email, password]);

  // Función para cerrar sesión
  const logout = useCallback(() => {
    // Borrar autenticación del almacenamiento
    localStorage.removeItem('isAuth');
    localStorage.removeItem('userRole');

    setIsAuth(false); // Actualizar estado interno

    // Mostrar alerta con SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente',
      timer: 1500,
      showConfirmButton: false,
    });

    // Redirigir al inicio
    navigate('/');
  }, [navigate]);

  // Proveer valores y funciones a los componentes hijos
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

// Hook personalizado para acceder fácilmente al contexto
export const useAuth = () => useContext(AuthContext);
