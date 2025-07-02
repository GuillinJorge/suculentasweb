import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './FormularioProducto.css'; // Reutilizamos los mismos estilos

const FormularioEdicion = ({ productoSeleccionado, onActualizar, onClose }) => {
  const [producto, setProducto] = useState({
    id: '',
    nombre: '',
    precio: '',
    descripcion: '',
    imagen: '',
    categoria: '',
    stock: ''
  });

  const [errores, setErrores] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Actualizar estado cuando cambia productoSeleccionado
  useEffect(() => {
    if (productoSeleccionado) {
      setProducto({
        id: productoSeleccionado.id || '',
        nombre: productoSeleccionado.nombre || '',
        precio: productoSeleccionado.precio || '',
        descripcion: productoSeleccionado.descripcion || '',
        imagen: productoSeleccionado.imagen || '',
        categoria: productoSeleccionado.categoria || '',
        stock: productoSeleccionado.stock || ''
      });
    }
  }, [productoSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
    // Limpiar error cuando el usuario escribe
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' });
    }
  };

  const validateForm = () => {
    const nuevosErrores = {};
    if (!producto.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!producto.precio || parseFloat(producto.precio) <= 0) nuevosErrores.precio = 'Precio inválido';
    if (!producto.descripcion.trim()) nuevosErrores.descripcion = 'Descripción requerida';
    if (!producto.imagen.trim()) nuevosErrores.imagen = 'URL de imagen requerida';
    if (!producto.categoria) nuevosErrores.categoria = 'Selecciona una categoría';
    if (!producto.stock || parseInt(producto.stock) < 0) nuevosErrores.stock = 'Stock inválido';

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      await onActualizar({
        ...producto,
        precio: parseFloat(producto.precio),
        stock: parseInt(producto.stock)
      });

      // Feedback visual de éxito
      Swal.fire({
        icon: 'success',
        title: '¡Producto actualizado!',
        text: `"${producto.nombre}" se actualizó correctamente`,
        showConfirmButton: false,
        timer: 1500,
        background: '#224455',
        color: '#ffffff'
      });

      onClose(); // Cerrar el formulario después de actualizar
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Ocurrió un error al actualizar el producto',
        confirmButtonColor: '#ff5252',
        background: '#224455',
        color: '#ffffff'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categorias = [
    { value: '', label: 'Selecciona una categoría' },
    { value: 'suculentas', label: 'Suculentas' },
    { value: 'cactus', label: 'Cactus' },
    { value: 'herramientas', label: 'Herramientas' },
    { value: 'macetas', label: 'Macetas' }
  ];

  return (
    <div className="formulario-container">
      <div className="formulario-header">
        <h2>
          <FontAwesomeIcon icon={faSave} className="form-icon" />
          Editar Producto
        </h2>
        <button 
          type="button" 
          onClick={onClose}
          className="close-button"
          aria-label="Cerrar formulario"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="formulario-producto">
        <div className="form-group">
          <label htmlFor="id">ID del Producto</label>
          <input
            id="id"
            type="text"
            name="id"
            value={producto.id}
            onChange={handleChange}
            readOnly
            className="read-only-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre">Nombre del Producto</label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              className={errores.nombre ? 'input-error' : ''}
              placeholder="Ej: Suculenta Echeveria"
            />
            {errores.nombre && <span className="error-message">{errores.nombre}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="precio">Precio ($)</label>
            <input
              id="precio"
              type="number"
              name="precio"
              value={producto.precio}
              onChange={handleChange}
              min="0"
              step="0.01"
              className={errores.precio ? 'input-error' : ''}
              placeholder="Ej: 12.99"
            />
            {errores.precio && <span className="error-message">{errores.precio}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              name="categoria"
              value={producto.categoria}
              onChange={handleChange}
              className={errores.categoria ? 'input-error' : ''}
            >
              {categorias.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            {errores.categoria && <span className="error-message">{errores.categoria}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stock Disponible</label>
            <input
              id="stock"
              type="number"
              name="stock"
              value={producto.stock}
              onChange={handleChange}
              min="0"
              className={errores.stock ? 'input-error' : ''}
              placeholder="Ej: 50"
            />
            {errores.stock && <span className="error-message">{errores.stock}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            className={errores.descripcion ? 'input-error' : ''}
            placeholder="Describe el producto..."
            rows="4"
          />
          {errores.descripcion && <span className="error-message">{errores.descripcion}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="imagen">URL de la Imagen</label>
          <input
            id="imagen"
            type="url"
            name="imagen"
            value={producto.imagen}
            onChange={handleChange}
            className={errores.imagen ? 'input-error' : ''}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          {errores.imagen && <span className="error-message">{errores.imagen}</span>}
        </div>

        {producto.imagen && !errores.imagen && (
          <div className="image-preview">
            <p>Vista previa:</p>
            <img src={producto.imagen} alt="Vista previa" onError={(e) => e.target.style.display = 'none'} />
          </div>
        )}

        <div className="form-actions">
          <button 
            type="button" 
            onClick={onClose}
            className="cancel-button"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Actualizando...' : 'Actualizar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioEdicion;