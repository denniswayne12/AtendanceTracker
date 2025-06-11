import React, { useState } from 'react';
import Sidebar from '../../components/lecturer/Sidebar';
import CourseList from '../../components/lecturer/CourseList';
import QRCodeGenerator from '../../components/shared/QRCodeGenerator.jsx';
import Statistics from '../../components/lecturer/Statistics.jsx';
import SettingsPage from '../../components/lecturer/SettingsPage.jsx';
import { IoMenu } from "react-icons/io5";

export default function LecturerDashboard() {
  const [activeTab, setActiveTab] = useState('courses');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return <CourseList />;
      case 'qrcode':
        return <QRCodeGenerator courseId="default" />;
      case 'statistics':
        return <Statistics />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <CourseList />;
    }
  };

  return (
    <div className="flex min-h-screen">
         <div className="hidden md:block fixed top-0 left-0 w-64 h-[100dvh] bg-white shadow z-2">
                <Sidebar onNavigate={setActiveTab} />
          </div>


      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
            <Sidebar onNavigate={(tab) => {setActiveTab(tab);setSidebarOpen(false); }} />
          </div>
        </div>
      )}

   
      <div className="flex-1 p-6 md:ml-64">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white shadow z-30 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
              <button className="md:hidden text-gray-700" onClick={() => setSidebarOpen(true)}>
                <IoMenu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Attendance Tracker</h1>
          </div>
          <span className="text-sm text-gray-500">Lecturer Panel</span>
        </header>

        {/* Content with padding for header */}
         <main className="pt-20 p-6 bg-gray-100 min-h-screen mt-20">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
