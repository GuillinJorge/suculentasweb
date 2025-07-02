import React from 'react';
import Productos from './Productos';
import './styleProductos.css';

const ProductList = ({ productos, cargando, agregarCarrito, borrarProducto }) => {

  if (cargando) return <p>Cargando productos...</p>;

  if (!productos || productos.length === 0) {
    return (
      <div className="no-results">
        <p>No se encontraron productos con esa búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-grid">
        {productos.map((producto) => (
          <Productos
            key={producto.id}
            producto={producto}
            agregarCarrito={agregarCarrito}
            borrarProducto={borrarProducto}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
