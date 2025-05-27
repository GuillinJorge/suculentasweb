import React from 'react';
import { useParams, Link } from 'react-router-dom';

const DetallesProductos = ({ productos }) => {
  const { id } = useParams();

  // Convertimos id a número para que coincida con los ids numéricos
  const product = productos.find(product => product.id === id);

  return (
    <div>
      <h1>Detalle de nuestro producto: {id}</h1>

      {product ? (
        <>
          <h2>{product.nombre}</h2>
          <p>Precio: ${product.precio}</p>
          <p>Stock: {product.stock}</p>
          <p>Descripción: {product.descripcion}</p>
        </>
      ) : (
        <p>Producto no encontrado</p>
      )}

      <button>
        <Link to="/">Volver al inicio</Link>
      </button>
    </div>
  );
};

export default DetallesProductos;

