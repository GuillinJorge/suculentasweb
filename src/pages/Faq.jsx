import React from 'react';
import Header from '../components/estaticos/Header';
import Footer from '../components/estaticos/Footer';
import '../pages/Home.css';

const Faq = () => {
  const faqs = [
    {
      question: "¿Cada cuánto debo regar mis suculentas?",
      answer: "En verano: cada 7-10 días. En invierno: cada 15-20 días. ¡Nunca dejes agua estancada en el plato!"
    },
    {
      question: "¿Qué tipo de sustrato usan?",
      answer: "Mezcla especial con arena volcánica, turba y perlita para un drenaje perfecto. ¡Evita la tierra común!"
    },
    {
      question: "¿Hacen envíos a todo el país?",
      answer: "¡Sí! Usamos embalaje biodegradable y protegido. Los envíos tardan 3-5 días hábiles."
    },
    {
      question: "Mi suculenta tiene manchas marrones, ¿qué hago?",
      answer: "Puede ser exceso de sol o humedad. Muévela a un lugar con luz indirecta y revisa las raíces."
    }
  ];

  return (
    <>
      <Header />
      
      <main className="page-container">
        <h1>Todo lo que necesitas saber sobre tus suculentas</h1>
        
        <section className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3 className="faq-question">❓ {faq.question}</h3>
              <p className="faq-answer">🌱 {faq.answer}</p>
            </div>
          ))}
        </section>

        <div className="faq-extra">
          <p>¿No encontraste tu respuesta? <a href="/contacto">Escríbenos</a> 👩‍🌾</p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Faq;