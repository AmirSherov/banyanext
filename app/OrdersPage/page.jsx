'use client';
import React, { useState, useEffect } from 'react';
import "./OrdersPage.scss";
const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            fetch(`http://localhost:3001/users/${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    setOrders(data.orders || []);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching orders:', error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <div className="orders-page">
            <h1 className="title">Your Orders</h1>
            {loading ? (
                <div className="loading-spinner">Loading...</div>
            ) : orders.length > 0 ? (
                <div className="orders-container">
                    {orders.map((order, index) => (
                        <OrderCard key={index} order={order} />
                    ))}
                </div>
            ) : (
                <p className="no-orders">You have no orders yet.</p>
            )}
        </div>
    );
};
const OrderCard = ({ order }) => {
    const {
        productId,
        productName,
        peopleCount,
        hours,
        date,
        size,
        material,
        productImage,
    } = order;
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!isModalOpen);
    return (
        <>
            <div className="order-card">
                <div className="order-image">
                    <img onClick={()=>toggleModal()} src={productImage} alt={productName} className="product-img" />
                </div>
                <div className="order-info">
                    <h2 className="product-name">{productName}</h2>
                    <p><strong>Product ID:</strong> {productId}</p>
                    <p><strong>People Count:</strong> {peopleCount}</p>
                    <p><strong>Hours:</strong> {hours}</p>
                    <p><strong>Date:</strong> {date}</p>
                    <p><strong>Size:</strong> {size}</p>
                    <p><strong>Material:</strong> {material}</p>
                </div>
            </div>
            {isModalOpen && (
                <div className="modalFullScreen">
                    <div className="modal-content">
                        <button className="close-btn" onClick={toggleModal}>
                            &times;
                        </button>
                        <img
                            src={productImage}
                            alt={productName}
                            className="modal-img"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default OrdersPage;
