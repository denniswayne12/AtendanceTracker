import React, { useState } from 'react';
import LecturerRegisterForm from './LecturerRegisterForm.jsx';
import StudentRegisterForm from './RegisterStudent.jsx';

export default function Register() {
  const [activeTab, setActiveTab] = useState('lecturer');

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="w-full max-w-md p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {/* Tabs */}
        <div className="flex border-b mb-4">
            <button
                  onClick={() => setActiveTab('lecturer')}
                  className={`px-4 py-2 font-medium transition-all duration-300 ${
                    activeTab === 'lecturer' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-blue-500'}`} >
                  Lecturer / Admin
            </button>

            <button onClick={() => setActiveTab('student')}
                  className={`px-4 py-2 font-medium transition-all duration-300 ${
                    activeTab === 'student' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500 hover:text-green-500'}`}>
                  Student
            </button>
        </div>

        {/* Conditionally render only the active form */}
        <div className="min-h-[250px]">
          {activeTab === 'lecturer' && <LecturerRegisterForm />}
          {activeTab === 'student' && <StudentRegisterForm />}
        </div>
      </div>
    </div>
  );
}