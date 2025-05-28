import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import '../pages/Home.css'

const AcercaDe = ({cart, borrarProductos}) => {
  return (
    <>
    <Header borrarProductos={borrarProductos} cartItems={cart}/> 
      <main>
      <h1>Acerca de nosotros</h1>
      <p>Proximamente toda la información acerca de nuestros comienzos, nuestra casa matriz y las preguntas más frecuentes que puedas tener acerca del maravillos mundo de las suculentas aparecerá aquí</p>
      </main>
    <Footer/>
    </>
  )
}

export default AcercaDe
