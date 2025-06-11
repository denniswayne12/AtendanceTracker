import React, { useState, useEffect } from 'react';
import axios from '../../services/apiClient.js';

export default function CourseRegistration() {
  const [department, setDepartment] = useState('');
  const [level, setLevel] = useState('');
  const [availableCourses, setAvailableCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const departmentOptions = [
    'Computer Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering'
  ];

  const levelOptions = ['Level 200', 'Level 300', 'Level 400'];

  // Fetch courses based on selected department and level
  useEffect(() => {
    if (!department || !level) return;

    const fetchCourses = async () => {
      try {
        const res = await axios.get(`/courses/department-level?department=${department}&level=${level}`);
        setAvailableCourses(res.data);
      } catch (err) {
        alert('Failed to load courses');
      }
    };

    fetchCourses();
  }, [department, level]);

  const handleSelect = (course) => {
    if (selectedCourses.some(c => c._id === course._id)) return;
    setSelectedCourses([...selectedCourses, course]);
  };

 const handleSubmit = async () => {
  try {
    const res = await axios.post('/students/enroll', {
      courseIds: selectedCourses.map(c => c._id)
    });

    console.log('Enrollment Response:', res.data);
    alert('Successfully enrolled in selected courses!');
  } catch (err) {
    console.error('Enrollment Error:', err.response?.data || err.message);
    alert(`Enrollment failed: ${err.response?.data?.error || 'Unknown error'}`);
  }
};

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Register Courses</h2>

      {/* Department & Level Select */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Department</option>
          {departmentOptions.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Level</option>
          {levelOptions.map(lvl => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
      </div>

      {/* Course List */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Available Courses</h3>
        <ul className="space-y-2">
          {availableCourses.length > 0 ? (
            availableCourses.map(course => (
              <li key={course._id} className="bg-white border p-4 rounded flex justify-between items-center">
                <div>
                  <strong>{course.name}</strong> ({course.code})
                </div>
                <button
                  onClick={() => handleSelect(course)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Select
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Select department and level to see courses</p>
          )}
        </ul>
      </div>

      {/* Selected Courses */}
      <div>
        <h3 className="font-semibold mb-2">Selected Courses</h3>
        <ul className="space-y-2">
          {selectedCourses.map(course => (
            <li key={course._id} className="bg-white border p-4 rounded">
              {course.name} ({course.code})
            </li>
          ))}
        </ul>

        {selectedCourses.length > 0 && (
          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            Enroll in Selected Courses
          </button>
        )}
      </div>
    </div>
  );
}

