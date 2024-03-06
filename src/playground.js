import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link
import { fetchCartData, getTotalItemsInCart } from './cart';
import EventBus from './EventBus'; // Import the event bus

const Header2 = () => {

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

    const navigate = useNavigate(); // Initialize useNavigate hook

    // Inline styles
    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#007BFF',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
    };

    const cartButtonStyle = {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
    };

    const cartCountStyle = {
        background: '#FFC107',
        color: '#333',
        borderRadius: '50%',
        padding: '4px 8px',
        fontSize: '0.8rem',
        position: 'absolute',
        top: '-8px',
        right: '-8px',
    };

    return (
        <header style={headerStyle}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link> {/* Add home button */}
            <h1>My Shop</h1>
            <button
                style={cartButtonStyle}
                onMouseOver={(e) => (e.target.style.color = '#FFC107')}
                onMouseOut={(e) => (e.target.style.color = 'white')}
                onClick={() => navigate('/cart')} // Add onClick event to navigate
            >
                <ShoppingCart size={24} />
                <span style={cartCountStyle}>{getTotalItemsInCart(cartItems)}</span>
            </button>
        </header>
    );
};

export default Header2;
