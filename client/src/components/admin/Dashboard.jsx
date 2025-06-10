import React, { useEffect, useState } from 'react';
import AddCourseForm from '../../components/admin/AddCourseForm.jsx';
import axios from '../../services/apiClient.js';

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  
const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/courses/all');
        setCourses(res.data);
      } catch (err) {
        alert('Failed to load courses');
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add New Course
        </button>
      </div>

      {/* Course List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(course => (
          <div key={course._id} className="bg-white border rounded-lg shadow p-4">
            <h3 className="font-bold">{course.name}</h3>
            <p className="text-gray-600">Code: {course.code}</p>
            <p>{course.department} | {course.level} | {course.semester}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showForm && <AddCourseForm onClose={() => setShowForm(false)} />}
    </div>
  );
}