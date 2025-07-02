import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; // ✅ Usamos el AuthContext

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seleccionado, setSeleccionado] = useState(null);
  const [openEditor, setOpenEditor] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const { logout } = useAuth(); // ✅ Función de cierre de sesión centralizada
  const navigate = useNavigate();
  const apiUrl = 'https://683f863e5b39a8039a54d90b.mockapi.io/products/productos';

  // Cargar productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
        Swal.fire({
          title: 'Error',
          text: 'No se pudieron cargar los productos',
          icon: 'error',
          confirmButtonColor: '#ff5252'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Agregar producto
  const agregarProducto = async (producto) => {
    try {
      const respuesta = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });

      if (!respuesta.ok) throw new Error('Error al agregar producto');
      const data = await respuesta.json();

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

      setProducts(prev => [...prev, data]);
      setOpen(false);

    } catch (error) {
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

  // Editar producto
  const actualizarProducto = async (productoActualizado) => {
    try {
      const respuesta = await fetch(`${apiUrl}/${productoActualizado.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoActualizado)
      });

      if (!respuesta.ok) throw new Error('Error al actualizar el producto');

      const data = await respuesta.json();

      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productoActualizado.id ? data : product
        )
      );

      Swal.fire({
        title: '¡Actualizado!',
        text: `"${data.nombre}" fue actualizado correctamente`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#224455',
        color: '#ffffff'
      });

      setOpenEditor(false);
      setSeleccionado(null);

    } catch (error) {
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

  // Eliminar producto
  const eliminarProducto = async (id) => {
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

        setProducts(prev => prev.filter(product => product.id !== id));

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

  // Cerrar sesión
  const handleLogout = () => {
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
        logout(); // ✅ Autenticación delegada al AuthContext
      }
    });
  };

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
