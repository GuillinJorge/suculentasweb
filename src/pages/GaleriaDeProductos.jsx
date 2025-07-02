import React, { useState, useContext } from "react";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";
import ProductList from "../components/ProductLists";
import Cart from "../components/Cart";
import ToastSimple from "../components/ToastSimple";
import loading from "../assets/loading.gif";
import { CartContext } from "../context/CartContext";

const GaleriaDeProductos = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [orden, setOrden] = useState(null);
  const [mostrarMenuFiltros, setMostrarMenuFiltros] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [busqueda, setBusqueda] = useState(""); // 🔍

  const {
    cart,
    productos,
    cargando,
    handleAddToCart,
    handDeleteFromCart,
    actualizarCantidad,
  } = useContext(CartContext);

  // 🔎 Filtrar por categoría y búsqueda
  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaSeleccionada === "todos" ||
      producto.categoria === categoriaSeleccionada;

    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;
  });

  // ⬆️⬇️ Ordenar productos
  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    switch (orden) {
      case "precio-asc":
        return a.precio - b.precio;
      case "precio-desc":
        return b.precio - a.precio;
      case "stock-asc":
        return a.stock - b.stock;
      case "stock-desc":
        return b.stock - a.stock;
      default:
        return 0;
    }
  });

  return (
    <>
      <Header />

      <main className="galeria-main">
        <h1>Tienda 🛒</h1>
        <p>Estos son nuestros productos más destacados</p>

          <h3>Busca tu producto favorito más rapido ⬇️ </h3>
        {/* 🔍 Búsqueda */}
        <div className="busqueda-container">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="busqueda-input"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda("")}
              className="clear-search-button"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* 📋 Filtros */}
        <div className="menu-filtros-container">
          <button
            className="toggle-sidebar"
            onClick={() => setMostrarMenuFiltros(!mostrarMenuFiltros)}
          >
            ☰ Ordenar y filtrar
          </button>

          {mostrarMenuFiltros && (
            <div className="menu-filtros-dropdown">
              <h4>Filtrar por categoría</h4>
              {[
                "todos",
                "Cactáceas",
                "Arból de jade",
                "Lengua de suegra",
                "Sedum",
                "Echeveria",
              ].map((cat) => (
                <button
                  key={cat}
                  className={categoriaSeleccionada === cat ? "active" : ""}
                  onClick={() => {
                    setCategoriaSeleccionada(cat);
                    setMostrarMenuFiltros(false);
                  }}
                >
                  {cat}
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

        {/* ⏳ Carga o Productos */}
        {cargando ? (
          <img src={loading} alt="Cargando productos..." />
        ) : (
          <>
            <ProductList
              productos={productosOrdenados}
              cargando={cargando}
              agregarCarrito={(producto) => {
                handleAddToCart(producto);
                setIsCartOpen(true);
                setToastVisible(true);
              }}
            />

            {/* ✅ Mensaje temporal */}
            {toastVisible && (
              <ToastSimple
                mensaje="Producto agregado al carrito ✅"
                mostrar={toastVisible}
                onCerrar={() => setToastVisible(false)}
                duracion={2500}
              />
            )}

            {/* 🛒 Carrito */}
            <Cart
              cartItems={cart}
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              borrarProductos={handDeleteFromCart}
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
