import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ProductList2 from './ProductList2';

const App = () => {
  return (
    <div>
      <Header />

      <ProductList2 />

      <Footer />
    </div>
  );
};

class Card1 extends React.Component {
  render() {
    return (<p>{this.props.name}</p>)
  }
};

const App1 = () => {
  return (
    <div class="app-content content">
      <div class="content-area-wrapper">
        <Header />
        <div class="sidebar-right">
          <div class="sidebar">
            <Card1 name="Some Thing" />
          </div>
        </div>
        <ProductList2 />

        <Footer />
      </div>
    </div>
  );
};

export default App1;
