import Login from './pages/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import List from './pages/list';
import Basket from './pages/basket';
import { useState } from 'react';

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems(cartItems.filter((item) => item.id !== itemToRemove.id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="list" element={<List addToCart={addToCart}/>} />
          <Route path="basket" element={<Basket cartItems={cartItems} removeFromCart={removeFromCart} clearCart={clearCart}/>} />
      </Routes>
    </BrowserRouter>
  );
}
 