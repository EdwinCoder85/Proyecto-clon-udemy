"use client";

import type { Course } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import StartRate from "../StartRate";

export default function CourseCard({ course }: { course: Course }) {

  return (
    <div className="group relative flex flex-col overflow-hidden bg-white">
      <div className="flex flex-col items-start space-y-[1px] w-56">
        <Link key={course.id} href={`/course/${course.id}`}>
          <Image
            src={course.imageUrl}
            alt={course.title}
            className="h-32 w-full"
            width={8000}
            height={8000}
            priority={true}
          />
          <div className="py-3 relative">
            <h2 className="font-bold text-md pt-1 text-primary-600">
              {course.title}
            </h2>
            <h2 className="text-xs text-gray-700">{course.user?.username}</h2>
            <div className="flex space-x-1">
              <h3 className="text-orange-800 font-bold">{course.vote}</h3>
              <StartRate rating={course.vote} />
              {/* <h3 className="text-xs">{item.students}</h3> */}
            </div>
            <div className="flex space-x-4 items-center">
              <h3 className="text-black font-bold">{course.price} S/</h3>
              <h3 className="text-gray-800 text-sm line-through">
                {course.oldPrice === 0 ? "" : `${course.oldPrice} S/`}
              </h3>
            </div>
            {course.bestSeller ? (
              <span className="text-xs font-semibold bg-amber-200 p-1">
                Lo más vendido
              </span>
            ) : null}
          </div>
        </Link>
      </div>
    </div>
  );
}
