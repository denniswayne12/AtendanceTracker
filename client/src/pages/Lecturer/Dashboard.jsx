/* import Header from './components/LecDashboardHeader'; */
import React, { useState } from 'react';
import Sidebar from '../../components/lecturer/Sidebar';
import CourseList from '../../components/lecturer/CourseList';
import QRCodeGenerator from '../../components/shared/QRCodeGenerator.jsx';
import Statistics from '../../components/lecturer/Statistics.jsx';
import SettingsPage from '../../components/lecturer/SettingsPage.jsx';


export default function LecturerDashboard() {
   const [activeTab, setActiveTab] = useState('courses'); // Default tab

  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return <CourseList />;
      case 'qrcode':
        return <QRCodeGenerator courseId="default" />;
      case 'statistics':
        return <Statistics />;
      case 'settings':
        return <SettingsPage />; // You can create this later
      default:
        return <CourseList />;
    }
  };

 return (
   <div className="flex min-h-screen">
      
        <Sidebar onNavigate={setActiveTab} />
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Attendance Tracker</h1>
        {renderContent()}
      </main>
    </div>
  );
}
