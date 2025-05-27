import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'

const Contactos = ({cart}) => {
  return (
    <>
      <Header cartItems={cart}/>
      <h1>Contactanos</h1>
      <Footer/>
    </>
  )
}

export default Contactos
