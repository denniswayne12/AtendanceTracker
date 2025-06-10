import React, { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar.jsx';
import CourseList from '../../components/admin/CourseList.jsx';
import UserList from '../../components/admin/UserList.jsx';
import AnalyticsPage from '../../components/admin/AnalyticsPage.jsx';
import SettingsPage from '../../components/admin/SettingsPage.jsx';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('courses');

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return <CourseList />;
      case 'users':
        return <UserList />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <CourseList />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onNavigate={setActiveTab} />
      <main className="flex-1 p-6 bg-gray-100">
        <header className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <span className="text-sm text-gray-500">Logged in as: Admin</span>
        </header>

        {/* Dynamic Content */}
        {renderContent()}
      </main>
    </div>
  );
}