.product-detail-container {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;
  align-items: start;
  margin: 32px 0;
}

.product-gallery {
  width: 100%;
}

.product-gallery .main-image {
  cursor: zoom-in;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #e6e6e6;
  padding: 16px;
  min-height: 420px;
}

.product-gallery .main-image img {
  max-width: 100%;
  max-height: 620px;
  object-fit: contain;
}

.thumbnail-strip {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  overflow-x: auto;
}

.thumbnail {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.thumbnail img {
  width: 96px;
  height: 72px;
  object-fit: cover;
  border: 1px solid #ddd;
}

.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-content {
  width: 90%;
  max-width: 1200px;
  background: #fff;
  padding: 12px;
  position: relative;
  border-radius: 6px;
}

.lightbox-close {
  position: absolute;
  right: 12px;
  top: 6px;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
}

.lightbox-image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image {
  max-width: 85%;
  max-height: 80vh;
  object-fit: contain;
}

.lightbox-prev,
.lightbox-next {
  background: none;
  border: none;
  font-size: 36px;
  padding: 0 14px;
  cursor: pointer;
}

.product-info-section {
  position: relative;
}

.info-panel {
  background: #fff;
  border: 1px solid #e6e6e6;
  padding: 16px;
  border-radius: 6px;
  position: sticky;
  top: 24px;
}

.features-grid-section {
  margin: 32px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.feature-card {
  background: #fafafa;
  border: 1px solid #eee;
  padding: 12px;
  display:flex;
  flex-direction:column;
  align-items:center;
  text-align:center;
  border-radius:6px;
}

.related-products-section {
  margin: 40px 0;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 16px;
}

.related-card img {
  width: 100%;
  height: 160px;
  object-fit: contain;
  background: #fff;
  border: 1px solid #eee;
  padding: 12px;
  border-radius: 6px;
}

.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.spec-item {
  background: #fff;
  border: 1px solid #eee;
  padding: 10px;
  border-radius: 4px;
}