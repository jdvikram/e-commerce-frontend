// ProductList.js

import React, { useEffect, useState } from 'react';
import { API_URL, PRODUCTS_ENDPOINT } from './Constants';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AuthService from './AuthService';
import { addToCart } from './cart';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const p_url = `${API_URL}${PRODUCTS_ENDPOINT}`
            try {
                await AuthService.token();
                const token = AuthService.getToken();
                const response = await axios.get(p_url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                handleError(error, p_url);
            }
        };

        fetchProducts();
    }, []);

    const handleError = async (error, p_url) => {
        if (error.response && error.response.status === 401) {
            try {
                await AuthService.refreshToken();
                const newToken = AuthService.getToken();
                const response = await axios.get(p_url, {
                    headers: {
                        Authorization: `Bearer ${newToken}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                setError('Failed to refresh token');
            }
        } else {
            setError('Failed to fetch products');
        }
    };

    const settings = {
        dots: true,                 // Show navigation dots
        infinite: true,             // Infinite loop
        speed: 500,                 // Transition speed (ms)
        slidesToShow: 3,            // Number of slides to show at once
        slidesToScroll: 1,          // Number of slides to scroll at a time
        centerMode: true,           // Center mode (shows partial slides on the sides)
        centerPadding: '50px',      // Padding for center mode
        autoplay: true,             // Auto play slides
        autoplaySpeed: 3000,        // Auto play speed (ms)
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,      // Adjust slidesToShow for smaller screens
                    centerMode: false,   // Disable center mode on smaller screens
                },
            },
        ],
    };
  
  
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (products.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <Slider {...settings}>
            {products.map((product, index) => (
                <div key={index} className="col-md-4" productid={product.id}>
                    <div className="product-card">
                        <div className="product-image" style={{ backgroundImage: `url('${product.image_url}')` }}></div>
                        <div className="product-details">
                            <h5 className="mb-0">{product.name}</h5>
                            <p className="text-muted" categoryid={product.category_id}>Category: {product.category_name}</p>
                            <p>{product.description}</p>
                            <p className="font-weight-bold">&#8377;{product.price}</p>
                            <button className="btn btn-primary btn-block" onClick={() => addToCart(product)} >Add to Cart</button>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default ProductList;
