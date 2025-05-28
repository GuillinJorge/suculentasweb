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
    fetch('/data/data.json')
      .then(res => res.json())
      .then(data => {
        setTimeout(() => {
          setProductos(data);
          setCargando(false);
        }, 2000);
      })
      .catch(error => {
        console.log('Error', error);
        setError(true);
        setCargando(false);
      });
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
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
            ? { ...item, quantity: Math.max(1, item.quantity + cambio) }
            : item
        )
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
