import React, { useState } from 'react'
import './styleProductos.css'
import { Link } from "react-router-dom";

const Productos = ({ producto, agregarCarrito }) => {
  const [cantidad, setCantidad] = useState(1);

  const increase = () => setCantidad(prev => (prev < producto.stock ? prev + 1 : prev));
  const decrease = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

  const handleAgregar = () => {
    agregarCarrito(producto, cantidad);
    setCantidad(1); // Reinicia la cantidad después de agregar si querés
  }

  return (
    <section className='card'>
      <div className='imagenContainer'>
        <img className='imagen' src={producto.imagen} alt={producto.nombre} />
      </div>
      <h3 className='nombre'>{producto.nombre}</h3>
      <p className='precio'>Precio: ${producto.precio}</p>
      <p className='stock'>Stock: {producto.stock}</p>

      <div className='cantidadContainer'>
        <button className='qtyButton' onClick={decrease}>-</button>
        <span>{cantidad}</span>
        <button className='qtyButton' onClick={increase}>+</button>
      </div>

      <button 
        onClick={handleAgregar} 
        disabled={cantidad >= producto.stock}
      >
        {cantidad >= producto.stock ? 'Stock máximo alcanzado' : 'Agregar al carrito'}
      </button>

      <Link   to={`/productos/${producto.id}`} style={{ color: '#4CAF50', textDecoration: 'none', fontWeight: 'bold' }}
>
  Ver más
</Link>
    </section>
  )
}

export default Productos
