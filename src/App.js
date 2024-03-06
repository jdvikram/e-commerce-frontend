import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderWithCart from './Header';
import Footer from './Footer';
import ProductList from './ProductList';
import CartPage from './CartPage'; // Make sure the import path is correct
import './App.css';

import Header2 from './playground';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header2 />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="slick-carousel">
                <Routes>
                  <Route exact path="/" element={<ProductList></ProductList>} />
                  <Route path="/cart" element={<CartPage></CartPage>} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

const Test = () => {
  return (
    <Header2 />
  );
};

export default App;
