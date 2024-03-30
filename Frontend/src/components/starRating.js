// StarRating.js
import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const StarRating = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(null);

  const handleStarHover = (index) => {
    setHoverValue(index);
  };

  const handleStarClick = (index) => {
    onChange(index);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          onMouseEnter={() => handleStarHover(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleStarClick(index)}
        >
          {value >= index || hoverValue >= index ? (
            <StarIcon color="primary" />
          ) : (
            <StarOutlineIcon />
          )}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
