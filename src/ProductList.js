import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YourComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get token
        const tokenResponse = await axios.post('http://127.0.0.1:8000/token/', {
          username: 'admin',
          password: 'admin'
        });
        console.log(tokenResponse)
        const token = tokenResponse.data.access; // Assuming token is stored in 'access' field

        // Fetch products using token
        const productsResponse = await axios.get('http://127.0.0.1:8000/product/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setProducts(productsResponse.data); // Assuming products data is an array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

    return (
        <div>
        <h1>Products</h1>
        <ul>
            {products.map(product => (
            <li key={product.id}>
                <div>
                <img src={product.image_url} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Stock Quantity: {product.stock_quantity}</p>
                </div>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default YourComponent;
