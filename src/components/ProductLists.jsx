import React from 'react';
import Productos from './Productos';
import './styleProductos.css'
import { CartContext } from '../context/CartContext';

const ProductList = ({ productos = [], cargando, agregarCarrito, borrarProducto }) => {
  if (cargando) return <p>Cargando productos...</p>;

  if (!productos || productos.length === 0) return <p>No hay productos disponibles.</p>;

  return (
    <>
      <div className="product-grid">
        {productos.map((producto) => (
          <Productos
            key={producto.id}
            producto={producto}
            agregarCarrito={agregarCarrito}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
