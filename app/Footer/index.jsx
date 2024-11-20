'use client';
import Link from 'next/link';
import './footer.scss';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>{t('Footer.footer-logo-title')}</h2>
            <p>{t('Footer.footer-logo-subtitle')}</p>
          </div>

          <div className="footer-links">
            <h3>{t('Footer.footer-links-title')}</h3>
            <ul>
              <li><Link href="/">{t('Footer.footer-links-home')}</Link></li>
              <li><Link href="/Products">{t('Footer.footer-links-products')}</Link></li>
              <li><Link href="/Contact">{t('Footer.footer-links-contact')}</Link></li>
              <li><Link href="/Policy">{t('Footer.footer-links-policy')}</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>{t('Footer.footer-contact-title')}</h3>
            <p>{t('Footer.footer-contact-email')} <a href="mailto:SherovStudio@gmail.com">SherovStudio@gmail.com</a></p>
            <p>{t('Footer.footer-contact-phone')} <a href="tel:+998(94)538-61-72">+998 94 538 61 72</a></p>
          </div>

          <div className="footer-social">
            <h3>{t('Footer.footer-social-title')}</h3>
            <div className="social-links">
              <Link href="#" className="social-icon"><i className="fab fa-facebook-f"></i></Link>
              <Link href="#" className="social-icon"><i className="fab fa-instagram"></i></Link>
              <Link href="#" className="social-icon"><i className="fab fa-youtube"></i> </Link>
              <Link href="https://github.com/AmirSherov" className="social-icon"><i className="fab fa-github"></i> </Link>
              <Link href="https://t.me/smile_zxc" className="social-icon"><i className="fab fa-telegram"></i> </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t('Footer.footer-bottom-text')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
