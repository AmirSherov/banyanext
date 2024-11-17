'use client';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'next/navigation';  // Импортируем useParams из next/navigation

import "./detailsPage.scss";

export default function DetailsPage() {
    const { id } = useParams();  // Используем useParams для получения параметра id
    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            toast.error("Не удалось найти продукт.");
            return;
        }

        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3001/products/${id}`);
                if (!response.ok) {
                    throw new Error("Ошибка при загрузке продукта");
                }
                const data = await response.json();
                setProduct(data);  
            } catch (error) {
                toast.error(error.message); 
            } finally {
                setLoading(false); 
            }
        };

        fetchProduct(); 
    }, [id]);

    const addToFavourites = async () => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            toast.error("Пожалуйста, войдите в аккаунт.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/users/${userId}`);
            if (!response.ok) {
                throw new Error("Ошибка при загрузке данных пользователя");
            }
            const user = await response.json();
            const isProductInFavourites = user.favourites.some(fav => fav.id === product.id);
            if (isProductInFavourites) {
                toast.error("Этот продукт уже в избранном.");
                return;
            }

            user.favourites.push(product);
            const updateResponse = await fetch(`http://localhost:3001/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!updateResponse.ok) {
                throw new Error("Ошибка при обновлении данных пользователя");
            }

            toast.success("Продукт добавлен в избранное!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }
    if (!product) {
        return <div>Продукт не найден.</div>;
    }

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
            <div className="details-page">
                <div className="product-details">
                    <div className="text-section">
                        <h2>{product.name}</h2>
                        <p>{product.category}</p>
                        <p>Цена: {product.price} $</p>
                        {product.title && <p className="product-title">{product.title}</p>} 
                        <button className="favorite-btn" onClick={addToFavourites}>
                            Добавить в избранное
                        </button>
                    </div>
                    <div className="image-section">
                        <img src={product.img} alt={product.name} className="product-img" />
                    </div>
                </div>
            </div>
        </>
    );
}
