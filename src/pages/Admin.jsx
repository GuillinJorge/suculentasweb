import React, { useState, useEffect } from "react";
import "./Admin.css";
import FormularioProducto from "../components/FormularioProducto";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", price: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);



  useEffect(() => {
    fetch("/data/data.json")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setProducts(data);
          setLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const agregarProducto = async (producto) =>{
    try{
      const respuesta = await fetch('https://683f863e5b39a8039a54d90b.mockapi.io/products/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      })
      if(!respuesta.ok){
        throw new Error('Error al agregar producto')
      }
      
      const data = await respuesta.json()
      alert ('Producto agregado correctamente')

    }catch(error){
      console.log(error.message);
    }
  }



  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <ul className="nav-list">
          <li>
            <a href="/admin" className="nav-link">
              Panel Admin
            </a>
          </li>
        </ul>
        <button className="logout-button" title="Cerrar sesión">
          <i className="fa-solid fa-right-from-bracket"></i>
        </button>
      </nav>

      <h1 className="admin-title">Panel Administrativo</h1>

       {loading ? (
        <p className="loading-text">Cargando...</p>
      ) : error ? (
        <p className="error-text">Error al cargar los datos.</p>
      ) : (

        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <img
                src={product.imagen}
                alt={product.nombre}
                className="product-image"
              />
              <div className="product-info">
                <p className="product-name">{product.nombre}</p>
                <p className="product-price">${product.precio}</p>
              </div>
              <div className="product-actions">
                <button className="edit-button">Editar</button>
                <button className="delete-button">Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button onClick={()=> setOpen(true)}>*</button>
      {open && (<FormularioProducto onAgregar={agregarProducto}/>)}
    </div>
  );
};

export default Admin;
