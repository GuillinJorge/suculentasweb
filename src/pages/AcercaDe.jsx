import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const AcercaDe = ({cart, borrarProductos}) => {
  return (
    <>
    <Header borrarProductos={borrarProductos} cartItems={cart}/> 
      <h1>Acerca de nuestros</h1>
    <Footer/>
    </>
  )
}

export default AcercaDe
