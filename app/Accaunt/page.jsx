'use client';
import "./accaunt.scss";
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

export default function AccauntPage() {
    const [user, setUser] = useState(null);
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            toast.error("Пожалуйста, войдите в аккаунт.");
            return;
        }
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3001/users/${userId}`);
                if (!response.ok) {
                    throw new Error("Ошибка при загрузке данных пользователя");
                }
                const data = await response.json();
                setUser(data);
                setFavourites(data.favourites || []);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleDelete = async () => {
        if (!selectedProduct) return;
        const updatedFavourites = favourites.filter(product => product.id !== selectedProduct.id);
        setFavourites(updatedFavourites);
        const userId = localStorage.getItem("userId");
        try {
            const response = await fetch(`http://localhost:3001/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    favourites: updatedFavourites,
                }),
            });
            if (!response.ok) {
                throw new Error("Ошибка при обновлении данных пользователя");
            }
            toast.success("Продукт удален из избранного");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setShowModal(false);
            setSelectedProduct(null);
        }
    };
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Logged Out!",
                text: "Your have logged out successfully.",
                icon: "success"
              });
              localStorage.removeItem("userId");
                setTimeout(()=>{
                    window.location.href = "/";
                },2000)
                setTimeout(()=>{
                  window.location.reload();
                },3000)
            }
          });

    }
    const handleModalClose = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <>
            <ToastContainer />
            <div className="favourites">
                <h1>Аккаунт</h1>
                {user && (
                    <div className="user-info">
                        <div className="user-avatar">
                            <img src={user.avatar || '/images/userProfile.png'} alt="Avatar" />
                        </div>
                        <div className="user-details">
                            <p className="user-email">{user.email} </p><p onClick={handleLogout}><img className="logout" width={20} src="/images/logout.png" alt="" />   Log Out!</p>
                        </div>
                    </div>
                )}

                {favourites.length === 0 ? (
                    <p>В избранном пока нет продуктов.</p>
                ) : (
                    <div className="favourites-list">
                        {favourites.map(product => (
                            <div
                                onClick={() => handleCardClick(product)} 
                                className="favourite-card" 
                                key={product.id}
                            >
                                <img src={product.img} alt={product.name} className="favourite-img" />
                                <div className="favourite-info">
                                    <h2>{product.name}</h2>
                                    <p className="category">{product.category}</p>
                                    <p className="price">{product.price} $</p>
                                    {product.title && <p className="title">{product.title}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-acc">
                        <h3>Вы уверены, что хотите удалить этот продукт из избранного?</h3>
                        <div className="modal-buttons">
                            <button onClick={handleDelete} className="btn-delete">Удалить</button>
                            <button onClick={handleModalClose} className="btn-cancel">Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
