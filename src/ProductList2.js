import React, { useEffect, useState } from 'react';
import { API_URL, PRODUCTS_ENDPOINT } from './Constants';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AuthService from './AuthService'; // Import AuthService
import ProductList from './ProductList';
import eventBus from './eventBus';

const ProductList2 = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                await AuthService.token();
                const token = AuthService.getToken();
                console.log(token);
                const response = await axios.get(`${API_URL}${PRODUCTS_ENDPOINT}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                let data = response.data;
                let items = [];
                for (let i = 0; i < data.length; i += 3) {
                    let inner_item = [];
                    for (let j = i; j < i + 3 && j < data.length; j++) {
                        inner_item.push(
                            <Card
                                ID={data[j].id}
                                name={data[j].name}
                                description={data[j].description}
                                url={data[j].image_url}
                                price={data[j].price}
                            />
                        );
                    }
                    items.push(
                        <div className="row" key={i}>
                            {inner_item}
                        </div>
                    );
                }
                setCategories(items);
                console.log("categories", categories);
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
                        setCategories(response.data);
                    } catch (error) {
                        setError('Failed to refresh token');
                    }
                } else {
                    setError('Failed to fetch products');
                }
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="container">
            {categories}
        </div>
    );
};

class Card extends React.Component {
    constructor(props) {
        super(props); // Call the constructor of the base class (Component) with props
        // Now you can access props using this.props
    }
    addData = () => {
        let count = 0
        if (localStorage["count"]) {
            count = localStorage["count"];
        }
        localStorage["count"] = Number(count) + 1;
        localStorage.setItem(count, this.props.name + "#" + this.props.url + "#" + this.props.ID)
        console.log(localStorage)
        eventBus.publish("dataAdded")
    };
    render() {
        return (

            <div class="card" >
                <img src={this.props.url} class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{this.props.name}</h5>
                    <p class="card-text">{this.props.description}</p>
                    <h5 class="card-text">Price: {this.props.price} $</h5>
                    <button class="btn btn-primary" onClick={this.addData}>ADD TO CART</button>
                </div>
            </div >
        );
    }
}

export default ProductList2;