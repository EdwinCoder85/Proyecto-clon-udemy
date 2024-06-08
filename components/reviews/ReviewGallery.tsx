export const dynamic = "force-dynamic";

import { getReviewsByCourse } from "@/actions";
import ReviewCard from "./ReviewCard";
import { Card } from "../ui";

interface Props {
  courseId: string;
}

export default async function ReviewGallery({ courseId }: Props) {
  const reviews = await getReviewsByCourse(courseId);

  return (
      <div className="flex mx-auto gap-y-4 flex-wrap lg:flex-no-wrap justify-center lg:gap-4 lg:justify-normal lg:mx-0">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
