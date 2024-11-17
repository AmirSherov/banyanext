'use client';
import { useEffect, useState } from 'react';
import './nav.scss';
import Link from 'next/link';
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState(null);
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
            Главная
          </Link>
          <Link
            href="/About"
            onClick={() => handleLinkClick('/about')}
            className={activeLink === '/about' ? 'active' : ''}
          >
            О нас
          </Link>
          <Link
            href="/Contact"
            onClick={() => handleLinkClick('/contact')}
            className={activeLink === '/contact' ? 'active' : ''}
          >
            Контакты
          </Link>
          <Link
            href="/Products"
            onClick={() => handleLinkClick('/banya')}
            className={activeLink === '/banya' ? 'active' : ''}
          >
            Бани
          </Link>
          {isLogged ? (<Link
            href="/Accaunt"
            onClick={() => handleLinkClick('/accaunt')}
            className={activeLink === '/accaunt' ? 'active' : ''}
          >
            Аккаунт
          </Link> ):(<Link
            href="/Authentication"
            onClick={() => handleLinkClick('/authentication')}
            className={activeLink === '/authentication' ? 'active' : ''}
          >
            Авторизация
          </Link>) }


        </div>
      </div>


    </div>
  );
};

export default Nav;
