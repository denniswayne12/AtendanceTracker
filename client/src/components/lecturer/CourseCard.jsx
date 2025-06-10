import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
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
  {/* <Link to={`/lecturer/course/${course._id}/attendance`} className="mt-4 inline-block text-blue-500 hover:underline">
          View Attendance
        </Link> */}
  return (
    <div className  = "bg-green-400 py-1 px-2 rounded shadow mb-4 w-[300px]">
        {/* <p className="text-sm text-black mt-2">Lecturer: {course.lecturer.name}</p> */}
       <Link to={`/lecturer/course/${course._id}/attendance`} className="shadow rounded-lg  hover:shadow-md transition-shadow">
        <h3 className="font-bold">{course.name}</h3>
          <p className="text-sm text-gray-500">Code: {course.code}</p>
          <p className="text-sm text-gray-500 mt-1">{getLevelName(course.code)}</p>
       </Link>
        <div className="mt-4 flex justify-between items-center">
          <button onClick={(e) => e.preventDefault()} className="text-sm flex gap-1 justify-center items-center"><FaRegPenToSquare />Edit</button>
          <button onClick={onDelete} className="text-sm flex gap-1 justify-center items-center"><FaTrashAlt />Delete</button>
        </div>
    </div>
  );
}