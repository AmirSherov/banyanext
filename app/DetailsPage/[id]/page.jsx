// 'use client';
// import { useState, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useParams } from 'next/navigation'; 

// import "./detailsPage.scss";

// export default function DetailsPage() {
//     const { id } = useParams();  
//     const [product, setProduct] = useState(null); 
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!id) {
//             toast.error("Не удалось найти продукт.");
//             return;
//         }

//         const fetchProduct = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3001/products/${id}`);
//                 if (!response.ok) {
//                     throw new Error("Ошибка при загрузке продукта");
//                 }
//                 const data = await response.json();
//                 setProduct(data);  
//             } catch (error) {
//                 toast.error(error.message); 
//             } finally {
//                 setLoading(false); 
//             }
//         };

//         fetchProduct(); 
//     }, [id]);

//     const addToFavourites = async () => {
//         const userId = localStorage.getItem("userId");

//         if (!userId) {
//             toast.error("Пожалуйста, войдите в аккаунт.");
//             return;
//         }

//         try {
//             const response = await fetch(`http://localhost:3001/users/${userId}`);
//             if (!response.ok) {
//                 throw new Error("Ошибка при загрузке данных пользователя");
//             }
//             const user = await response.json();
//             const isProductInFavourites = user.favourites.some(fav => fav.id === product.id);
//             if (isProductInFavourites) {
//                 toast.error("Этот продукт уже в избранном.");
//                 return;
//             }

//             user.favourites.push(product);
//             const updateResponse = await fetch(`http://localhost:3001/users/${userId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(user),
//             });

//             if (!updateResponse.ok) {
//                 throw new Error("Ошибка при обновлении данных пользователя");
//             }

//             toast.success("Продукт добавлен в избранное!");
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     if (loading) {
//         return <div>Загрузка...</div>;
//     }
//     if (!product) {
//         return <div>Продукт не найден.</div>;
//     }

//     return (
//         <>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//             />
//             <div className="details-page">
//                 <div className="product-details">
//                     <div className="text-section">
//                         <h2>{product.name}</h2>
//                         <p>{product.category}</p>
//                         <p>Цена: {product.price} $</p>
//                         {product.title && <p className="product-title">{product.title}</p>} 
//                         <button className="favorite-btn" onClick={addToFavourites}>
//                             Добавить в избранное
//                         </button>
//                     </div>
//                     <div className="image-section">
//                         <img src={product.img} alt={product.name} className="product-img" />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
// 'use client';
// import { useState, useEffect } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useParams } from 'next/navigation'; 
// import "./detailsPage.scss";

// export default function DetailsPage() {
//     const { id } = useParams();  
//     const [product, setProduct] = useState(null); 
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!id) {
//             toast.error("Не удалось найти продукт.");
//             return;
//         }

//         const fetchProduct = async () => {
//             try {
//                 const response = await fetch(`http://localhost:3001/products/${id}`);
//                 if (!response.ok) {
//                     throw new Error("Ошибка при загрузке продукта");
//                 }
//                 const data = await response.json();
//                 setProduct(data);  
//             } catch (error) {
//                 toast.error(error.message); 
//             } finally {
//                 setLoading(false); 
//             }
//         };

//         fetchProduct(); 
//     }, [id]);

//     const addToFavourites = async () => {
//         const userId = localStorage.getItem("userId");

//         if (!userId) {
//             toast.error("Пожалуйста, войдите в аккаунт.");
//             return;
//         }

//         try {
//             const response = await fetch(`http://localhost:3001/users/${userId}`);
//             if (!response.ok) {
//                 throw new Error("Ошибка при загрузке данных пользователя");
//             }
//             const user = await response.json();
//             const isProductInFavourites = user.favourites.some(fav => fav.id === product.id);
//             if (isProductInFavourites) {
//                 toast.error("Этот продукт уже в избранном.");
//                 return;
//             }

//             user.favourites.push(product);
//             const updateResponse = await fetch(`http://localhost:3001/users/${userId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(user),
//             });

//             if (!updateResponse.ok) {
//                 throw new Error("Ошибка при обновлении данных пользователя");
//             }

//             toast.success("Продукт добавлен в избранное!");
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const addRating = async (rating) => {
//         try {
//             const updatedRatings = [...product.ratings, rating];
//             const updatedProduct = { ...product, ratings: updatedRatings };
//             const response = await fetch(`http://localhost:3001/products/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(updatedProduct),
//             });

//             if (!response.ok) {
//                 throw new Error("Ошибка при добавлении оценки");
//             }

//             setProduct(updatedProduct);
//             toast.success("Спасибо за вашу оценку!");
//         } catch (error) {
//             toast.error(error.message);
//         }
//     };

//     const calculateAverageRating = () => {
//         if (!product?.ratings.length) return 0;
//         const total = product.ratings.reduce((sum, rating) => sum + rating, 0);
//         return (total / product.ratings.length).toFixed(1);
//     };

//     if (loading) {
//         return <div>Загрузка...</div>;
//     }
//     if (!product) {
//         return <div>Продукт не найден.</div>;
//     }

//     return (
//         <>
//             <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//             />
//             <div className="details-page">
//                 <div className="product-details">
//                     <div className="text-section">
//                         <h2>{product.name}</h2>
//                         <p>{product.category}</p>
//                         <p>Цена: {product.price} $</p>
//                         {product.title && <p className="product-title">{product.title}</p>} 

//                         <div className="rating-section">
//                             <h4>Оцените продукт:</h4>
//                             <div className="stars">
//                                 {[1, 2, 3, 4, 5].map((value) => (
//                                     <span
//                                         key={value}
//                                         onClick={() => addRating(value)}
//                                         style={{
//                                             cursor: 'pointer',
//                                             color: value <= calculateAverageRating() ? 'gold' : '#ccc',
//                                             fontSize: '1.5rem',
//                                         }}
//                                     >
//                                         ★
//                                     </span>
//                                 ))}
//                             </div>
//                             <p>Средняя оценка: {calculateAverageRating()} / 5</p>
//                         </div>

//                         <button className="favorite-btn" onClick={addToFavourites}>
//                             Добавить в избранное
//                         </button>
//                     </div>
//                     <div className="image-section">
//                         <img src={product.img} alt={product.name} className="product-img" />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

'use client';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'next/navigation'; 
import "./detailsPage.scss";

export default function DetailsPage() {
    const { id } = useParams();  
    const [product, setProduct] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedRating, setSelectedRating] = useState(null); 

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
            setSelectedRating(0)
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

                        <button
                            className="rate-btn"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Оценить продукт
                        </button>
                        <button className="favorite-btn" onClick={addToFavourites}>
                            Добавить в избранное
                        </button>
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
