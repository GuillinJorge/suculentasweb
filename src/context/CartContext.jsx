import { createContext, useState, useEffect } from "react";

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [cart, setCart] = useState([])
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(false)
    const [isAuthenticated, setIsAuth] = useState(false)

    useEffect(() => {
        fetch('/data/data.json')
            .then(respuesta => respuesta.json())
            .then(datos => (
                setTimeout(() => {
                    setProductos(datos)
                    setCargando(false)
                }, 2000)
            ))
            .catch(error => {
                console.log('Error', error)
                setCargando(false)
                setError(true)
            })
    }, [])

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

        setIsCartOpen(true);     // Abrir carrito
        setToastVisible(true);   // Mostrar toast
    };

    const handDeleteFromCart = (product) => {
        setCart((prevCart) =>
            prevCart
                .map((item) => {
                    if (item.id === product.id) {
                        if (item.quantity > 1) {
                            return { ...item, quantity: item.quantity - 1 };
                        } else {
                            return null; // Eliminar si la cantidad queda en 0
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
        prevCart.map((item) =>
            item.id === producto.id
                ? { ...item, quantity: Math.max(1, item.quantity + cambio) }
                : item
        )
    );
};



    return (
        <CartContext.Provider value={{cart, productos, cargando, error, handleAddToCart, handDeleteFromCart, actualizarCantidad, isAuthenticated}}>
            {children}
        </CartContext.Provider>
    )
} 