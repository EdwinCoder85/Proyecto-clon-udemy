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
    <div className="flex gap-4 flex-wrap lg:flex-no-wrap">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
