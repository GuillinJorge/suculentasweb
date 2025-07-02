import React, { useContext, useMemo, useRef } from 'react';
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';
import Productos from '../components/Productos';
import loading from '../assets/loading.gif';
import './Home.css';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';

const Home = () => {
  const { productos, cargando, handleAddToCart, handDeleteFromCart } = useContext(CartContext);
  const controls = useAnimation();
  const ref = useRef(null);

  // Secciones dinámicas
  const sections = [
    {
      id: 'productos',
      title: "Los más buscados 🌵",
      content: (
        <ProductGrid 
          productos={productos} 
          cargando={cargando} 
          handleAddToCart={handleAddToCart} 
          handDeleteFromCart={handDeleteFromCart}
        />
      )
    },
    {
      id: 'acerca-de',
      title: "Nuestra Pasión por las Suculentas",
      content: <AboutPreview />
    },
    {
      id: 'faq',
      title: "Preguntas Frecuentes ❓",
      content: <FAQPreview />
    },
    {
      id: 'contacto',
      title: "¿Necesitas ayuda? 📩",
      content: <ContactPreview />
    }
  ];

  return (
    <>
      <Header />
      <motion.main 
        initial="hidden"
        animate={controls}
        ref={ref}
        className="home-container"
      >
        {/* Hero Section */}
        <HeroSection />

        {/* Secciones dinámicas con scroll */}
        {sections.map((section, index) => (
          <motion.section
            key={section.id}
            id={section.id}
            className="home-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h2 className="section-title">{section.title}</h2>
            {section.content}
            {index < sections.length - 1 && <ScrollHint />}
          </motion.section>
        ))}
      </motion.main>
      <Footer />
    </>
  );
};

// Componentes auxiliares - VERSIÓN CON PREVIEWS
const ProductGrid = ({ productos, cargando, ...props }) => {
  const topProductos = useMemo(() => 
    [...productos].sort((a, b) => b.stock - a.stock).slice(0, 3),
    [productos]
  );

  return cargando ? (
    <div className="loading-container">
      <img src={loading} alt="Cargando productos..." />
    </div>
  ) : (
    <>
      <div className="featured-products-container">
        <div className="product-grid">
          {topProductos.map((producto) => (
            <motion.div
              key={producto.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Productos producto={producto} {...props} />
            </motion.div>
          ))}
        </div>
      </div>
      <Link to="/tienda" className="cta-button">Ver todos los productos →</Link>
    </>
  );
};

const AboutPreview = () => (
  <motion.div 
    className="about-preview"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    <p>Somos apasionados por las suculentas desde 2015. Cultivamos cada planta con cuidado y amor en nuestro vivero familiar.</p>
    <Link to="/acerca-de" className="cta-button">Conoce nuestra historia →</Link>
  </motion.div>
);

const FAQPreview = () => (
  <motion.div 
    className="faq-preview"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
  >
    <div className="faq-item">
      <h3>¿Cómo cuidar mis suculentas?</h3>
      <p>Necesitan luz indirecta y riego moderado. Evita el exceso de agua para prevenir raíces podridas.</p>
    </div>
    <Link to="/faq" className="cta-button">Ver todas las preguntas →</Link>
  </motion.div>
);

const ContactPreview = () => (
  <motion.div 
    className="contact-preview"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.4 }}
  >
    <p>¿Tienes dudas? Escríbenos a:</p>
    <p className="contact-email">contacto@suculentasweb.com</p>
    <Link to="/contacto" className="cta-button">Ir al formulario →</Link>
  </motion.div>
);

// HeroSection y ScrollHint se mantienen igual
const HeroSection = () => (
  <section className="hero-section">
    <motion.img
      className="remove-bg"
      src="./public/logo_ppal.png"
      alt="SuculentasWeb"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
    />
    <motion.p
      className="hero-description"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      Descubre el maravilloso mundo de las suculentas
    </motion.p>
  </section>
);

const ScrollHint = () => (
  <motion.div
    className="scroll-hint"
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
  >
    ↓
  </motion.div>
);

export default Home;