import React from 'react';
import { Link } from 'react-router-dom';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { state } = useCart();
  const hasItems = state.items.length > 0;

  return (
    <div className="container">
      <h1>Cart</h1>
      <CartSummary />
      <div className="flex justify-between mt-3">
        <Link to="/" className="btn ghost">Continue browsing</Link>
        <Link to="/checkout" className={`btn ${!hasItems ? 'ghost' : ''}`} aria-disabled={!hasItems}>
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
