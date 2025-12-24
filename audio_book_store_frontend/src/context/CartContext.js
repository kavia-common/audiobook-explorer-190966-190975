import React, { createContext, useContext, useReducer } from 'react';

// Cart reducer
function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exists = state.items.find((i) => i.id === action.item.id);
      if (exists) return state;
      return { ...state, items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case 'REMOVE': {
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    }
    case 'CLEAR': {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // PUBLIC_INTERFACE
  const add = (item) => dispatch({ type: 'ADD', item });
  // PUBLIC_INTERFACE
  const remove = (id) => dispatch({ type: 'REMOVE', id });
  // PUBLIC_INTERFACE
  const clear = () => dispatch({ type: 'CLEAR' });

  const value = { state, add, remove, clear };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// PUBLIC_INTERFACE
export const useCart = () => {
  /** Hook to access cart state and actions. */
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
