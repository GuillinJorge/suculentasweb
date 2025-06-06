import React , { useContext } from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import ProductList from '../components/ProductLists'
import loading from '../assets/loading.gif'
import './Home.css'
import { CartContext } from '../context/CartContext'


  const Home = () => {
  
  const {cart, productos, cargando, handleAddToCart, handDeleteFromCart} = useContext(CartContext);
 
  const topProductos = [...productos]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 3);


  return (
    <>
        <Header/>
        <main>
          <img className="remove-bg" src="./public/logo_ppal.jpg" alt="suculentasweb" />
        <h1>SUCULENTAS</h1>
        <p>Dale una visita a nuestra tienda para conseguir, conocer y adentrarte en el maravilloso mundo de las suculentas. Aquí te ofrecemos todo lo mejor desde nuestro vivero para regalar o regalarte</p>
        
        
        <h2>Los más buscados y en stock 🌵</h2>
        {
          cargando ? <img src={loading} alt='loading'/>:

        <ProductList  
        productos={topProductos} 
        cargando={cargando} 
        borrarProducto={handDeleteFromCart} 
        agregarCarrito={handleAddToCart} />
        }
        
        <h2>Continua viendo más productos en nuestra Tienda 🛒</h2>
        
        </main>
        <Footer/>
    </>
  )
}

export default Home