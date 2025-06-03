import React, { useState, useContext } from "react";
import Header from "../components/estaticos/Header";
import Footer from "../components/estaticos/Footer";
import ProductList from "../components/ProductLists";
import Cart from "../components/Cart";
import ToastSimple from "../components/ToastSimple";
import loading from "../assets/loading.gif";
import { CartContext } from "../context/CartContext";

const GaleriaDeProductos = ({ productos, cargando }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [orden, setOrden] = useState(null);
  const [mostrarMenuFiltros, setMostrarMenuFiltros] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const {
    cart,
    handleAddToCart,
    handDeleteFromCart,
    actualizarCantidad,
  } = useContext(CartContext);

  const abrirCarrito = () => setIsCartOpen(true);

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

  return (
    <>
      <Header cartItems={cart} abrirCarrito={abrirCarrito} borrarProductos={handDeleteFromCart} />

      <main className="galeria-main">
        <h1>Tienda</h1>

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
              {["todos", "Cactáceas", "Arból de jade", "Lengua de suegra", "Sedum", "Echeveria"].map((cat) => (
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
            <ProductList
              agregarCarrito={(producto) => {
                handleAddToCart(producto);
                setIsCartOpen(true);
                setToastVisible(true);
              }}
              productos={productosOrdenados}
            />

            {toastVisible && (
              <ToastSimple
                mensaje="Producto agregado al carrito ✅"
                mostrar={toastVisible}
                onCerrar={() => setToastVisible(false)}
                duracion={2500}
              />
            )}

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
