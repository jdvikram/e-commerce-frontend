import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AuthService from './AuthService';
import { addToCart } from './cart';
import { API_URL, PRODUCTS_ENDPOINT } from './Constants';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const p_url = `${API_URL}${PRODUCTS_ENDPOINT}`;
            try {
                await AuthService.token();
                const token = AuthService.getToken();
                const response = await axios.get(p_url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
                        Authorization: `Bearer ${newToken}`,
                    },
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
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '50px',
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: false,
                },
            },
        ],
        // Custom styles for slick slider
        customPaging: function (i) {
            return (
                <div
                    style={{
                        width: '30px',
                        height: '5px',
                        background: '#bbb',
                        borderRadius: '10px',
                    }}
                ></div>
            );
        },
        appendDots: (dots) => (
            <div
                style={{
                    bottom: '-25px',
                    textAlign: 'center',
                }}
            >
                <ul style={{ margin: '0px' }}> {dots} </ul>
            </div>
        ),
    };

    const productCardStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        backgroundColor: '#fff',
        marginBottom: '20px', // Add margin to bottom
        border: '1px solid #ddd', // Add border
    };

    const productImageStyle = {
        width: '100%',
        height: '200px',
        backgroundSize: 'cover',
        borderRadius: '10px 10px 0 0',
    };

    const productDetailsStyle = {
        padding: '10px',
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
                <div key={index} className="product-card" style={productCardStyle}>
                    <div className="product-image" style={{ ...productImageStyle, backgroundImage: `url('${product.image_url}')` }}></div>
                    <div className="product-details" style={productDetailsStyle}>
                        <h5 className="mb-0">{product.name}</h5>
                        <p className="text-muted" style={{ fontSize: '0.8rem' }}>Category: {product.category_name}</p>
                        <p style={{ fontSize: '0.9rem' }}>{product.description}</p>
                        <p className="font-weight-bold" style={{ marginBottom: '10px' }}>&#8377;{product.price}</p>
                        <button className="btn btn-primary btn-block" onClick={() => addToCart(product)} style={{
                            border: 'none',
                            padding: '10px',
                            borderRadius: '5px',
                            color: '#fff',
                            backgroundColor: '#007bff',
                            cursor: 'pointer',
                        }}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default ProductList;
