
import Link from 'next/link';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>Бани на заказ</h2>
            <p>Натуральные материалы, уникальные проекты</p>
          </div>

          <div className="footer-links">
            <h3>Навигация</h3>
            <ul>
              <li><Link href="/">Главная</Link></li>
              <li><Link href="/Products">Продукты</Link></li>
              <li><Link href="/Contact">Контакты</Link></li>
              <li><Link href="/Policy">Политика конфиденциальности</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Контакты</h3>
            <p>Email: <a href="mailto:SherovStudio@gmail.com">SherovStudio@gmail.com</a></p>
            <p>Телефон: +998 94 538 61 72</p>
          </div>

          <div className="footer-social">
            <h3>Социальные сети</h3>
            <div className="social-links">
              <Link href="#" className="social-icon"><i className="fab fa-facebook-f"></i></Link>
              <Link href="#" className="social-icon"><i className="fab fa-instagram"></i></Link>
              <Link href="#" className="social-icon"><i className="fab fa-youtube"></i></Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Бани на заказ. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
