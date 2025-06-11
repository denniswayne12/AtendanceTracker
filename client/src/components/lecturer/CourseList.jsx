import React, { useEffect, useState } from 'react';
import axios from '../../services/apiClient.js';
import CourseCard from './CourseCard.jsx';
import AddCourseModal from './AddCourseModal.jsx';
import { toast } from 'react-toastify';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/courses');
        setCourses(res.data);
      } catch (err) {
        toast.error('Failed to load courses');
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
    <div className="grid grid-cols-1 w-full ">
        <section  className = "flex justify-end">
            <button onClick={() => setShowModal(true)} className="border border-dashed border-gray-400 flex items-center justify-center h-12 hover:bg-gray-200 rounded-lg">
                + Add New Course
            </button>
        </section>

        <section className="bg-white p-6 rounded shadow mt-4">
              <h2 className="text-2xl font-bold mb-6">My Courses23</h2>
              <section className = "flex" >
                  {courses.map(course => (
                    <CourseCard key={course._id} course={course} onDelete={() => handleDelete(course._id)} />
                  ))}
                  {courses.length === 0 && (
                    <p className="text-gray-500">No courses found. Click the button above to add a new course.</p>
                  )}
              </section>
        </section>


        {showModal && <AddCourseModal onClose={() => setShowModal(false)} />}
    </div>
  );
}