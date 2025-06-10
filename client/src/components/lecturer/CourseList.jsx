import React, { useEffect, useState } from 'react';
import axios from '../../services/apiClient.js';
import CourseCard from './CourseCard.jsx';
import AddCourseModal from './AddCourseModal.jsx';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Failed to load courses');
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`/courses/${courseId}`);
      setCourses(courses.filter(c => c._id !== courseId));
    } catch (err) {
      alert('Failed to delete course');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map(course => (
        <CourseCard key={course._id} course={course} onDelete={() => handleDelete(course._id)} />
      ))}
      <button
        onClick={() => setShowModal(true)}
        className="border border-dashed border-gray-400 flex items-center justify-center h-32 hover:bg-gray-200 rounded-lg"
      >
        + Add New Course
      </button>

      {showModal && <AddCourseModal onClose={() => setShowModal(false)} />}
    </div>
  );
}