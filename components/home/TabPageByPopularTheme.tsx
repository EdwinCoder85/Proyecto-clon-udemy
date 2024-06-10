import React, { useEffect, useState } from "react";
import { Course } from "@prisma/client";
import CourseCard from "../courses/CourseCard";
import { getCoursesByPopularTheme } from '@/actions';
import CourseCardSkeleton from '../courses/CourseCardSkeleton';

interface Props {
  categoryName: string;
}

export default function TabPageByPopularTheme({ categoryName }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCoursesByPopularTheme(categoryName)
        setCourses(coursesData)
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="flex gap-3 flex-wrap lg:flex-no-wrap">
        {Array.from({ length: 12 }).map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-3 flex-wrap lg:flex-no-wrap">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
