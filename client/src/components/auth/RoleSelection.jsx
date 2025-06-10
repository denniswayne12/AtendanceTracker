// components/auth/RoleSelection.jsx
import React from 'react';

export default function RoleSelection() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Register As</h2>
        
        <div className="space-y-4">
          <button 
            className="bg-blue-500 text-white px-4 py-2 w-full"
            onClick={() => window.location.href = '/register'}
          >
            Lecturer / Admin
          </button>
          
          <button 
            className="bg-green-500 text-white px-4 py-2 w-full"
            onClick={() => window.location.href = '/register/student'}
          >
            Student
          </button>
        </div>
      </div>
    </div>
  );
}