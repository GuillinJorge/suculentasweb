import React, { useContext } from 'react';
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';
import { CartContext } from '../context/CartContext';
import '../pages/Home.css';

const Contactos = () => {
  const { cart } = useContext(CartContext);

  return (
    <>
      <Header cartItems={cart} />
      <main>
        <h1>Contactanos</h1>
        <p>Próximamente se encontrará un formulario de contacto para poder comunicarte con nosotros.</p>
      </main>
      <Footer />
    </>
  );
};

export default Contactos;
