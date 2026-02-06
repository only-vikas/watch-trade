import React, { useState } from 'react';

const ProductGallery = ({ images = [], productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleImageError = (e) => {
    e.target.src = '/assets/placeholder.png';
  };

  return (
    <div className="product-gallery">
      <div
        className={`main-image ${isZoomed ? 'zoomed' : ''}`}
        onClick={() => setIsLightboxOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsLightboxOpen(true)}
      >
        <img
          src={images[selectedImage]}
          alt={`${productName} - View ${selectedImage + 1}`}
          onError={handleImageError}
        />
        {!isZoomed && <div className="zoom-hint">Click to enlarge</div>}
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
            aria-label={`View ${index + 1}`}
          >
            <img src={image} alt={`${productName} thumbnail ${index + 1}`} onError={handleImageError} />
          </button>
        ))}
      </div>

      {isLightboxOpen && (
        <div className="lightbox" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>    
            <button className="lightbox-close" onClick={() => setIsLightboxOpen(false)} aria-label="Close">×</button>
            <div className="lightbox-image-wrapper">
              <button
                className="lightbox-prev"
                onClick={() => setSelectedImage((s) => (s === 0 ? images.length - 1 : s - 1))}
                aria-label="Previous image"
              >
                ‹
              </button>
              <img
                className="lightbox-image"
                src={images[selectedImage]}
                alt={`${productName} full view ${selectedImage + 1}`}
                onError={(e) => (e.target.src = '/assets/placeholder.png')}
              />
              <button
                className="lightbox-next"
                onClick={() => setSelectedImage((s) => (s === images.length - 1 ? 0 : s + 1))}
                aria-label="Next image"
              >
                ›
              </button>
            </div>
            <div className="lightbox-thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`lightbox-thumb ${i === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img src={img} alt={`thumb ${i + 1}`} onError={handleImageError} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;