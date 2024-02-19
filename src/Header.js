// Header.js
import React, { useEffect, useState } from 'react';
import { API_URL, CATEGORIS_ENDPOINT } from './Constants';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AuthService from './AuthService'; // Import AuthService

const Header = () => {
  return (
    <header>
      <h1>Welcome to E-Shopping</h1>
    </header>
  );
};

//==================================================================================================================

class Newheader extends React.Component {

  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <Dropdown />

            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>

        </div>
      </nav >

    );

  };

};

const Dropdown = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await AuthService.token();
        const token = AuthService.getToken();
        console.log(token);
        const response = await axios.get(`${API_URL}${CATEGORIS_ENDPOINT}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCategories(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token is invalid or expired, try refreshing token
          try {
            await AuthService.refreshToken();
            // Retry fetching products with the new token
            const newToken = AuthService.getToken();
            const response = await axios.get(`${API_URL}${CATEGORIS_ENDPOINT}`, {
              headers: {
                Authorization: `Bearer ${newToken}`
              }
            });
            setCategories(response.data);
          } catch (error) {
            setError('Failed to refresh token');
          }
        } else {
          setError('Failed to fetch categories');
        }
      }
    };

    fetchCategories();
  }, []);

  return (
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Select Category
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        {categories.map((category, index) => (
          <a class="dropdown-item" href="#">{category.name}</a>

        ))}
      </div>
    </li>

  );

}

export default Newheader;