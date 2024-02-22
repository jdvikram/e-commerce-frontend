import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProductList2 from './ProductList2';
import Sidebar from './sidebar'
import CheckoutCart from './CheckoutCart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList2 />} />
      </Routes>
    </Router>
  );
};

const App1 = () => {
  return (

    <div class="app-content content">
      <div class="content-area-wrapper">
        <Header />
        <Sidebar />
        <Router>
          <Routes>
            <Route path="/checkout" element={<CheckoutCart></CheckoutCart>} />
            <Route path="/" element={<ProductList2 />} />

          </Routes>
        </Router>

        <Footer />
      </div>
    </div>

  );
};

export default App1;
