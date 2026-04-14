import React from 'react';

const Layout = ({ children, className = '' }) => {
  return (
    <div className={`layout ${className}`}>
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default Layout;
