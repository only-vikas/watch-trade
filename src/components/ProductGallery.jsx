import React, { useState } from 'react';

const ProductGallery = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="product-gallery">
      <div 
        className={`main-image ${isZoomed ? 'zoomed' : ''}`}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img src={images[selectedImage]} alt={`${productName} - View ${selectedImage + 1}`} />
        {!isZoomed && <div className="zoom-hint">Click to zoom</div>}
      </div>
      
      <div className="thumbnail-strip">
        {images.map((image, index) => (
          <button
            key={index}
            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
            onClick={() => {
              setSelectedImage(index);
              setIsZoomed(false);
            }}
          >
            <img src={image} alt={`${productName} thumbnail ${index + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
