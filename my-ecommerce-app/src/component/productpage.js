import React, { useState, useEffect } from 'react';
import Header from './Header';
import ProductList from './ProductList';
import Cart from './Cart';
import Footer from './Footer';

const Productpage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [reload, setReload] = useState(true);
  useEffect(() => {
    const data = localStorage.getItem('cartItems');
    const storedCartItems = data ? JSON.parse(data) : [];
    setCartItems(storedCartItems);
    setReload(true)
  }, []);

  useEffect(() => {
    if (cartItems.length <= 0 && reload) {
      const data = localStorage.getItem('cartItems');
      const storedCartItems = data ? JSON.parse(data) : [];
      setReload(false)
      setCartItems(storedCartItems);
      return
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems, reload]);

  const handleAddToCart = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...exist, quantity: exist.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };


  const handleRemoveItem = (id) => {
    cartItems.forEach((item, index) => {
      if (item.id === id) {
        item.quantity--;
        if (item.quantity === 0) {
          cartItems.splice(index, 1);
        }
      }
    });
    setCartItems([...cartItems])
  };


  return (
    <div className="product-page">
      <Header />
      <table className="shop-interface">
        <tr>
          <td className='products'><ProductList onAddToCart={handleAddToCart} /></td>
          <td className='cart' style={{ verticalAlign: 'top' }}><h2 className='cart-header'>Shopping Cart</h2><Cart cartItems={cartItems}
            onRemove={handleRemoveItem} /></td>
        </tr>
      </table>
      <Footer />
    </div>
  );
};

export default Productpage;