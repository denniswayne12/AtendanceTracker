/* import React, { useState } from 'react'; */
import { useParams, useNavigate } from 'react-router-dom';

// Components
import CourseAttendanceTab from './CourseAttendanceTab.jsx';
import CourseStudentsTab from './CourseStudentsTab.jsx';
import CourseReportsTab from './CourseReportsTab.jsx';

export default function CourseDetailPage() {
  const { courseId, tab = 'attendance' } = useParams();
  const navigate = useNavigate();

  const handleTabChange = (newTab) => {
    navigate(`/lecturer/course/${courseId}/${newTab}`);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      {/* Tab Navigation */}
      <div className="border-b mb-4">
        <nav className="flex space-x-4">
          <button
            onClick={() => handleTabChange('attendance')}
            className={`py-2 px-4 ${tab === 'attendance' ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' : ''}`}
          >
            Attendance
          </button>
          <button
            onClick={() => handleTabChange('students')}
            className={`py-2 px-4 ${tab === 'students' ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' : ''}`}
          >
            Students
          </button>
          <button
            onClick={() => handleTabChange('reports')}
            className={`py-2 px-4 ${tab === 'reports' ? 'text-blue-500 border-b-2 border-blue-500 font-semibold' : ''}`}
          >
            Reports
          </button>
        </nav>
      </div>

      {/* Render Active Tab */}
      {tab === 'attendance' && <CourseAttendanceTab />}
      {tab === 'students' && <CourseStudentsTab courseId={courseId} />}
      {tab === 'reports' && <CourseReportsTab courseId={courseId} />}
    </div>
  );
}