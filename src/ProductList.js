// ProductList.js

import React, { useEffect, useState } from 'react';
import { API_URL, PRODUCTS_ENDPOINT } from './Constants';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AuthService from './AuthService'; // Import AuthService

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await AuthService.token();
        const token = AuthService.getToken();
        console.log(token);
        const response = await axios.get(`${API_URL}${PRODUCTS_ENDPOINT}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token is invalid or expired, try refreshing token
          try {
            await AuthService.refreshToken();
            // Retry fetching products with the new token
            const newToken = AuthService.getToken();
            const response = await axios.get(`${API_URL}${PRODUCTS_ENDPOINT}`, {
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
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '40px',
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
              <button className="btn btn-primary btn-block">Add to Cart</button>
            </div>
          </div>
        </div>
      ))}

    </Slider>

  );

};

export default ProductList;
