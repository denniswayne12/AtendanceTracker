import React from 'react';

export default function CourseReportsTab({ courseId }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Attendance Reports</h2>
      <p>Generate reports based on attendance records for course ID: {courseId}</p>
    </div>
  );
}