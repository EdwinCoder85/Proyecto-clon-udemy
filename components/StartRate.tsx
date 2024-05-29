import { StartRating } from '@/interfaces';
import { FaStar } from "react-icons/fa";

export default function StartRate({ rating }: StartRating) {
  return (
    <div className="flex flex-row items-center justify-center">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          size={16}
          color={index + 1 <= rating ? "#F3BA16" : "#81807E"}
        />
      ))}
    </div>
  );
}
