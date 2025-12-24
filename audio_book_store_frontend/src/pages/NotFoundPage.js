import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="surface p-4">
        <h1>404</h1>
        <p>We couldn't find that page.</p>
        <Link to="/" className="btn">Back to Browse</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
