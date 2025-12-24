import React from 'react';
import { useCart } from '../../context/CartContext';

const CartSummary = () => {
  const { state, remove } = useCart();
  const total = state.items.reduce((acc, it) => acc + (it.price || 0) * (it.qty || 1), 0);

  if (!state.items.length) {
    return <div className="surface p-4">Your cart is empty.</div>;
  }

  return (
    <div className="surface p-4">
      <ul className="flex-col gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {state.items.map((it) => (
          <li key={it.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={it.cover} alt="" width="56" height="56" style={{ borderRadius: 8, objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 700 }}>{it.title}</div>
                <small style={{ color: '#6b7280' }}>{it.author}</small>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div>${(it.price || 0).toFixed(2)}</div>
              <button className="btn error" onClick={() => remove(it.id)} aria-label={`Remove ${it.title} from cart`}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <strong>Total</strong>
        <strong>${total.toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default CartSummary;
