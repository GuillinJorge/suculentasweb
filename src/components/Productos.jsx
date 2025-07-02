import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import './styleProductos.css';
import { Link } from "react-router-dom";

const Productos = ({ producto, agregarCarrito }) => {
  const [cantidad, setCantidad] = useState(1);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const increase = () => setCantidad(prev => (prev < producto.stock ? prev + 1 : prev));
  const decrease = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));

  const handleAgregar = () => {
    agregarCarrito(producto, cantidad);
    setCantidad(1);
  }

  // Animaciones
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const elementVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  return (
    <motion.section
      ref={ref}
      className='card'
      initial="hidden"
      animate={controls}
      variants={cardVariants}
    >
      <motion.div 
        className='imagenContainer'
        variants={elementVariants}
        transition={{ delay: 0.2 }}
      >
        <motion.img 
          className='imagen' 
          src={producto.imagen} 
          alt={producto.nombre}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
      </motion.div>

      <motion.h3 
        className='nombre'
        variants={elementVariants}
        transition={{ delay: 0.4 }}
      >
        {producto.nombre}
      </motion.h3>

      <motion.p 
        className='precio'
        variants={elementVariants}
        transition={{ delay: 0.5 }}
      >
        Precio: ${producto.precio}
      </motion.p>

      <motion.p 
        className='stock'
        variants={elementVariants}
        transition={{ delay: 0.6 }}
      >
        Stock: {producto.stock}
      </motion.p>

      <motion.div 
        className='cantidadContainer'
        variants={elementVariants}
        transition={{ delay: 0.7 }}
      >
        <motion.button 
          className='qtyButton' 
          onClick={decrease}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          -
        </motion.button>
        <motion.span
          key={cantidad}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          {cantidad}
        </motion.span>
        <motion.button 
          className='qtyButton' 
          onClick={increase}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          +
        </motion.button>
      </motion.div>

      <motion.button 
        onClick={handleAgregar} 
        disabled={cantidad >= producto.stock}
        variants={elementVariants}
        transition={{ delay: 0.8 }}
        whileHover={cantidad < producto.stock ? { scale: 1.05 } : {}}
        whileTap={cantidad < producto.stock ? { scale: 0.95 } : {}}
        style={{
          backgroundColor: cantidad >= producto.stock ? "#cccccc" : "#4CAF50",
          color: cantidad >= producto.stock ? "#666666" : "white"
        }}
      >
        {cantidad >= producto.stock ? 'Stock máximo alcanzado' : 'Agregar al carrito'}
      </motion.button>

      <motion.div
        variants={elementVariants}
        transition={{ delay: 0.9 }}
      >
        <Link 
          to={`/productos/${producto.id}`} 
          style={{ 
            color: '#4CAF50', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            display: 'inline-block',
            marginTop: '10px'
          }}
        >
          <motion.span
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Ver más →
          </motion.span>
        </Link>
      </motion.div>
    </motion.section>
  )
}

export default Productos;