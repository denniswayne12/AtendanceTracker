import React from 'react';

export default function Sidebar({ onNavigate }) {
  return (
    <div className="w-64 bg-white shadow h-full">
      <div className="p-6 text-xl font-bold">Attendance Tracker</div>
      <nav className="mt-4">
        <ul className="space-y-2 p-4">
          <li>
            <button onClick={() => onNavigate('courses')} className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded">
              Courses
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('qrcode')} className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded">
              QR Code
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('statistics')} className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded">
              Statistics
            </button>
          </li>
          <li>
            <button onClick={() => onNavigate('settings')} className="block w-full text-left px-4 py-2 hover:bg-blue-100 rounded">
              Settings
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}