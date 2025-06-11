import React, { useState } from 'react';
import Sidebar from '../../components/student/Sidebar.jsx';
import MyCourses from '../../components/student/MyCourses.jsx';
import AttendanceSummary from '../../components/student/AttendanceSummary.jsx';
import CourseRegistration from '../../components/student/CourseRegistration.jsx';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
    
      <Sidebar onNavigate={setActiveTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


      <main className="flex-1 p-6 transition-all duration-200 md:ml-50">
          <header className="mb-6 flex justify-between items-center fixed top-0 left-0 md:left-64 w-full md:w-[100%] z-20 bg-gray-100 p-6 shadow"
            style={{ minHeight: '72px' }}>
            <h1 className="text-2xl font-bold">Student Dashboard</h1>
          </header>

          <div className="pt-24">
            {activeTab === 'overview' && <AttendanceSummary />}
            {activeTab === 'register-courses' && <CourseRegistration />}
            {activeTab === 'my-courses' && <MyCourses />}
          </div>
      </main>
    </div>
  );
}