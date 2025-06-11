import React, { useEffect, useState } from 'react';
import axios from '../../services/apiClient.js';

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const res = await axios.get('/students/me/courses');
        setCourses(res.data);
      } catch (err) {
        alert('Failed to load your courses');
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, []);

  if (loading) return <p>Loading your courses...</p>;

  return (
    <section className="mb-6 flex flex-col items-start">
      <h2 className="text-xl font-bold mb-4">My Enrolled Courses</h2>
      <ul className="flex flex-wrap gap-4 w-full">
        {courses.length > 0 ? (
          courses.map(course => (
            <li
              key={course._id}
              className="bg-white hover:shadow-xl w-full sm:w-[48%] md:w-[32%] lg:w-[30%] border p-4 rounded flex flex-col gap-2"
            >
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <span><strong>CourseName: </strong>{course.name}</span>
                    <p><strong>CourseCode: </strong>{course.code}</p>
                    <p className="text-sm text-gray-500">{course.department}</p>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No courses enrolled yet.</p>
        )}
      </ul>
    </section>
  );
}