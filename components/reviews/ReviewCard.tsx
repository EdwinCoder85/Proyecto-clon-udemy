"use client";

import type { Review } from "@/interfaces";
import { StarIcon } from "@heroicons/react/24/solid";
import StartRate from "../StartRate";
import Image from "next/image";
import { Avatar } from "../ui";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-col items-start space-y-[1px] w-72">
        <div className="px-4 py-3 relative w-full">
          <div className="flex justify-between">
            <h2 className="text-lg font-bold text-gray-700">
              {review.user?.username}
            </h2>
            <Avatar src={review.image} alt="imagen" />
          </div>
          <div className="flex flex-row space-x-2">
            <h3 className="text-orange-800 font-bold">{review.rating}</h3>
            <StartRate rating={review.rating} />
            {/* <h3 className="text-xs">{item.students}</h3> */}
          </div>
          <div className="flex space-x-4 items-center">
            <p className="text-gray-800 text-sm">{review.commentary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
