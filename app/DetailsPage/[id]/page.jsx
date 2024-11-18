
'use client';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useRouter } from 'next/navigation';
import "./detailsPage.scss";
import { MdFavoriteBorder } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

export default function DetailsPage() {
    const router = useRouter();
    const { id } = useParams()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(null);
    const [isFavourite, setIsFavourite] = useState(false);

    useEffect(() => {
        if (!id) return;

        let isMounted = true; 

        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3001/products/${id}`);
                if (!response.ok) {
                    throw new Error("Ошибка при загрузке продукта");
                }
                const data = await response.json();
                if (isMounted) {
                    setProduct(data);
                }
            } catch (error) {
                if (isMounted) {
                    toast.error(error.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProduct();

        return () => {
            isMounted = false;
        };
    }, [id]); 

    useEffect(() => {
        if (product) {
            checkFavourite(); 
        }
    }, [product]);

    const handleOrderClick = () => {
        if (router) {
            router.push(`/OrderPage/${id}`);
        }
    };

    const checkFavourite = async () => {
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
            const data = await response.json();
            const isProductInFavourites = data.favourites.some(fav => fav.id === product.id);
            setIsFavourite(isProductInFavourites);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const addRating = async () => {
        if (!selectedRating) {
            toast.error("Выберите оценку!");
            return;
        }

        try {
            const updatedRatings = [...product.ratings, selectedRating];
            const updatedProduct = { ...product, ratings: updatedRatings };

            const response = await fetch(`http://localhost:3001/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error("Ошибка при добавлении оценки");
            }

            setProduct(updatedProduct);
            setIsModalOpen(false);
            toast.success("Спасибо за вашу оценку!");
            setSelectedRating(0);
        } catch (error) {
            toast.error(error.message);
        }
    };

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
            setIsFavourite(true);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const calculateAverageRating = () => {
        if (!product?.ratings.length) return 0;
        const total = product.ratings.reduce((sum, rating) => sum + rating, 0);
        return (total / product.ratings.length).toFixed(1);
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
                        <p>Средняя оценка: {calculateAverageRating()} / 5 ⭐</p>
                        <div className='details-button-section'>
                            <button
                                className="rate-btn"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Оценить продукт
                            </button>
                            {isFavourite ? (
                                <button onClick={addToFavourites} className='added-to-favourites'>
                                    <FaHeart />
                                </button>
                            ) : (
                                <button onClick={addToFavourites} className='add-to-favourites'>
                                    <MdFavoriteBorder />
                                </button>
                            )}
                            <button className="details-order-button" onClick={handleOrderClick}>
                                Заказать
                            </button>
                        </div>
                    </div>
                    <div className="image-section">
                        <img src={product.img} alt={product.name} className="product-img" />
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Оцените продукт</h3>
                        <div className="rating-options">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    onClick={() => setSelectedRating(value)}
                                    style={{
                                        cursor: 'pointer',
                                        color: value <= selectedRating ? 'gold' : '#ccc',
                                        fontSize: '1.5rem',
                                    }}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <button className="submit-rating-btn" onClick={addRating}>
                            Оценить
                        </button>
                        <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                            Закрыть
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
