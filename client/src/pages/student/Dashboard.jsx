
import React, { useState } from 'react';
import Sidebar from '../../components/student/Sidebar.jsx';
import MyCourses from '../../components/student/MyCourses.jsx';
import AttendanceSummary from '../../components/student/AttendanceSummary.jsx';
import CourseRegistration from '../../components/student/CourseRegistration.jsx';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex min-h-screen">
      {/* Student Sidebar */}
      <Sidebar onNavigate={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 p-6 bg-gray-100">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
        </header>

        {/* Dynamic Content */}
        {activeTab === 'overview' && <AttendanceSummary />}
        {activeTab === 'register-courses' && <CourseRegistration />}
        {activeTab === 'my-courses' && <MyCourses />}
      </main>
    </div>
  );
}