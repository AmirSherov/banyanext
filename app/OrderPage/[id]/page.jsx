'use client';
import { useParams} from 'next/navigation';
import { useState, useEffect } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import { useTranslation } from 'react-i18next';
import './OrderPage.scss';
import 'react-toastify/dist/ReactToastify.css';
const OrderPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    peopleCount: '',
    hours: '',
    date: '',
    size: '',
    material: ''
  });

  useEffect(() => {

    fetch(`http://localhost:3001/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data));
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('Пожалуйста, войдите в систему');
    } else {
      fetch(`http://localhost:3001/users/${userId}`)
        .then(response => response.json())
        .then(user => {
          const updatedUser = {
            ...user,
            orders: [
              ...user.orders,
              {
                productId: id,
                ...formData,
                productName: product.name,
                productImage: product.img,
              },
            ],
          };

          fetch(`http://localhost:3001/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser),
          })
            .then(() => {
              toast.success('Заказ оформлен успешно');
            });
        });
    }
  };

  if (!product) return <div>Загрузка...</div>;

  return (
    <>
    <ToastContainer 
    position="top-center"
    />
    <div>
      <h2 className='h2'>{t("OrderPage.placing-an-order")}</h2>
      <div>
        <img className='order-img' src={product.img} alt={product.name} />
        <h3 className='h3'>{product.name}</h3>
      </div>
      <form className='order-form'>
        <label>
          {t("OrderPage.people-count")}
          <input min={0} max={6} type="number" name="peopleCount" value={formData.peopleCount} onChange={handleInputChange} />
        </label>
        <label>
          {t("OrderPage.hour-count")}
          <input min={0} max={10} type="number" name="hours" value={formData.hours} onChange={handleInputChange} />
        </label>
        <label>
          {t("OrderPage.time")}
          <input type="datetime-local" name="date" value={formData.date} onChange={handleInputChange} />
        </label>
        <label>
          {t("OrderPage.size")}
          <input type="text" name="size" value={formData.size} onChange={handleInputChange} />
        </label>
        <label>
          {t("OrderPage.material")}
          <input type="text" name="material" value={formData.material} onChange={handleInputChange} />
        </label>
        <button className='order-button-orderPage' type="button" onClick={handleSubmit}>Заказать</button>
      </form>
    </div>
    </>
  );
};

export default OrderPage;
