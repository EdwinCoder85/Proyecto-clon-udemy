// components/courses/CourseCardSkeleton.tsx

export default function CourseCardSkeleton() {
  return (
    <div className="border rounded shadow p-4 w-60 mx-auto animate-pulse">
      <div className="h-24 bg-gray-200 rounded mb-4"></div>
      <div className="h-6 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
      <div className="h-6 bg-gray-200 rounded mb-2 w-1/4"></div>
    </div>
  );
}
