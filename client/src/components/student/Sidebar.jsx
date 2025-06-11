import React from 'react';

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="w-64 bg-white shadow h-full">
      <div className="p-6 text-xl font-bold">Student Panel</div>
      <nav className="mt-6 px-4 space-y-2">
        <button onClick={() => onNavigate('overview')} className="block w-full text-left px-3 py-2 hover:bg-blue-100 rounded-md">
          Overview
        </button>
        <button onClick={() => onNavigate('register-courses')} className="block w-full text-left px-3 py-2 hover:bg-blue-100 rounded-md">
          Register Courses
        </button>
        <button onClick={() => onNavigate('my-courses')} className="block w-full text-left px-3 py-2 hover:bg-blue-100 rounded-md">
          My Courses
        </button>
        <button onClick={() => onNavigate('attendance')} className="block w-full text-left px-3 py-2 hover:bg-blue-100 rounded-md">
          Attendance Records
        </button>
      </nav>
    </aside>
  );
}