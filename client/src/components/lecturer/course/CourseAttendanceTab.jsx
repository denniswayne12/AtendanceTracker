import React, { useEffect, useState } from 'react';
import axios from '../../../services/apiClient.js';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CourseAttendanceTab() {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);

  // Load students enrolled in the course
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`/courses/${courseId}?populate=students`);
        const studentList = res.data.students || [];

        const initial = {};
        studentList.forEach(student => {
          initial[student._id] = 'default'; // '/' status
        });

        setStudents(studentList);
        setAttendance(initial);
      } catch (err) {
        console.error('Failed to load students:', err.message);
        toast.error('Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchStudents();
  }, [courseId]);

  const handleChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async () => {
    const date = new Date().toISOString().split('T')[0];

    const records = Object.entries(attendance).map(([student, status]) => ({
      student,
      status: status === 'default' ? 'Absent' : status
    }));

    try {
      await axios.post('/attendance/manual', {
        courseId,
        date,
        records
      });
      toast.success('Attendance saved!');
    } catch (err) {
      toast.error('Failed to save attendance');
    }
  };

  if (loading) {
    return <p className="text-center py-8">Loading students...</p>;
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Roll Number</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Mark</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No students enrolled yet.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{student.name}</td>
                  <td className="border px-4 py-2">{student.rollNumber}</td>
                  <td className="border px-4 py-2 capitalize">
                    {attendance[student._id] === 'default'
                      ? '/'
                      : attendance[student._id]}
                  </td>
                  <td className="border px-4 py-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={attendance[student._id] === 'Present'}
                        onChange={(e) =>
                          handleChange(student._id, e.target.checked ? 'Present' : 'Absent')
                        }
                        className="form-checkbox h-5 w-5 text-blue-500"
                      />
                      <span>Mark as Present</span>
                    </label>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Save Attendance
        </button>
      </div>
    </div>
  );
}