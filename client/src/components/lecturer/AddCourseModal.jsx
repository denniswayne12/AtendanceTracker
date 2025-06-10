import React, { useState } from 'react';
import axios from '../../services/apiClient.js';
import { toast } from 'react-toastify';


export default function AddCourseModal({ onClose }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [department, setDepartment] = useState('');
  const [level, setLevel] = useState('');
  const [semester, setSemester] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/courses', { name, code, department, level, semester });
      toast.success('sucessfully added a Course');
      window.location.reload(); 
    } catch (err) {
      toast.error('Failed to add course');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Add New Course</h2>

            <form onSubmit={handleSubmit}>
                <input placeholder="Course Name" value={name} onChange={(e) => setName(e.target.value)} required className="border w-full p-2 mb-2 rounded"/>
                <input placeholder="Course Code (e.g., MTH201)" value={code} onChange={(e) => setCode(e.target.value)} required className="border w-full p-2 mb-2 rounded"/>
                <select value={department} onChange={e => setDepartment(e.target.value)} required className="border w-full p-2 mb-2 rounded">
                  <option value="">Select Department</option>
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                </select>
                <select value={level} onChange={e => setLevel(e.target.value)} required className="border w-full p-2 mb-2 rounded">
                  <option value="">Select Level</option>
                  <option value="Level 200">Level 200</option>
                  <option value="Level 300">Level 300</option>
                  <option value="Level 400">Level 400</option>
                </select>
                <select value={semester} onChange={e => setSemester(e.target.value)} required className="border w-full p-2 mb-4 rounded">
                  <option value="">Select Semester</option>
                  <option value="First Semester">First Semester</option>
                  <option value="Second Semester">Second Semester</option>
                </select>

                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add</button>
                </div>
            </form>
        </div>
    </div>
  );
}