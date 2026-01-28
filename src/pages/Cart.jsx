import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <h2>Your cart is empty</h2>
          <p>Discover our collection of luxury timepieces</p>
          <Link to="/shop" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.images[0]} alt={item.model} />
              </div>
              
              <div className="cart-item-details">
                <h3>{item.brand}</h3>
                <p className="cart-item-model">{item.model}</p>
                <p className="cart-item-collection">{item.collection}</p>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>

              <div className="cart-item-quantity">
                <label>Quantity</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-price">
                <div className="unit-price">${item.price.toLocaleString()}</div>
                <div className="total-price">
                  ${(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          
          <div className="summary-line">
            <span>Subtotal</span>
            <span>${getCartTotal().toLocaleString()}</span>
          </div>
          
          <div className="summary-line">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          
          <div className="summary-line">
            <span>Tax</span>
            <span>Calculated at checkout</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-line total">
            <span>Total</span>
            <span>${getCartTotal().toLocaleString()}</span>
          </div>

          <button 
            className="btn-primary checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>

          <Link to="/shop" className="continue-shopping">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
