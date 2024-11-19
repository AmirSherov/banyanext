'use client'
import { useTranslation } from "react-i18next";
import Link from 'next/link';
import './landing.scss';
export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t("LandingPage.hero-title")} </h1>
          <p className="hero-description">
            {t("LandingPage.hero-description")}
          </p>
          <Link href="/Products">
            <p className="cta-button">{t("LandingPage.cta-button-hero")}</p>
          </Link>
        </div>
      </section>

      <section className="about-section">
        <h2 className="section-title">{t("LandingPage.section-title-about")}</h2>
        <p className="about-description">
          {t("LandingPage.about-description")}
        </p>
      </section>

      <section className="advantages-section">
        <h2 className="section-title">{t("LandingPage.section-title-advantages")}</h2>
        <div className="advantages-list">
          <div className="advantage-item">{t("LandingPage.advantage-item-1")}</div>
          <div className="advantage-item">{t("LandingPage.advantage-item-2")}</div>
          <div className="advantage-item">{t("LandingPage.advantage-item-3")}</div>
          <div className="advantage-item">{t("LandingPage.advantage-item-4")}</div>
        </div>
      </section>

      <section className="services-section">
        <h2 className="section-title">{t("LandingPage.section-title-services")}</h2>
        <div className="services-list">
          <div className="service-card">
            <h3>{t("LandingPage.service-card-1-title")}</h3>
            <p>{t("LandingPage.service-card-1-description")}</p>
            <Link href="/About" className="cta-button">{t("LandingPage.cta-button-service-1")}</Link>
          </div>
          <div className="service-card">
            <h3>{t("LandingPage.service-card-2-title")}</h3>
            <p>{t("LandingPage.service-card-2-description")}</p>
            <Link href="/Contact" className="cta-button">{t("LandingPage.cta-button-service-2")}</Link>
          </div>
          <div className="service-card">
            <h3>{t("LandingPage.service-card-3-title")}</h3>
            <p>{t("LandingPage.service-card-3-description")}</p>
            <Link href="/" className="cta-button">{t("LandingPage.cta-button-service-3")}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
