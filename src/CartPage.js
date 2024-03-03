// CartPage.js

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

  //   return (
  //     <div>
  //       <h1>Cart</h1>
  //       <ul>
  //         {cartItems.map(item => (
  //             <li key={item.id}>{item.product_name} - Quantity: {item.quantity} - Price: {item.quantity*item.product_price}</li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <div>Product: {item.product_name}</div>
            <div>Quantity: {item.quantity}</div>
            <div>Price: {item.quantity * item.product_price}</div>
            <div>Added Date: {new Date(item.created_date).toLocaleString()}</div>
          </li>
        ))}
      </ul>
      <div>Total Price: ₹{calculateTotalPrice().toFixed(2)}</div>
    </div>
  );
};

export default CartPage;