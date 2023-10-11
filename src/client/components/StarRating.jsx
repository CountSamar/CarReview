import React, { useState } from "react";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
// import React, { useState } from 'react';

// const StarRating = () => {
//   const [rating, setRating] = useState(0);

//   const handleClick = (star) => {
//     setRating(star);
//   };

//   const renderStars = () => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       const starClass = i <= rating ? 'filled' : 'empty';
//       stars.push(
//         <i
//           key={i}
//           onClick={() => handleClick(i)}
//           className={`star ${starClass}`}
//         />
//       );
//     }
//     return stars;
//   };

//   return (
//     <div className="star-rating">
//       {renderStars()}
//     </div>
//   );
// };

// export default StarRating;













