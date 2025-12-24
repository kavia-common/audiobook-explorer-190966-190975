import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../api/client';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const CheckoutPage = () => {
  const { state, clear } = useCart();
  const { addPurchase, showToast } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', payment: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required';
    if (!form.payment.trim()) e.payment = 'Payment placeholder required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await apiPost('/checkout', {
        user: { name: form.name, email: form.email },
        cart: { items: state.items },
      });
      addPurchase(state.items);
      clear();
      showToast('Order confirmed!');
      navigate('/purchases', { state: { orderId: res.orderId } });
    } catch (e) {
      showToast('Checkout failed, please try again');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <form onSubmit={submit} className="surface p-4" noValidate>
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <label htmlFor="name"><strong>Name</strong></label>
            <input
              id="name"
              className="input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'err-name' : undefined}
            />
            {errors.name && <div id="err-name" style={{ color: 'var(--color-error)' }}>{errors.name}</div>}
          </div>
          <div>
            <label htmlFor="email"><strong>Email</strong></label>
            <input
              id="email"
              type="email"
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'err-email' : undefined}
            />
            {errors.email && <div id="err-email" style={{ color: 'var(--color-error)' }}>{errors.email}</div>}
          </div>
        </div>
        <div className="mt-3">
          <label htmlFor="payment"><strong>Payment</strong> <small style={{ color: '#6b7280' }}>(placeholder)</small></label>
          <input
            id="payment"
            className="input"
            placeholder="Card ending in 4242"
            value={form.payment}
            onChange={(e) => setForm({ ...form, payment: e.target.value })}
            aria-invalid={!!errors.payment}
            aria-describedby={errors.payment ? 'err-payment' : undefined}
          />
          {errors.payment && <div id="err-payment" style={{ color: 'var(--color-error)' }}>{errors.payment}</div>}
        </div>
        <div className="flex justify-between mt-4">
          <button type="button" className="btn ghost" onClick={() => navigate('/cart')}>Back to cart</button>
          <button type="submit" className="btn" disabled={submitting}>
            {submitting ? 'Processing...' : 'Place order'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
