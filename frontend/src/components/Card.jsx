import React from 'react';

const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${className}`}>
      {title && <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>}
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
};

export default Card;
