import React, { useState } from "react";

const FormularioProducto = ({ onAgregar }) => {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    imagen:''
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple
    const nuevosErrores = {};
    if (!producto.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio';
    if (!producto.precio || parseFloat(producto.precio) <= 0) nuevosErrores.precio = 'El precio debe ser mayor a 0';
    if (!producto.descripcion.trim()) nuevosErrores.descripcion = 'La descripción es obligatoria';
    if (!producto.imagen.trim()) nuevosErrores.imagen = 'La imagen es obligatoria';

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    onAgregar(producto);

    setProducto({
      nombre: '',
      precio: '',
      descripcion: '',
      imagen:''
    });

    setErrores({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Producto</h2>

      <div>
        <label>Nombre: </label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
        {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}
      </div>

      <div>
        <label>Precio:</label>
        <input
          type="number"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          required
          min="0"
        />
        {errores.precio && <p style={{ color: 'red' }}>{errores.precio}</p>}
      </div>

      <div>
        <label>Descripción:</label>
        <textarea
          name="descripcion"
          value={producto.descripcion}
          onChange={handleChange}
          required
        />
        {errores.descripcion && <p style={{ color: 'red' }}>{errores.descripcion}</p>}
      </div>
      <div>
        <label>Imagen:</label>
        <textarea
          name="imagen"
          value={producto.imagen}
          onChange={handleChange}
          required
        />
        {errores.descripcion && <p style={{ color: 'red' }}>{errores.descripcion}</p>}
      </div>

      <button type="submit">Agregar producto</button>
    </form>
  );
};

export default FormularioProducto;

