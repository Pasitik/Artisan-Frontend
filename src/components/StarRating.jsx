import { useState } from 'react';
import Star from './Star';

const StarRating = ({ totalStars, ratings, isRating }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div>
      {isRating
        ? [...Array(totalStars)].map((_, index) => (
            <Star
              key={index}
              filled={index < rating}
              onClick={() => handleStarClick(index)}
            />
          ))
        : [...Array(totalStars)].map((_, idx) => (
            <Star key={idx} filled={idx < ratings} onClick={() => null} />
          ))}
    </div>
  );
};

export default StarRating;
