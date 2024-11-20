'use client';
import "./accaunt.scss";
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { useTranslation } from "react-i18next";

export default function AccauntPage() {
    const [user, setUser] = useState(null);
    const { t } = useTranslation();
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            toast.error(t("Accaunt.enter-to-accaunt"));
            return;
        }
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:3001/users/${userId}`);
                if (!response.ok) {
                    toast.error(t("Accaunt.error-loading-user-data"));
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
                toast.error(t("Accaunt.error-updating-user-data"));
            }
            toast.success(t("Accaunt.deleted-from-fav"));
        } catch (error) {
            toast.error(error.message);
        } finally {
            setShowModal(false);
            setSelectedProduct(null);
        }
    };
    const handleLogout = () => {
        Swal.fire({
            title: t("Accaunt.logout-sure"),
            text: t("Accaunt.logout-text"),
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: t("Accaunt.logout-success"),
                    text: t("Accaunt.logout"),
                    icon: "success"
                });
                localStorage.removeItem("userId");
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000)
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
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
                <h1>{t("Accaunt.accaunt")}</h1>
                {user && (
                    <div className="user-info">
                        <div className="user-avatar">
                            <img src={user.avatar || '/images/userProfile.png'} alt="Avatar" />
                        </div>
                        <div className="user-details">
                            <p className="user-email">{user.email} </p><p onClick={handleLogout}><img className="logout" width={20} src="/images/logout.png" alt="" /> {t("Accaunt.logout-btn")}</p>
                        </div>
                    </div>
                )}

                {favourites.length === 0 ? (
                    <p>{t("Accaunt.no-products-in-fav")}</p>
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
                        <h3>{t("Accaunt.delete-text")}</h3>
                        <div className="modal-buttons">
                            <button onClick={handleDelete} className="btn-delete">{t("Accaunt.delete")}</button>
                            <button onClick={handleModalClose} className="btn-cancel">{t("Accaunt.cancel")}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
