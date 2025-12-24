import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container flex justify-between items-center">
        <small>© {new Date().getFullYear()} Ocean Audiobooks</small>
        <small>Built with React</small>
      </div>
    </footer>
  );
};

export default Footer;
