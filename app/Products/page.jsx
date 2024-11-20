
'use client';
import { useState, useEffect } from 'react';
import './products.scss';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Все' || product.category === selectedCategory;
    const price = product.price;
    const min = parseFloat(minPrice) || 0; 
    const max = parseFloat(maxPrice) || Infinity; 
    const matchesPrice = price >= min && price <= max;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const categories = ['Все'];
  products.forEach((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  return (
    <div className="products-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Поиск продуктов..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <i className="fa fa-search"></i>
      </div>
      <div className="price-filter-container">
        <button
          className="filter-button"
          onClick={() => setIsFilterOpen((prev) => !prev)}
        >
          Фильтр по ценам
        </button>
        <div className={`dropdown-menu ${isFilterOpen ? 'active' : ''}`}>
          <div className="price-input-group">
            <label className="price-label">От:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Минимум"
            />
          </div>
          <div className="price-input-group">
            <label className="price-label">До:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Максимум"
            />
          </div>
          <button className="apply-button" onClick={() => setIsFilterOpen(false)}>
            Применить
          </button>
        </div>
      </div>

      <div className="categories">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              onClick={() => router.push(`/DetailsPage/${product.id}`)}
              key={product.id}
              className="product-card"
            >
              <img src={product.img} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{t('Products.product-list-category')}: {product.category}</p>
              <p>{t('Products.product-list-price')}: ${product.price}</p>
            </div>
          ))
        ) : (
          <p className="no-products">{t('no-products')}</p>
        )}
      </div>
    </div>
  );
}
