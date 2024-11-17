'use client';

import './authentication.scss';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthPage() {
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
        toast.success('Добро пожаловать!');
        localStorage.setItem("userId" , user.id);
        setTimeout(()=>{
          window.location.href = '/';
        },3000)
        setTimeout(()=>{
          window.location.reload();
        },4000)
      } else {
        toast.error('Неверный email или пароль');
      }
    } else {
      if (registerData.email === '' || registerData.password === '' || registerData.confirmPassword === '') {
        toast.error('Пожалуйста, заполните все поля');
        return;
      }
      if (!registerData.email.includes('@gmail.com')) {
        toast.error('Некорректная электронная почта');
        return;
      }
      if (registerData.password !== registerData.confirmPassword) {
        toast.error('Пароли не совпадают');
        return;
      }
      if (registerData.password.length < 6) {
        toast.error('Пароль должен содержать не менее 6 символов');
        return;
      }

      const userExists = users.find((u) => u.email === registerData.email);
      if (userExists) {
        toast.error('Пользователь с таким email уже зарегистрирован');
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
            toast.success('Регистрация прошла успешно');
            setRegisterData({ email: '', password: '', confirmPassword: '' });
            setIsFlipped(false); 
          })
          .catch(() => {
            toast.error('Произошла ошибка при регистрации');
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
            <h2 className="form-title">Вход</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Электронная почта</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Введите email"
                  value={loginData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Введите пароль"
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="auth-button">Войти</button>
              <p className="switch-text">
                Нет аккаунта? <span onClick={handleFlip}>Зарегистрируйтесь</span>
              </p>
            </form>
          </div>

          <div className="card-face back-face">
            <h2 className="form-title">Регистрация</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Электронная почта</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Введите email"
                  value={registerData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Пароль</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Введите пароль"
                  value={registerData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Повторите пароль</label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Повторите пароль"
                  value={registerData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="auth-button">Регистрация</button>
              <p className="switch-text">
                Уже есть аккаунт? <span onClick={handleFlip}>Войти</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
