'use client';
import { useState } from 'react';
import emailjs from 'emailjs-com';
import Head from 'next/head';
import "./contact.scss"
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
  const { t } = useTranslation();
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
      setStatus(t("Contact.message-sent"));
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setStatus(t("Contact.error-message"));
    }
  };

  return (
    <>
      <Head>
        <title>{t("Contact.contact-us")}</title>
        <meta name="description" content="Свяжитесь с нами для получения консультации или заказа" />
      </Head>

      <div className="contact-page">
        <div className="contact-container">
          <h1 className="contact-title">{t("Contact.contact-us")}</h1>
          <p className="contact-subtitle">{t("Contact.glad-to-help")}</p>

          <form onSubmit={handleSubmit} className="contact-form">
            <input
              type="text"
              name="name"
              placeholder={t("Contact.name")}
              value={formData.name}
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="email"
              name="email"
              placeholder={t("Contact.email")}
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
            <textarea
              name="message"
              placeholder={t("Contact.message")}
              value={formData.message}
              onChange={handleChange}
              className="textarea-field"
            />
            <button type="submit" className="submit-button">
              {t("Contact.send-message")}
            </button>
            <p className="status">{status}</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
