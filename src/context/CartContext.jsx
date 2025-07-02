import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
 
  // Estado del carrito
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("carrito");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Estado para productos y carga
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  // Estado para la UI del carrito
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  // Cargar productos
  useEffect(() => {
    fetch('https://683f863e5b39a8039a54d90b.mockapi.io/products/productos')
      .then(res => {
        if (!res.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return res.json();
      })
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al obtener productos:', error);
        setError(true);
        setCargando(false);
      });
  }, []);

  // Filtrar productos según búsqueda
  const productosFiltrados = productos.filter((producto) => 
    producto?.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // Persistir carrito en localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);

  // Añadir producto al carrito
  const handleAddToCart = (product, cantidad = 1) => {
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + cantidad }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: cantidad }]);
    }

    setIsCartOpen(true);
    setToastVisible(true);
  };

  // Eliminar producto del carrito
  const handDeleteFromCart = (product) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === product.id) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return null;
            }
          } else {
            return item;
          }
        })
        .filter((item) => item !== null)
    );
  };

  // Actualizar cantidad de un producto
  const actualizarCantidad = (producto, cambio) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + cambio }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

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