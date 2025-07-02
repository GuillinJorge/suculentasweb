import React, { useContext } from 'react'
import Header from '../components/estaticos/Header'
import Footer from '../components/estaticos/Footer'
import Productos from '../components/Productos'
import loading from '../assets/loading.gif'
import './Home.css'
import { CartContext } from '../context/CartContext'


const Home = () => {

  const { cart, productos, cargando, handleAddToCart, handDeleteFromCart, } = useContext(CartContext);

  const topProductos = [...productos]
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 3);


  return (
    <>
      <Header />
      <main>
        <img className="remove-bg" src="./public/logo_ppal.jpg" alt="suculentasweb" />

        <p>Dale una visita a nuestra tienda para conseguir, conocer y adentrarte en el maravilloso mundo de las suculentas. Aquí te ofrecemos todo lo mejor desde nuestro vivero para regalar o regalarte</p>


        <h2>Los más buscados y en stock 🌵</h2>
        {
          cargando ? (
            <img src={loading} alt='loading' />
          ) : (
            <div className="featured-products-container">
              {topProductos.map((producto) => (
                <Productos
                  key={producto.id}
                  producto={producto}
                  agregarCarrito={handleAddToCart}
                  borrarProducto={handDeleteFromCart}
                />
              ))}
            </div>
          )
        }

        <h2>Continua viendo más productos en nuestra Tienda 🛒</h2>

      </main>
      <Footer />
    </>
  )
}

export default Home