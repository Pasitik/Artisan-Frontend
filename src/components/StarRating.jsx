import { useState } from 'react';
import Star from './Star';
import { useApi } from '../data/ApiProvider';
import { useParams } from 'react-router-dom';

const StarRating = ({ totalStars, ratings, isRating }) => {
  const [rating, setRating] = useState(0);
  const api = useApi();
  const { id } = useParams();

  const handleStarClick = (index) => {
    setRating(index + 1);
    const rating = index + 1;

    if (!id) {
      throw new Error('Artisan id not found.');
    }

    (async () => {
      await api.updateArtisanRating({
        rating: rating,
        artisan_id: id,
      });
    })();
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
