import React from 'react';
import AudiobookCard from './AudiobookCard';

const AudiobookGrid = ({ books = [], onAddToCart }) => {
  if (!books.length) {
    return <div className="surface p-4">No audiobooks found.</div>;
  }
  return (
    <div className="grid cards">
      {books.map((b) => (
        <AudiobookCard key={b.id} book={b} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default AudiobookGrid;
