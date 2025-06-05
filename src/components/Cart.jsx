import React, { useEffect, useContext } from 'react';
import './styleCart.css';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cart, isCartOpen, setIsCartOpen, handDeleteFromCart, actualizarCantidad,} = useContext(CartContext);

  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    if (isCartOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Calcular total
  const total = cart.reduce((acc, item) => {
    const precio = Number(item.precio) || 0;
    const cantidad = Number(item.quantity) || 0;
    return acc + precio * cantidad;
  }, 0);

  return (
    <>
      {isCartOpen && <div className="overlay" onClick={() => setIsCartOpen(false)}></div>}

      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className='cart-header'>
          <h2>Carrito de compras</h2>
          <button onClick={() => setIsCartOpen(false)} className='close-button'>X</button>
        </div>

        <div className='cart-content'>
          {cart.length === 0 ? (
            <p style={{ color: 'red' }}>El carrito está vacío</p>
          ) : (
            <>
              <ul className='cart-item'>
                {cart.map((item) => (
                  <li key={item.id} style={{ color: 'black' }}>
                    <div className="item-row">
                      <span>{item.nombre}</span>
                      <div className="quantity-controls">
                        <button onClick={() => actualizarCantidad(item, -1)}>-</button>
                        <span>x{item.quantity}</span>
                        <button onClick={() => actualizarCantidad(item, 1)}>+</button>
                      </div>
                      <span>${(item.precio * item.quantity).toFixed(2)}</span>
                      <button onClick={() => handDeleteFromCart(item)}>
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="cart-total">
                <hr />
                <p><strong>Total:</strong> ${total.toFixed(2)}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;

