import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import loading from '../assets/loading.gif'; 
import '../pages/Home.css'

const DetallesProductos = () => {
  const { productos, cargando } = useContext(CartContext);
  const { id } = useParams();

  const product = productos.find(product => product.id === Number(id));

  return (
    <main>
      <h1>Detalle de nuestro producto: {id}</h1>

      {cargando ? (
        <img src={loading} alt="Cargando productos..." />
      ) : product ? (
        <>
          <h2>{product.nombre}</h2>
          <img
            src={product.imagen}
            alt={product.nombre}
            style={{ maxWidth: '300px', borderRadius: '10px' }}
          />
          <p>Precio: ${product.precio}</p>
          <p>Stock: {product.stock}</p>
          <p>Descripción: {product.descripcion}</p>
        </>
      ) : (
        <p style={{ color: "red" }}>Producto no encontrado</p>
      )}

      <button>
        <Link to="/">Volver al inicio</Link>
      </button>
    </main>
  );
};

export default DetallesProductos;
