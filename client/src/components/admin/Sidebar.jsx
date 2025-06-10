import React from 'react';


export default function Sidebar({ onNavigate }) {
  return (
    <aside className="w-64 bg-white shadow h-full">
      <div className="p-6 text-xl font-bold">Admin Panel</div>
      <nav className="mt-6 px-4 space-y-2">
        <button onClick={() => onNavigate('courses')} className="block w-full text-left px-3 py-2 hover:bg-blue-100 rounded-md">
          Predefined Courses
        </button>
        <button onClick={() => onNavigate('users')} className="block w-full text-left px-3 py-2 hover:bg-blue-100 rounded-md">
          Manage Users
        </button>
        <button onClick={() => onNavigate('analytics')} className="block w-full text-left px-3 py-2 hover:bg-blue-100 rounded-md">
          Analytics & Reports
        </button>
        <button onClick={() => onNavigate('settings')} className="block w-full text-left px-3 py-2 hover:bg-blue-100 rounded-md">
          Settings
        </button>
      </nav>
    </aside>
  );
}