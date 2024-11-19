'use client';
import { use, useEffect, useState } from 'react';
import './nav.scss';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState(null);
  const [ current , setCurrent ] = useState('Русский');
  const [lang , setLang] = useState('ru');
  const { t , i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUser(storedUserId);
    }
  }, []);
  useEffect(() => {
    if (user) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [user]);
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };
  const toggleDropdown = () => {
    setLangOpen(!langOpen);
  };
  return (
    <div>
      <div className={`burger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>


      <div className={`nav-container ${isOpen ? 'nav-open' : ''}`}>
        <div className="nav-links">
          <Link
            href="/"
            onClick={() => handleLinkClick('/')}
            className={activeLink === '/' ? 'active' : ''}
          >
            {t('Nav.home')}
          </Link>
          <Link
            href="/About"
            onClick={() => handleLinkClick('/about')}
            className={activeLink === '/about' ? 'active' : ''}
          >
            {t('Nav.about')}
          </Link>
          <Link
            href="/Contact"
            onClick={() => handleLinkClick('/contact')}
            className={activeLink === '/contact' ? 'active' : ''}
          >
            {t('Nav.contacts')}
          </Link>
          <Link
            href="/Products"
            onClick={() => handleLinkClick('/banya')}
            className={activeLink === '/banya' ? 'active' : ''}
          >
            {t('Nav.services')}
          </Link>
          <Link
            href="/OrdersPage"
            onClick={() => handleLinkClick('/orders')}
            className={activeLink === '/orders' ? 'active' : ''}
          >
            {t('Nav.orders')}
          </Link>
          {isLogged ? (<Link
            href="/Accaunt"
            onClick={() => handleLinkClick('/accaunt')}
            className={activeLink === '/accaunt' ? 'active' : ''}
          >
            {t('Nav.accaunt')}
          </Link>) : (<Link
            href="/Authentication"
            onClick={() => handleLinkClick('/authentication')}
            className={activeLink === '/authentication' ? 'active' : ''}
          >
            {t('Nav.authorization')}
          </Link>)}
          <div className='toggle-language'>
      <div className='current-language' onClick={toggleDropdown}>
        {current}
        <span className={`arrow1 ${langOpen ? 'open1' : ''}`}></span>
      </div>
      {langOpen && (
        <div className="variables">
          <div className="variable" onClick={() => {setCurrent('Русский'); setLang('ru'); toggleDropdown();}}>Русский</div>
          <div className="variable" onClick={() => {setCurrent('English'); setLang('en'); toggleDropdown();}}>English</div>
        </div>
      )}
    </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
