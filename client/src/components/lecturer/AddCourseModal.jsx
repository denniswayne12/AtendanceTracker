import React, { useState, useEffect } from 'react';
import axios from '../../services/apiClient.js';

export default function AddCourseModal({ onClose }) {
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const res = await axios.get('/courses/predefined');
        setAvailableCourses(res.data);
      } catch (err) {
        alert('Failed to load courses');
      }
    };
    fetchAllCourses();
  }, []);

  const handleSelect = (e) => {
    setSelectedCourse(e.target.value);
  };

 const handleSubmit = async () => {
  try {
    const res = await axios.post('/courses/assign', { courseId: selectedCourse });
    console.log('Assigned course:', res.data);
    window.location.reload();
  } catch (err) {
    console.error('🚫 Assignment Error:', err.response?.data || err.message);
    alert(err.response?.data?.error || 'Failed to assign course');
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Assign Course</h2>

        <select onChange={handleSelect} className="border w-full p-2 rounded mb-4">
          <option value="">-- Select Course --</option>
          {availableCourses.map(course => (
            <option key={course._id} value={course._id}>
              {course.name} ({course.code}) - {course.department}, {course.level}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Assign Course
          </button>
        </div>
      </div>
    </div>
  );
}