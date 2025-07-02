import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import FormularioProducto from "../components/FormularioProducto";
import "./Admin.css";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import FormularioEdicion from "../components/FormularioEdicion";

const Admin = () => {

  const {
    products,
    loading,
    open,
    setOpen,
    error,
    openEditor,
    setOpenEditor,
    seleccionado,
    setSeleccionado,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
    handleLogout,
  } = useContext(AdminContext);
  
  
  
  return (
    <div className="admin-container">
      <nav className="admin-nav">
        <h1 className="admin-nav-title">Panel Administrativo</h1>
        <button className="logout-button" onClick={handleLogout} title="Cerrar sesión">
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </nav>

      <main className="admin-content">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Cargando productos...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>Error al cargar los productos</p>
            <button onClick={() => window.location.reload()} className="reload-button">
              Reintentar
            </button>
          </div>
        ) : (
          <>
            <div className="products-header">
              <h2>Lista de Productos ({products.length})</h2>
              <button
                className="add-product-button"
                onClick={() => setOpen(true)}
              >
                <FontAwesomeIcon icon={faPlus} /> Nuevo Producto
              </button>
            </div>

            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image-container">
                    <img src={product.imagen} alt={product.nombre} className="product-image" />
                  </div>
                  <div className="product-details">
                    <h3 className="product-name">{product.nombre}</h3>
                    <div className="product-info-row">
                      <span className="product-price">${product.precio}</span>
                      <span className="product-stock">{product.stock} unidades</span>
                    </div>
                    <div className="product-actions">
                      <button className="edit-button" onClick={() => {
                        setSeleccionado(product);
                        setOpenEditor(true);
                      }}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Editar
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => eliminarProducto(product.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {open && (
          <div className="modal-overlay">
            <div className="modal-content">
              <FormularioProducto onAgregar={agregarProducto} onClose={() => setOpen(false)} />
            </div>
          </div>
        )}

        {openEditor && (
          <div className="modal-overlay">
            <div className="modal-content">
              <FormularioEdicion
                productoSeleccionado={seleccionado}
                onActualizar={actualizarProducto}
                onClose={() => {
                  setOpenEditor(false);
                  setSeleccionado(null);
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;