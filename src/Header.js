// export default Header;

import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchCartData, getTotalItemsInCart } from './cart';
import EventBus from './EventBus'; // Import the event bus
import { ShoppingCart } from 'lucide-react';
const Header = () => {
  // State to store cart items
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Subscribe to the 'cartUpdated' event
    EventBus.subscribe('cartUpdated', (data) => {
      console.log("data", data)
      setCartItems(data);
      setMessage('Product added to cart');
    });

    // Fetch cart data from the server
    fetchCartData()
      .then(data => setCartItems(data))
      .catch(error => console.error('Error fetching cart data:', error));
  }, []);

  // Calculate total items in cart when cartItems changes
  useEffect(() => {
    const totalItems = getTotalItemsInCart(cartItems);
    document.title = `E-Commerce Store (${totalItems})`;
  }, [cartItems]);

  const handleDismiss = () => {
    setMessage(null); // Clear message
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">E-Commerce Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="#products">Products</Nav.Link>
          {/* Display total items in cart */}
          <Nav.Link as={Link} to="/cart">Cart ({getTotalItemsInCart(cartItems)})</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      {message && <Alert variant="success" onClose={handleDismiss} dismissible>{message}</Alert>}
    </Navbar>
  );
};

//import React, { useState } from 'react';

const HeaderWithCart = () => {
  const [cartItems, setCartItems] = useState(0);

  // Function to simulate adding item to cart
  const addItemToCart = () => {
    setCartItems(cartItems + 1);
  };

  return (
    <div className="bg-blue-500 p-4 flex justify-between items-center">
      <h1 className="text-white font-bold text-xl">Logo</h1>
      <button
        onClick={addItemToCart}
        className="bg-blue-700 text-white flex items-center py-2 px-4 rounded hover:bg-blue-800 focus:outline-none focus:shadow-outline"
        type="button"
      >
        <ShoppingCart className="inline mr-2" /> Cart <span className="ml-2">{cartItems}</span>
      </button>
    </div>
  );
};

export default HeaderWithCart;

//export default Header;