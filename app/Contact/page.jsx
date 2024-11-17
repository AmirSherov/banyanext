'use client';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import Head from 'next/head';
import "./contact.scss"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Отправка...');

    try {
      await emailjs.sendForm(
        'SERVICE_ID',
        'TEMPLATE_ID',
        e.target,
        'USER_ID'
      );
      setStatus('Сообщение отправлено!');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setStatus('Ошибка при отправке. Попробуйте снова.');
    }
  };

  return (
    <>
      <Head>
        <title>Свяжитесь с нами</title>
        <meta name="description" content="Свяжитесь с нами для получения консультации или заказа" />
      </Head>

      <div className="contact-page">
        <div className="contact-container">
          <h1 className="contact-title">Свяжитесь с нами</h1>
          <p className="contact-subtitle">Мы всегда рады помочь!</p>

          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="email"
              name="email"
              placeholder="Ваш Email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
            <textarea
              name="message"
              placeholder="Ваше сообщение"
              value={formData.message}
              onChange={handleChange}
              className="textarea-field"
            />
            <button type="submit" className="submit-button">
              Отправить
            </button>
            <p className="status">{status}</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
