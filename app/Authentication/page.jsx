'use client';
import { useTranslation } from 'react-i18next';
import './authentication.scss';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthPage() {
  const { t } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [users, setUsers] = useState([]);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    function getUsers() {
      fetch('http://localhost:3001/users')
        .then(response => response.json())
        .then(data => setUsers(data));
    }

    getUsers();
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setIsLogin(!isLogin); 
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (isLogin) {
      setLoginData({
        ...loginData,
        [id]: value,
      });
    } else {
      setRegisterData({
        ...registerData,
        [id]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const user = users.find(
        (u) => u.email === loginData.email && u.password === loginData.password
      );
      if (user) {
        toast.success(t("Authorization.welcome-message"));
        localStorage.setItem("userId" , user.id);
        setTimeout(()=>{
          window.location.href = '/';
        },3000)
        setTimeout(()=>{
          window.location.reload();
        },4000)
      } else {
        toast.error(t("Authorization.incorrect-email-or-password"));
      }
    } else {
      if (registerData.email === '' || registerData.password === '' || registerData.confirmPassword === '') {
        toast.error(t("Authorization.fill-all-fields"));
        return;
      }
      if (!registerData.email.includes('@gmail.com')) {
        toast.error(t("Authorization.incorrect-email"));
        return;
      }
      if (registerData.password !== registerData.confirmPassword) {
        toast.error(t("Authorization.passwords-do-not-match"));
        return;
      }
      if (registerData.password.length < 6) {
        toast.error(t("Authorization.password-length"));
        return;
      }

      const userExists = users.find((u) => u.email === registerData.email);
      if (userExists) {
        toast.error(t("Authorization.user-already-exists"));
      } else {
        const newUser = {
          email: registerData.email,
          password: registerData.password,
          favourites: [],
        };

        fetch('http://localhost:3001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        })
          .then((response) => response.json())
          .then(() => {
            toast.success(t("Authorization.succesful-registration"));
            setRegisterData({ email: '', password: '', confirmPassword: '' });
            setIsFlipped(false); 
          })
          .catch(() => {
            toast.error(t("Authorization.registration-error"));
          });
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="auth-container">
        <div className={`auth-card ${isFlipped ? 'flipped' : ''}`}>

          <div className="card-face front-face">
            <h2 className="form-title">{t("Authorization.login")}</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">{t("Authorization.email")}</label>
                <input
                  type="email"
                  id="email"
                  placeholder={t("Authorization.enter-email")}
                  value={loginData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">{t("Authorization.password")}</label>
                <input
                  type="password"
                  id="password"
                  placeholder={t("Authorization.enter-password")}
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="auth-button">{t("Authorization.login")}</button>
              <p className="switch-text">
                {t("Authorization.no-account")} <span onClick={handleFlip}>{t("Authorization.register-link")}</span>
              </p>
            </form>
          </div>

          <div className="card-face back-face">
            <h2 className="form-title">{t("Authorization.registration")}</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">{t("Authorization.email")}</label>
                <input
                  type="text"
                  id="email"
                  placeholder={t("Authorization.enter-email")}
                  value={registerData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">{t("Authorization.password")}</label>
                <input
                  type="password"
                  id="password"
                  placeholder={t("Authorization.enter-password")}
                  value={registerData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">{t("Authorization.repeat-password")}</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder={t("Authorization.repeat-password")}
                  value={registerData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="auth-button">{t("Authorization.registration")}</button>
              <p className="switch-text">
                {t("Authorization.already-have-account")} <span onClick={handleFlip}>{t("Authorization.login-link")}</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
