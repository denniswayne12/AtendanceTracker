import React from 'react';
import { Link } from 'react-router-dom';

export default function CourseCard({ course, onDelete }) {
  // Map level to readable name
  const getLevelName = (code) => {
    const firstDigit = code.charAt(0);
    switch (firstDigit) {
      case '2': return 'Level 200 (1st Year)';
      case '3': return 'Level 300 (2nd Year)';
      case '4': return 'Level 400 (3rd Year)';
      default: return 'Unknown Level';
    }
  };

  return (
    <Link to={`/lecturer/course/${course._id}/attendance`} className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="font-bold">{course.name}</h3>
      <p className="text-sm text-gray-500">Code: {course.code}</p>
      <p className="text-sm text-gray-500 mt-1">{getLevelName(course.code)}</p>
      <div className="mt-4 flex justify-between">
        <button onClick={(e) => e.preventDefault()} className="text-red-500 text-sm">Edit</button>
        <button onClick={onDelete} className="text-red-500 text-sm">Delete</button>
      </div>
      <Link to={`/lecturer/course/${course._id}/attendance`} className="mt-4 inline-block text-blue-500 hover:underline">
        View Attendance
      </Link>
      
    </Link>
  );
}