
'use client';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useRouter } from 'next/navigation';
import "./detailsPage.scss";
import { MdFavoriteBorder } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export default function DetailsPage() {
    const router = useRouter();
    const { id } = useParams()
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(null);
    const [isFavourite, setIsFavourite] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    const [commentModal, setCommentModalOpen] = useState(false);
    const [comments, setComments] = useState([]);
    const { t } = useTranslation();
    const [newComment, setNewComment] = useState(
        {
            email: "",
            text: ""
        }
    );
    useEffect(() => {
        if (!id) return;

        let isMounted = true;

        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3001/products/${id}`);
                if (!response.ok) {
                    throw new Error(t("DetailsPage.errorProductLoad"));
                }
                const data = await response.json();
                if (isMounted) {
                    setProduct(data);
                    setComments(data.comments || []);
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
    const handleCancelComment = () => {
        setNewComment({ email: "", text: "" });
        setCommentModalOpen(false); 
    };
    const checkFavourite = async () => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            toast.error(t("DetailsPage.accaunt"));
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/users/${userId}`);
            if (!response.ok) {
                throw new Error(t("DetailsPage.errorUserLoad"));
            }
            const data = await response.json();
            setUserEmail(data.email);
            const isProductInFavourites = data.favourites.some(fav => fav.id === product.id);
            setIsFavourite(isProductInFavourites);
        } catch (error) {
            toast.error(error.message);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewComment({
            ...newComment,
            [name]: value,
        });
    };
    const addRating = async () => {
        if (!selectedRating) {
            toast.error(t("DetailsPage.errorRating"));
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
                throw new Error(t("DetailsPage.errorRating"));
            }

            setProduct(updatedProduct);
            setIsModalOpen(false);
            toast.success(t("DetailsPage.thankRating"));
            setSelectedRating(0);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const addToFavourites = async () => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            toast.error(t("DetailsPage.accaunt"));
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/users/${userId}`);
            if (!response.ok) {
                throw new Error(t("DetailsPage.errorUserLoad"));
            }
            const user = await response.json();
            const isProductInFavourites = user.favourites.some(fav => fav.id === product.id);
            if (isProductInFavourites) {
                toast.error(t("DetailsPage.errorAlreadyFavourite"));
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
                throw new Error(t("DetailsPage.errorUpdateUser"));
            }

            toast.success(t("DetailsPage.addedToFavourite"));
            setIsFavourite(true);
        } catch (error) {
            toast.error(error.message);
        }
    };
    const handleAddComment = async () => {
        if (!newComment.text) {
            toast.error(t("DetailsPage.errorEmptyComment"));
            return;
        }

        try {
            const updatedComments = [...comments, newComment];
            const updatedProduct = { ...product, comments: updatedComments };

            const response = await fetch(`http://localhost:3001/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error(t("DetailsPage.errorAddComment"));
            }

            setComments(updatedComments);
            setNewComment({ email: userEmail, text: "" });
            setCommentModalOpen(false);
            toast.success(t("DetailsPage.thankComment"));
        } catch (error) {
            toast.error(error.message);
        }
    };

    const calculateAverageRating = () => {
        if (!product || !product.ratings || product.ratings.length === 0) return 0;
        const total = product.ratings.reduce((sum, rating) => sum + rating, 0);
        return (total / product.ratings.length).toFixed(1);
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!product) {
        return <div>{t("DetailsPage.notFound")}</div>;
    }
    function handleInputValue(){
        try{
            if(userEmail){
                return userEmail;
            }
        } catch (error) {
            return newComment.email
        }
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
                        <p>{t("DetailsPage.price")} {product.price} $</p>
                        <p>{t("DetailsPage.averageRating")} {calculateAverageRating()} / 5 ⭐</p>
                        <div className='details-button-section'>
                            <button
                                className="rate-btn"
                                onClick={() => setIsModalOpen(true)}
                            >
                                {t("DetailsPage.rateProduct")}
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
                                {t("DetailsPage.order")}
                            </button>
                        </div>
                    </div>
                    <div className="image-section">
                        <img src={product.img} alt={product.name} className="product-img" />
                    </div>
                </div>

                <div className="comments-section">
                    <h3> <span className='comments-count'>{comments.length}</span> {t("DetailsPage.comments")} <div onClick={() => setCommentModalOpen(!commentModal)} className='add-comment'>+</div></h3>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={index} className="comment">
                                <p className="comment-email">{comment.email}:</p>
                                <p className="comment-text">{comment.text}</p>
                            </div>
                        ))
                    ) : (
                        <p>{t("DetailsPage.noComments")}</p>
                    )}
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
            {commentModal && (
                <div className="modal-overlay">
                    <div className="modal-window">
                        <h2>Заполните форму</h2>
                        <input value={handleInputValue()}  onChange={(e) => { handleChange(e) }} type="text" name="email" placeholder="Введите имя" className="modal-input" />
                        <input onChange={(e) => { handleChange(e) }} type="text" name='text' placeholder="Введите текст" className="modal-input" />
                        <div className="modal-buttons">
                            <button onClick={() => handleAddComment()} className="modal-button confirm">Подтвердить</button>
                            <button onClick={() =>handleCancelComment()} className="modal-button cancel">Отменить</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
} 