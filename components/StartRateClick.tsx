
import { StartRatingClick } from '@/interfaces';
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StartRate({ rating, onRatingChange }: StartRatingClick) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleStarClick = (selectedRating: number) => {
    onRatingChange(selectedRating);
  };

  return (
    <div className="flex flex-row items-center justify-center">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          size={18}
          color={(hoverRating || rating) > index ? "#F3BA16" : "#81807E"}
          style={{ cursor: "pointer" }}
          onMouseEnter={() => setHoverRating(index + 1)}
          onMouseLeave={() => setHoverRating(null)}
          onClick={() => handleStarClick(index + 1)}
        />
      ))}
    </div>
  );
}
