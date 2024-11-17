
import Link from 'next/link';
import './landing.scss';
export default function Home() {
  return (
    <div className="container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Лучшие бани для вашего уюта и отдыха </h1>
          <p className="hero-description">
            Откройте для себя атмосферу традиционных бань с натуральными материалами и роскошными удобствами.
          </p>
          <Link href="/Products">
            <p className="cta-button">Посмотреть наши бани</p>
          </Link>
        </div>  
      </section>

      <section className="about-section">
        <h2 className="section-title">Что такое настоящая баня?</h2>
        <p className="about-description">
          Баня — это место не только для отдыха, но и для восстановления сил. Наши бани из натуральных материалов подарят вам истинное наслаждение.
        </p>
      </section>

      <section className="advantages-section">
        <h2 className="section-title">Преимущества наших бань</h2>
        <div className="advantages-list">
          <div className="advantage-item">Натуральное дерево</div>
          <div className="advantage-item">Современные технологии</div>
          <div className="advantage-item">Индивидуальные проекты</div>
          <div className="advantage-item">Уютная атмосфера</div>
        </div>
      </section>

      <section className="services-section">
        <h2 className="section-title">Наши услуги</h2>
        <div className="services-list">
          <div className="service-card">
            <h3>Индивидуальные проекты</h3>
            <p>Создайте уникальную баню по вашим предпочтениям и потребностям.</p>
            <Link href="/About" className="cta-button">Узнать больше</Link>
          </div>
          <div className="service-card">
            <h3>Готовые проекты</h3>
            <p>Выберите из нашего каталога готовых проектов бань для вашего участка.</p>
            <Link href="/Contact" className="cta-button">Узнать больше</Link>
          </div>
          <div className="service-card">
            <h3>Консультации</h3>
            <p>Мы поможем вам выбрать оптимальный проект и материал для вашей бани.</p>
            <Link href="/" className="cta-button">Узнать больше</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
