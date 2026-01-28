import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductGallery from '../components/ProductGallery';
import { useCart } from '../context/CartContext';
import { LUXURY_WATCHES } from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = LUXURY_WATCHES.find(p => p.id === id);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn-primary">Return to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <Link to="/shop">{product.brand}</Link>
        <span>/</span>
        <span>{product.model}</span>
      </div>

      <div className="product-detail-container">
        <div className="product-gallery-section">
          <ProductGallery images={product.images} productName={product.model} />
        </div>

        <div className="product-info-section">
          <div className="product-header">
            <h1 className="product-title">{product.brand}</h1>
            <h2 className="product-model">{product.model}</h2>
            <p className="product-collection">{product.collection} Collection</p>
          </div>

          <div className="product-price-section">
            <div className="price-display">${product.price.toLocaleString()}</div>
            {!product.inStock && (
              <div className="stock-status out-of-stock">Currently Unavailable</div>
            )}
            {product.inStock && (
              <div className="stock-status in-stock">In Stock</div>
            )}
          </div>

          <div className="product-description">
            <p>{product.description}</p>
          </div>

          {product.inStock && (
            <div className="purchase-controls">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-buttons">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <input 
                    type="number" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                  />
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn-primary add-to-cart-btn" 
                  onClick={handleAddToCart}
                >
                  {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                </button>
                <button className="btn-secondary" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>
            </div>
          )}

          {!product.inStock && (
            <div className="notify-section">
              <button className="btn-secondary">Notify When Available</button>
            </div>
          )}

          <div className="product-features">
            <h3>Key Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="product-specifications">
        <h3>Technical Specifications</h3>
        <div className="specs-grid">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="spec-item">
              <span className="spec-label">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </span>
              <span className="spec-value">
                {typeof value === 'number' ? `${value}mm` : value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
