import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/shop/${product.id}`} className="product-card">
      <div className="product-card-image">
        <img src={product.images[0]} alt={`${product.brand} ${product.model}`} />
        {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}
      </div>
      
      <div className="product-card-content">
        <div className="product-brand">{product.brand}</div>
        <h3 className="product-name">{product.model}</h3>
        <p className="product-collection">{product.collection}</p>
        
        <div className="product-card-footer">
          <span className="product-price">${product.price.toLocaleString()}</span>
          <span className="view-details">View Details →</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
