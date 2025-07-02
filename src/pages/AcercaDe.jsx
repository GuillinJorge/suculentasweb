import React from 'react';
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';
import '../pages/Home.css';

const AcercaDe = () => {
  return (
    <>
      <Header />

      <main className="page-container">
        <h1>De un sueño verde a tus manos</h1>

        <section className="about-content">
          <div className="about-text">
            <p>
              <strong>Suculentas.AR</strong> Dio sus primeros pasos en 2020 cuando una familia de cordobeces lleva adelante su microemprendimiento durante la pandemia por COVID-19. Esta familia decidió convertir su colección personal de suculentas en un emprendimiento. Hoy con 5 años de progreso siguen cultivando para que lleguen a todos los hogares desde <strong>Villa Verde, Córdoba</strong>, con métodos 100% artesanales.
            </p>
            <p>
              Visita nuestro invernadero para workshops de trasplante o simplemente
              ¡a respirar aire lleno de verde! (Solo con cita previa).
            </p>
            <p className="highlight">
              ¡Te esperamos en: <em>Calle Jardín 123, Villa Verde</em> 🌵
            </p>
          </div>

          <div className="about-map">
            <iframe
              title="Ubicación de Suculentas Lumina"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3407.1288057170115!2d-64.12345678901234!3d-31.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDA3JzI0LjUiUyA2NMKwMDcnMjQuNSJX!5e0!3m2!1ses!2sar!4v1234567890123!5m2!1ses!2sar"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <a
              href="https://maps.google.com?q=Calle+Jardín+123,Villa+Verde,Córdoba"
              target="_blank"
              rel="noopener noreferrer"
              className="map-btn"
            >
              🚗 Abrir en Google Maps
            </a>
          </div>
          
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AcercaDe;