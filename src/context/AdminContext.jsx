// Importación de hooks y librerías necesarias
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2"; // Para mostrar alertas elegantes
import { useNavigate } from "react-router-dom"; // Para redirecciones
import { useAuth } from "./AuthContext"; // Acceso al contexto de autenticación

// Crear el contexto de administración
export const AdminContext = createContext();

// Componente proveedor del contexto
export const AdminProvider = ({ children }) => {
  // Estado para almacenar los productos
  const [products, setProducts] = useState([]);
  // Indicador de carga
  const [loading, setLoading] = useState(true);
  // Producto seleccionado para editar
  const [seleccionado, setSeleccionado] = useState(null);
  // Estado para abrir/cerrar el editor
  const [openEditor, setOpenEditor] = useState(false);
  // Estado de error general
  const [error, setError] = useState(false);
  // Estado para abrir/cerrar modal de creación
  const [open, setOpen] = useState(false);

  // Función de logout desde el contexto de autenticación
  const { logout } = useAuth();
  const navigate = useNavigate(); // Hook de navegación
  const apiUrl = 'https://683f863e5b39a8039a54d90b.mockapi.io/products/productos'; // URL base de la API

  // Cargar productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        setProducts(data); // Guardar productos obtenidos
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true); // Marcar que hubo un error
        // Mostrar alerta de error
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los productos',
          icon: 'error',
          confirmButtonColor: '#ff5252'
        });
      } finally {
        setLoading(false); // Finalizar estado de carga
      }
    };

    fetchProducts(); // Llamada inicial
  }, []);

  // Función para agregar un nuevo producto
  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });

      if (!respuesta.ok) throw new Error('Error al agregar producto');

      const data = await respuesta.json();

      // Alerta de éxito
      Swal.fire({
        title: '¡Producto agregado!',
        text: `"${data.nombre}" se agregó correctamente`,
        icon: 'success',
        confirmButtonColor: '#3a5a40',
        timer: 2000,
        showConfirmButton: false,
        background: '#224455',
        color: '#ffffff'
      });

      // Agregar nuevo producto al estado
      setProducts(prev => [...prev, data]);
      setOpen(false); // Cerrar modal de creación

    } catch (error) {
      // Alerta de error
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#ff5252',
        background: '#224455',
        color: '#ffffff'
      });
    }
  };

  // Función para actualizar un producto existente
  const actualizarProducto = async (productoActualizado) => {
    try {
      const respuesta = await fetch(`${apiUrl}/${productoActualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado)
      });

      if (!respuesta.ok) throw new Error('Error al actualizar el producto');

      const data = await respuesta.json();

      // Reemplazar producto actualizado en el estado
      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productoActualizado.id ? data : product
        )
      );

      // Alerta de éxito
      Swal.fire({
        title: '¡Actualizado!',
        text: `"${data.nombre}" fue actualizado correctamente`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#224455',
        color: '#ffffff'
      });

      // Cerrar editor y limpiar selección
      setOpenEditor(false);
      setSeleccionado(null);

    } catch (error) {
      // Alerta de error
      Swal.fire({
        title: 'Error',
        text: error.message || 'Error al actualizar el producto',
        icon: 'error',
        confirmButtonColor: '#ff5252',
        background: '#224455',
        color: '#ffffff'
      });
    }
  };

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    // Confirmación antes de eliminar
    const result = await Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3a5a40',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      background: '#224455',
      color: '#ffffff'
    });

    if (result.isConfirmed) {
      try {
        const respuesta = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (!respuesta.ok) throw new Error('Error al eliminar');

        // Filtrar el producto eliminado del estado
        setProducts(prev => prev.filter(product => product.id !== id));

        // Alerta de éxito
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El producto fue eliminado',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: '#224455',
          color: '#ffffff'
        });

      } catch (error) {
        // Alerta de error
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonColor: '#ff5252',
          background: '#224455',
          color: '#ffffff'
        });
      }
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    // Alerta de confirmación
    Swal.fire({
      title: '¿Cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3a5a40',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      background: '#224455',
      color: '#ffffff'
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); // Llamar al logout del AuthContext
      }
    });
  };

  // Proveer todos los valores y funciones a los componentes hijos
  return (
    <AdminContext.Provider value={{
      products,
      loading,
      error,
      setError,
      open,
      setOpen,
      setOpenEditor,
      openEditor,
      seleccionado,
      setSeleccionado,
      agregarProducto,
      actualizarProducto,
      eliminarProducto,
      handleLogout,
    }}>
      {children}
    </AdminContext.Provider>
  );
};
