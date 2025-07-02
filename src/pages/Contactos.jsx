import React from 'react';
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';
import Swal from 'sweetalert2';
import '../pages/Home.css';

const Contactos = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    try {
      // Mostrar loader mientras se envía
      Swal.fire({
        title: 'Enviando mensaje...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Mensaje enviado!',
          text: 'Gracias por contactarnos. Te responderemos pronto.',
          confirmButtonColor: '#3ddc97'
        });
        form.reset(); // Limpiar el formulario
      } else {
        throw new Error('Error al enviar el formulario');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error al enviar tu mensaje. Por favor intenta nuevamente.',
        confirmButtonColor: '#3ddc97'
      });
    }
  };

  return (
    <>
      <Header />
      
      <main className="page-container">
        <h1>¿Tienes dudas? ¡Nos encanta hablar de plantas!</h1>
        
        <section className="contact-grid">
          <div className="contact-details">
            <h2>🌵 Suculentas.AR</h2>
            <p>
              Completa este formulario si nos queres contactar, dejar alguna sugerencia o planificar un día de visita a nuestro vivero
            </p>
            <ul className="contact-list">
              <li>📍 Calle Jardín 123, Villa Verde, Córdoba</li>
              <li>📞 +54 351 555-9876</li>
              <li>📧 contacto@vivero.com</li>
              <li>⏰ Lunes a Viernes: 9:00 a 18:00</li>
            </ul>
          </div>

          <div className="contact-form">
            <h2>Escríbenos</h2>
            <form 
              action="https://formspree.io/f/mnnvweve" 
              method="POST"
              onSubmit={handleSubmit}
            >
              <input 
                type="hidden" 
                name="_subject" 
                value="Nuevo mensaje de Suculentas.AR" 
              />
              
              <div className="form-group">
                <label htmlFor="name">Nombre</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  placeholder="Ej: María García" 
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="_replyto"
                  placeholder="tucorreo@ejemplo.com" 
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensaje</label>
                <textarea 
                  id="message" 
                  name="message"
                  rows="5" 
                  placeholder="¿Qué necesitas?"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn-submit">
                Enviar
              </button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Contactos;