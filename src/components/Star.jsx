import React from 'react';

const Star = ({ filled, onClick }) => (
  <span
    onClick={onClick}
    style={{
      cursor: 'pointer',
      color: filled ? 'gold' : 'lightgray',
    }}
  >
    &#9733; {/* Unicode character for a star */}
  </span>
);

export default Star;
