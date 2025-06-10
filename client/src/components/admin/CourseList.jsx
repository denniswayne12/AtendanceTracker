import React, { useEffect, useState } from 'react';
import axios from '../../services/apiClient.js';
import AddCourseForm from '../../components/admin/AddCourseForm.jsx';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/courses/all');
        setCourses(res.data);
      } catch (err) {
        console.error('Failed to load courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <p>Loading courses...</p>;

  return (
    <div>
        <section className = "flex justify-end px-10">
                 <div className="flex justify-between items-center mb-6">
                    <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" >
                        Add New Course
                    </button>
                </div>
        </section>
        <section>
            <h2 className="text-xl font-semibold mb-4">Predefined Courses</h2>

            <table className="min-w-full table-auto border-collapse rounded-xl  overflow-hidden">
                <thead>
                <tr className="bg-blue-400">
                    <th className="border px-4 py-2">Code</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Department</th>
                    <th className="border px-4 py-2">Level</th>
                    <th className="border px-4 py-2">Semester</th>
                </tr>
                </thead>

                <tbody>
                {courses.length === 0 ? (
                    <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                        No courses found.
                    </td>
                    </tr>
                ) : (
                    courses.map(course => (
                    <tr key={course._id} className="hover:bg-gray-50">
                        <td className="border px-4 py-2">{course.code}</td>
                        <td className="border px-4 py-2">{course.name}</td>
                        <td className="border px-4 py-2">{course.department}</td>
                        <td className="border px-4 py-2">{course.level}</td>
                        <td className="border px-4 py-2">{course.semester}</td>
                    </tr>
                    ))
                )}
                </tbody>
            </table>
        </section>
         {/* Modal */}
         {showForm && <AddCourseForm onClose={() => setShowForm(false)} />}
    </div>
  );
}