import React, { useEffect, useState } from "react";
import { Course } from "@prisma/client";
import CourseCard from "../courses/CourseCard";
import { getCoursesByPopularTheme } from '@/actions';

interface Props {
  categoryName: string;
}

export default function TabPageByPopularTheme({ categoryName }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCoursesByPopularTheme(categoryName)
        setCourses(coursesData)
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [categoryName]);

  return (
    <div className="flex gap-4 flex-wrap lg:flex-no-wrap">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
