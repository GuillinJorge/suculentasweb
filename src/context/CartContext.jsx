// Importación de hooks necesarios
import { createContext, useState, useEffect } from "react";

// Crear el contexto del carrito
export const CartContext = createContext();

// Proveedor del contexto del carrito
export const CartProvider = ({ children }) => {

  // Estado inicial del carrito (se intenta recuperar desde localStorage)
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("carrito");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Estado para la lista de productos obtenidos desde la API
  const [productos, setProductos] = useState([]);

  // Estados para el manejo de carga y errores al obtener productos
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  // Estados para UI: apertura del carrito, visibilidad del toast y filtro de búsqueda
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  // Cargar productos al montar el componente
  useEffect(() => {
    fetch('https://683f863e5b39a8039a54d90b.mockapi.io/products/productos')
      .then(res => {
        if (!res.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return res.json();
      })
      .then(data => {
        setProductos(data);   // Guardar productos
        setCargando(false);   // Finalizar carga
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
        setError(true);       // Marcar error
        setCargando(false);   // Finalizar carga igual
      });
  }, []);

  // Filtrado de productos según texto ingresado en el campo de búsqueda
  const productosFiltrados = productos.filter((producto) => 
    producto?.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Guardar el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);

  // Agregar un producto al carrito
  const handleAddToCart = (product, cantidad = 1) => {
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      // Si ya existe, incrementar cantidad
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + cantidad }
            : item
        )
      );
    } else {
      // Si no está, lo agrega con cantidad inicial
      setCart([...cart, { ...product, quantity: cantidad }]);
    }

    // Mostrar el carrito y el aviso (toast)
    setIsCartOpen(true);
    setToastVisible(true);
  };

  // Eliminar o reducir un producto del carrito
  const handDeleteFromCart = (product) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === product.id) {
            // Si tiene más de uno, resta uno
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return null; // Si solo queda uno, lo quita
            }
          } else {
            return item;
          }
        })
        .filter((item) => item !== null) // Filtra los productos eliminados
    );
  };

  // Cambiar cantidad de un producto (puede sumar o restar)
  const actualizarCantidad = (producto, cambio) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + cambio }
            : item
        )
        .filter(item => item.quantity > 0) // Elimina si la cantidad llega a 0
    );
  };

  // Proveer todos los valores y funciones a los hijos
  return (
    <CartContext.Provider
      value={{
        cart,
        productos,
        cargando,
        error,
        handleAddToCart,
        handDeleteFromCart,
        actualizarCantidad,
        isCartOpen,
        setIsCartOpen,
        toastVisible,
        setToastVisible,
        productosFiltrados,
        busqueda,
        setBusqueda,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
