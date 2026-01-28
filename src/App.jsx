import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import TradingDashboard from './pages/TradingDashboard';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import './App.css';

const Navigation = () => {
  const location = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const isShop = location.pathname.startsWith('/shop') || 
                 location.pathname.startsWith('/cart') || 
                 location.pathname.startsWith('/checkout') ||
                 location.pathname.startsWith('/order-confirmation');

  return (
    <nav className={`main-nav ${isShop ? 'shop-nav' : 'trading-nav'}`}>
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand-link">
            <span className="brand-icon">⌚</span>
            <span className="brand-name">TIMEPIECE</span>
          </Link>
        </div>

        <div className="nav-links">
          <Link 
            to="/trading" 
            className={`nav-link ${location.pathname === '/trading' ? 'active' : ''}`}
          >
            Trading
          </Link>
          <Link 
            to="/shop" 
            className={`nav-link ${location.pathname.startsWith('/shop') ? 'active' : ''}`}
          >
            Shop
          </Link>
          <Link 
            to="/cart" 
            className={`nav-link cart-link ${location.pathname === '/cart' ? 'active' : ''}`}
          >
            Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-hero">
        <h1 className="landing-title">Welcome to Timepiece</h1>
        <p className="landing-subtitle">Trade & Shop Luxury Watches</p>
        
        <div className="landing-cards">
          <Link to="/trading" className="landing-card trading-card">
            <div className="card-icon">📈</div>
            <h2>Trading Simulator</h2>
            <p>Experience the thrill of watch trading with real-time market dynamics and news-driven price movements</p>
            <span className="card-cta">Start Trading →</span>
          </Link>

          <Link to="/shop" className="landing-card shop-card">
            <div className="card-icon">✨</div>
            <h2>Luxury Shop</h2>
            <p>Browse our curated collection of exceptional timepieces from the world's finest manufacturers</p>
            <span className="card-cta">Explore Collection →</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="app">
          <Navigation />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/trading" element={<TradingDashboard />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
            </Routes>
          </main>

          <footer className="app-footer">
            <p>© 2026 Timepiece. Luxury watch trading & retail experience.</p>
          </footer>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
