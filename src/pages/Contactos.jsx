import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import '../pages/Home.css'

const Contactos = ({cart}) => {
  return (
    <>
      <Header cartItems={cart}/>
      <main>
      <h1>Contactanos</h1>
      <p>Proximamente se encontrara un formulario de contacto para poder comunicarte con nosotros</p>
      </main>
      <Footer/>
    </>
  )
}

export default Contactos
