import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { state } = useCart();
  const count = state.items.reduce((acc, it) => acc + (it.qty || 1), 0);

  return (
    <header className="navbar">
      <div className="container flex justify-between items-center p-3">
        <Link to="/" className="flex items-center gap-3" aria-label="Audiobook Store Home">
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(249,250,251,1))',
            border: '1px solid rgba(37,99,235,0.25)'
          }} />
          <strong style={{ fontSize: 20 }}>Ocean Audiobooks</strong>
        </Link>
        <nav className="flex items-center gap-3" aria-label="Main">
          <NavLink to="/" className="btn ghost" aria-label="Browse audiobooks">Browse</NavLink>
          <NavLink to="/purchases" className="btn ghost" aria-label="View purchases">Purchases</NavLink>
          <NavLink to="/cart" className="btn secondary" aria-label="View cart">
            Cart {count > 0 && <span className="badge" aria-label={`Items in cart: ${count}`}>{count}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
