'use client';
import './about.scss';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
export default function About() {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState(false);

  return (
    <div className="about-container">
      <section className="intro-section">
        <h1 className="page-title">{t("About.about")}</h1>
        <p className="intro-text">
          {t("About.about-title")}
        </p>
      </section>

      <section className="team-section">
        <h2 className="section-title">{t("About.our-team")}</h2>
        <div className="team-members">
          <div
            className="team-member"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img
              src="data:image/jpeg;base64,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"
              alt="Команда 1"
              className="team-member-img"
            />
            <div className={`member-info ${hovered ? 'hovered' : ''}`}>
              <h3>Amir Sherov</h3>
              <p>{t("About.owner")}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mission-section">
        <h2 className="section-title">{t("About.our-mission")}</h2>
        <p className="mission-text">
          {t("About.mission-text")}
        </p>
        <div className="cube-loader">
          <div className="cube-top"></div>
          <div className="cube-wrapper">
            <span className="cube-span" style={{ '--i': 0 }}>
              <div className="text-container">Frontend</div>
            </span>
            <span className="cube-span" style={{ '--i': 1 }}>
              <div className="text-container">Backend</div>
            </span>
            <span className="cube-span" style={{ '--i': 2 }}>
              <div className="text-container">Fullstack</div>
            </span>
            <span className="cube-span" style={{ '--i': 3 }}>
              <div className="text-container">Mobile</div>
            </span>
          </div>
        </div>
      </section>
      <section className="testimonials-section">
        <h2 className="section-title">{t("About.client-rewievs")}</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p className="testimonial-text">"Это было потрясающе! Бани — просто великолепны."</p>
            <p className="client-name">Анна П.</p>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"Отличный сервис и невероятный комфорт!"</p>
            <p className="client-name">Максим В.</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2 className="section-title">{t("About.contact-us")}</h2>
        <p className="contact-text">
          {t("About.contact-text")}
        </p>
      </section>
    </div>
  );
}
