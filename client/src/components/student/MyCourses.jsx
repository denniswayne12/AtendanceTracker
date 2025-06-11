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
    <div>
      <h2 className="text-xl font-bold mb-4">My Enrolled Courses</h2>
      <ul className="space-y-4">
        {courses.length > 0 ? (
          courses.map(course => (
            <li key={course._id} className="bg-white border rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold">{course.name}</h3>
              <p className="text-sm text-gray-500">{course.code} • {course.department}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No courses enrolled yet.</p>
        )}
      </ul>
    </div>
  );
}