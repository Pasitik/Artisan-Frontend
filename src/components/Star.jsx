import React from 'react';

const Star = ({ filled, onClick, isRating }) => (
  <span
    onClick={onClick}
    style={{
      cursor: 'pointer',
      color: filled
        ? isRating
          ? 'black'
          : '#fb923c'
        : isRating
          ? 'white'
          : 'gray',
    }}
  >
    &#9733; {/* Unicode character for a star */}
  </span>
);

export default Star;
