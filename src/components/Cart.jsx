import React, { useEffect } from 'react';
import './styleCart.css';

const Cart = ({ cartItems, isOpen, onClose, borrarProductos, actualizarCantidad }) => {
  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Calcular total
  const total = cartItems.reduce((acc, item) => {
    const precio = Number(item.precio) || 0;
    const cantidad = Number(item.quantity) || 0;
    return acc + precio * cantidad;
  }, 0);


  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose}></div>}

      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className='cart-header'>
          <h2>Carrito de compras</h2>
          <button onClick={onClose} className='close-button'>X</button>
        </div>

        <div className='cart-content'>
          {cartItems.length === 0 ? (
            <p style={{ color: 'red' }}>El carrito está vacío</p>
          ) : (
            <>
              <ul className='cart-item'>
                {cartItems.map((item) => (
                  <li key={item.id} style={{ color: 'black' }}>
                    <div className="item-row">
                      <span>{item.nombre}</span>
                      <div className="quantity-controls">
                        <button onClick={() => actualizarCantidad(item, -1)}>-</button>
                        <span>x{item.quantity}</span>
                        <button onClick={() => actualizarCantidad(item, 1)}>+</button>
                      </div>
                      <span>${(item.precio * item.quantity).toFixed(2)}</span>
                      <button onClick={() => borrarProductos(item)}>
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

