
'use client';
import { useState, useEffect } from 'react';
import './products.scss';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchProducts();
  }, []);
  const handleOrderClick = (id) => {
    if (router) {
        router.push(`/DetailsPage/${id}`);
    }
};
  const categories = ['Все'];
  products.forEach((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === 'Все' || product.category === selectedCategory)
  );

  return (
    <div className="products-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Поиск продуктов..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategory === category ? 'active' : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div onClick={() => handleOrderClick(product.id)} key={product.id} className="product-card">
              <img src={product.img} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{t('product-list-category')}: {product.category}</p>
              <p>{t('product-list-price')}: ${product.price}</p>
            </div>
          ))
        ) : (
          <p className="no-products">{t('no-products')}</p>
        )}
      </div>
    </div>
  );
}
