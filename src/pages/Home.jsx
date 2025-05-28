import React from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductLists from '../components/ProductLists'
import loading from '../assets/loading.gif'
import './Home.css'


const Home = ({cart, productos, cargando, agregarCarrito, borrarProductos}) => {
  return (
    <>
        <Header borrarProductos={borrarProductos} cartItems={cart}/>
        <main>
        <h1>SUCULENTAS</h1>
        <p>Dale una visita a nuestra tienda para conseguir, conocer y adentrarte en el maravilloso mundo de las suculentas. Aquí te ofrecemos todo lo mejor desde nuestro vivero para regalar o regalarte</p>
        
        
        {
          cargando ? <img src={loading} alt='loading'/>:

        <ProductLists  agregarCarrito={agregarCarrito} productos={productos}/>
        }
        
        
        
        </main>
        <Footer/>
    </>
  )
}

export default Home