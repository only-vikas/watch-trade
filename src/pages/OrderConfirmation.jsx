import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate('/shop');
      return;
    }
    
    // Clear cart after successful order
    clearCart();
  }, [orderData, navigate, clearCart]);

  if (!orderData) {
    return null;
  }

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-icon">✓</div>
        
        <h1>Order Confirmed</h1>
        <p className="confirmation-message">
          Thank you for your purchase! Your order has been received and is being processed.
        </p>

        <div className="order-number">
          Order Number: <strong>#{orderData.orderNumber}</strong>
        </div>

        <div className="confirmation-details">
          <div className="detail-section">
            <h3>Shipping Address</h3>
            <p>
              {orderData.formData.firstName} {orderData.formData.lastName}<br />
              {orderData.formData.address}<br />
              {orderData.formData.city}, {orderData.formData.state} {orderData.formData.zipCode}<br />
              {orderData.formData.country}
            </p>
          </div>

          <div className="detail-section">
            <h3>Contact Information</h3>
            <p>
              {orderData.formData.email}<br />
              {orderData.formData.phone}
            </p>
          </div>

          <div className="detail-section">
            <h3>Order Summary</h3>
            {orderData.items.map(item => (
              <div key={item.id} className="confirmation-item">
                <span>{item.brand} {item.model} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="confirmation-total">
              <span>Total</span>
              <span>${orderData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="confirmation-info">
          <p>
            A confirmation email has been sent to <strong>{orderData.formData.email}</strong>
          </p>
          <p>
            You can track your order status using your order number.
          </p>
        </div>

        <div className="confirmation-actions">
          <Link to="/shop" className="btn-primary">
            Continue Shopping
          </Link>
          <Link to="/trading" className="btn-secondary">
            Go to Trading Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
