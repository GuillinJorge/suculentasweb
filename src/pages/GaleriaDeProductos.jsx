import React, { useState, useEffect } from "react";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";
import ProductList from "../components/ProductLists";
import Cart from "../components/Cart";
import ToastSimple from "../components/ToastSimple";
import loading from "../assets/loading.gif";

const GaleriaDeProductos = ({ productos, cargando }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [orden, setOrden] = useState(null);
  const [mostrarSidebar, setMostrarSidebar] = useState(false);

  // Carga carrito desde localStorage o vacío si no existe
  const [cartItems, setCartItems] = useState(() => {
    const guardado = localStorage.getItem("carrito");
    return guardado ? JSON.parse(guardado) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  // Guarda carrito en localStorage cada vez que cambie cartItems
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cartItems));
  }, [cartItems]);

  const agregarAlCarrito = (producto) => {
    const existente = cartItems.find(item => item.id === producto.id);

    if (existente) {
      const nuevosItems = cartItems.map(item =>
        item.id === producto.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(nuevosItems);
    } else {
      setCartItems([...cartItems, { ...producto, quantity: 1 }]);
    }

    setIsCartOpen(true);
    setToastVisible(true);
  };

  const borrarProductoDelCarrito = (producto) => {
    const nuevosItems = cartItems.filter(item => item.id !== producto.id);
    setCartItems(nuevosItems);
  };

  const actualizarCantidad = (producto, cambio) => {
    const nuevosItems = cartItems.map(item => {
      if (item.id === producto.id) {
        const nuevaCantidad = item.quantity + cambio;
        return nuevaCantidad > 0 ? { ...item, quantity: nuevaCantidad } : null;
      }
      return item;
    }).filter(Boolean);
    setCartItems(nuevosItems);
  };

  const productosFiltrados = productos.filter(producto =>
    categoriaSeleccionada === "todos" ? true : producto.categoria === categoriaSeleccionada
  );

  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    if (!orden) return 0;
    if (orden === "precio-asc") return a.precio - b.precio;
    if (orden === "precio-desc") return b.precio - a.precio;
    if (orden === "stock-asc") return a.stock - b.stock;
    if (orden === "stock-desc") return b.stock - a.stock;
  });

  const [mostrarMenuFiltros, setMostrarMenuFiltros] = useState(false);

  return (
    <>
      <Header borrarProductos={borrarProductoDelCarrito} cartItems={cartItems} />

     

      <main className="galeria-main">
        <h1>Tienda</h1>

       <div className="menu-filtros-container">
        <button
          className="toggle-sidebar"
          onClick={() => setMostrarMenuFiltros(!mostrarMenuFiltros)}
        >
          ☰ Ordenar y filtar
        </button>

        {mostrarMenuFiltros && (
          <div className="menu-filtros-dropdown">
            <h4>Filtrar por categoría</h4>
            {["todos", "Cactáceas", "Arból de jade", "Lengua de suegra", "Sedum","Echeveria"].map((cat) => (
              <button
                key={cat}
                className={categoriaSeleccionada === cat ? "active" : ""}
                onClick={() => {
                  setCategoriaSeleccionada(cat);
                  setMostrarMenuFiltros(false);
                }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}

            <hr />

            <h4>Ordenar por</h4>
            <button
              className={orden === "precio-asc" ? "active" : ""}
              onClick={() => {
                setOrden("precio-asc");
                setMostrarMenuFiltros(false);
              }}
            >
              Precio más alto ↑
            </button>
            <button
              className={orden === "precio-desc" ? "active" : ""}
              onClick={() => {
                setOrden("precio-desc");
                setMostrarMenuFiltros(false);
              }}
            >
              Precio más bajo ↓
            </button>
            <button
              className={orden === "stock-asc" ? "active" : ""}
              onClick={() => {
                setOrden("stock-asc");
                setMostrarMenuFiltros(false);
              }}
            >
              Mayor Stock ↑
            </button>
            <button
              className={orden === "stock-desc" ? "active" : ""}
              onClick={() => {
                setOrden("stock-desc");
                setMostrarMenuFiltros(false);
              }}
            >
              Menor Stock ↓
            </button>
          </div>
        )}
      </div>

        {cargando ? (
          <img src={loading} alt="Cargando productos..." />
        ) : (
          <>
            <ProductList agregarCarrito={agregarAlCarrito} productos={productosOrdenados} />

            <ToastSimple
              mensaje="Producto agregado al carrito ✅"
              mostrar={toastVisible}
              onCerrar={() => setToastVisible(false)}
              duracion={2500}
            />

            <Cart
              cartItems={cartItems}
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              borrarProductos={borrarProductoDelCarrito}
              actualizarCantidad={actualizarCantidad}
            />
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default GaleriaDeProductos;
