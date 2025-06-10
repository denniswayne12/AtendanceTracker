import React, { useEffect, useState } from 'react';
import axios from '../../../services/apiClient.js';
import { toast } from 'react-toastify';

export default function CourseStudentsTab({ courseId }) {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`/courses/${courseId}`);
        const studentList = res.data.students || [];
        setStudents(studentList);
        setFilteredStudents(studentList);
      } catch (err) {
        toast.error('Failed to load students', { toastId: 'load-students-error' });
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [courseId]);

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    if (!value) {
      setFilteredStudents(students);
      return;
    }

    setFilteredStudents(students.filter(s => s.level === value));
  };

  if (loading) return <p>Loading students...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Students Enrolled</h2>
      {/* Level Filter */}
      <div className="mb-4">
        <label htmlFor="level-filter" className="block mb-2">Filter by Level:</label>
        <select id="level-filter" value={filter} onChange={handleFilterChange} className="border p-2 rounded">
          <option value="">All Levels</option>
          <option value="Level 200">Level 200</option>
          <option value="Level 300">Level 300</option>
          <option value="Level 400">Level 400</option>
        </select>
      </div>
      {/* Table */}
      <table className="min-w-full table-auto border border-gray-300">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="border-r border-gray-300 px-4 py-2">Name</th>
            <th className="border-r border-gray-300 px-4 py-2">Roll Number</th>
            <th className="border-r border-gray-300 px-4 py-2">Level</th>
            <th className="border-r border-gray-300 px-4 py-2">Department</th>
            <th className="px-4 py-2">Option</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-500">
                No students enrolled yet.
              </td>
            </tr>
          ) : (
            filteredStudents.map(student => (
              <tr key={student._id} className="border-b border-gray-200">
                <td className="border-r border-gray-200 px-4 py-2">{student.name}</td>
                <td className="border-r border-gray-200 px-4 py-2">{student.rollNumber}</td>
                <td className="border-r border-gray-200 px-4 py-2">{student.level}</td>
                <td className="border-r border-gray-200 px-4 py-2">{student.department}</td>
                <td className="px-4 py-2">{student.option || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}