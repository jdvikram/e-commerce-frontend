import axios from 'axios';
import { API_URL, CART_ENDPOINT } from './Constants';
import AuthService from './AuthService';
import EventBus from './EventBus';

export const fetchCartData = async () => {
    try {
        await AuthService.token();
        const token = AuthService.getToken();
        const response = await axios.get(`${API_URL}${CART_ENDPOINT}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const sortedItems = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return sortedItems;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            try {
                await AuthService.refreshToken();
                const newToken = AuthService.getToken();
                const response = await axios.get(`${API_URL}${CART_ENDPOINT}`, {
                    headers: {
                        Authorization: `Bearer ${newToken}`
                    }
                });
                const sortedItems = response.data.sort((a, b) => new Date(a.product_created_date) - new Date(b.product_created_date));
                return sortedItems;
            } catch (error) {
                console.error('Failed to refresh token:', error);
                throw error;
            }
        } else {
            console.error('Failed to fetch cart:', error);
            throw error;
        }
    }
};

export const updateCartData = async (updatedCartItems) => {
    try {
        const response = await fetch('http://localhost:8000/product/cart_item', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCartItems)
        });
        if (!response.ok) {
            throw new Error('Failed to update cart data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating cart data:', error);
        throw error;
    }
};

export const addToCart = async (cartItems) => {
    try {
        await AuthService.token();
        const token = AuthService.getToken();
        const response = await axios.post(`${API_URL}${CART_ENDPOINT}`, {
            product: cartItems.id,
            quantity: 1
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Product added to cart:', response.data);
        EventBus.publish('cartUpdated', await fetchCartData());
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            try {
                await AuthService.refreshToken();
                const newToken = AuthService.getToken();
                const response = await axios.post(`${API_URL}${CART_ENDPOINT}`, {
                    product: cartItems.id,
                    quantity: 1
                }, {
                    headers: {
                        Authorization: `Bearer ${newToken}`
                    }
                });
                console.log('Product added to cart:', response.data);
                EventBus.publish('cartUpdated', await fetchCartData());
                return response.data;
            } catch (error) {
                console.error('Failed to refresh token:', error);
                throw error;
            }
        } else {
            console.error('Failed to fetch cart:', error);
            throw error;
        }
    }
};

export const removeFromCart = async (itemId, cartItems, setCartItems) => {
    try {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        await updateCartData(updatedCartItems);
        setCartItems(updatedCartItems);
    } catch (error) {
        console.error('Error removing item from cart:', error);
    }
};

export const getTotalItemsInCart = (cartItems) => {
    if (!Array.isArray(cartItems)) {
        return 0;
    }
    return cartItems.reduce((total, item) => total + item.quantity, 0);
};

export const handlePayNow = () => {
    // Implement payment logic here
    console.log("Payment process initiated!");
    // You can redirect to a payment gateway or perform other payment-related actions
};
