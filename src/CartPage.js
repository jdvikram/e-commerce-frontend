import React, { useState, useEffect } from 'react';
import { fetchCartData } from './cart';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartData()
      .then(data => setCartItems(data))
      .catch(error => console.error('Error fetching cart data:', error));
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product_price * item.quantity), 0);
  };

  return (
    <div style={cartPageStyle}>
      <h2 style={headingStyle}>Cart Items</h2>
      <ul style={listStyle}>
        {cartItems.map((item, index) => (
          <li key={index} style={cartItemStyle}>
            <div style={itemDetailStyle}>Product: {item.product_name}</div>
            <div style={itemDetailStyle}>Quantity: {item.quantity}</div>
            <div style={itemDetailStyle}>Price: ₹{item.quantity * item.product_price}</div>
            <div style={itemDetailStyle}>Added Date: {new Date(item.created_date).toLocaleString()}</div>
          </li>
        ))}
      </ul>
      <div style={totalPriceStyle}>Total Price: ₹{calculateTotalPrice().toFixed(2)}</div>
    </div>
  );
};

// Styles
const cartPageStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const headingStyle = {
  fontSize: '24px',
  marginBottom: '20px',
};

const listStyle = {
  listStyleType: 'none',
  padding: '0',
};

const cartItemStyle = {
  marginBottom: '20px',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
};

const itemDetailStyle = {
  marginBottom: '5px',
};

const totalPriceStyle = {
  marginTop: '20px',
  fontSize: '18px',
  fontWeight: 'bold',
};

export default CartPage;
