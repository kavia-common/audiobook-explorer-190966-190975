import React from 'react';
import { Link } from 'react-router-dom';

const AudiobookCard = ({ book, onAddToCart }) => {
  return (
    <div className="surface card-hover" style={{ padding: 12 }}>
      <Link to={`/book/${book.id}`} aria-label={`View details for ${book.title}`}>
        <img
          src={book.cover}
          alt={`${book.title} cover`}
          width="100%"
          height="220"
          style={{ borderRadius: 12, objectFit: 'cover' }}
        />
      </Link>
      <div className="mt-3">
        <div className="flex justify-between items-center">
          <strong style={{ fontSize: 16 }}>{book.title}</strong>
          <span className="badge">{book.category}</span>
        </div>
        <div style={{ color: '#6b7280', marginTop: 4 }}>{book.author}</div>
        <div className="flex justify-between items-center mt-3">
          <div style={{ fontWeight: 700 }}>${book.price?.toFixed(2)}</div>
          <button className="btn" onClick={() => onAddToCart?.(book)} aria-label={`Add ${book.title} to cart`}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudiobookCard;
