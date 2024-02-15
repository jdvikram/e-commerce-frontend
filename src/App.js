import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProductList from './ProductList';

const App = () => {
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <ProductList />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
