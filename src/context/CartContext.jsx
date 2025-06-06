import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("carrito");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuth] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

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


  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product, cantidad = 1) => {
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + cantidad}
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: cantidad }]);
    }

    setIsCartOpen(true);
    setToastVisible(true);
  };

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
        isAuthenticated,
        setIsAuth,
        handleAddToCart,
        handDeleteFromCart,
        actualizarCantidad,
        isCartOpen,
        setIsCartOpen,
        toastVisible,
        setToastVisible
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
