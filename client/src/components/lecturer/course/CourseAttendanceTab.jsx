import React, { useEffect, useState } from 'react';
import axios from '../../../services/apiClient.js';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CourseAttendanceTab() {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await axios.get(`/courses/${courseId}`);
        const studentList = courseRes.data.students || [];

        const attendanceRes = await axios.get(`/attendance/course/${courseId}`);
        const todayAttendance = attendanceRes.data.find(a => a.date === date)?.records || [];

        const initial = {};
        studentList.forEach(s => {
          const record = todayAttendance.find(r => r.student._id === s._id);
          initial[s._id] = record ? record.status : 'Present';
        });

        setStudents(studentList);
        setAttendance(initial);
      } catch (err) {
        toast.error('Failed to load data', { toastId: 'attendance-load-error' });
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchData();
  }, [courseId, date]);
    if (loading) {
        return <p className="text-center py-8">Loading course data...</p>;
    }
  const handleChange = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/attendance/manual', {
        courseId,
        date,
        records: Object.entries(attendance).map(([student, status]) => ({ student, status }))
      });
      toast.success('Attendance saved!');
    } catch (err) {
      toast.error('Failed to save attendance');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
     <div className="text-xl font-bold mb-4 pr-16 w-screen flex justify-end">
        <button onClick={handleSubmit}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded" disabled={students.length === 0} >
            Save Attendance
        </button>
     </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <caption> <h2 className="text-xl font-bold mb-4"> Attendance for {date}</h2></caption>
          <thead>
            <tr className="border-b border-gray-300">
              <th className="border-r border-gray-300 px-4 py-2">Name</th>
              <th className="border-r border-gray-300 px-4 py-2">Roll Number</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-gray-400 py-8 border-b border-gray-300">
                  No students registered.
                </td>
              </tr>
            ) : (
              students.map(student => (
                <tr key={student._id} className="border-b border-gray-200">
                  <td className="border-r border-gray-200 px-4 py-2">{student.name}</td>
                  <td className="border-r border-gray-200 px-4 py-2">{student.rollNumber}</td>
                  <td className="px-4 py-2">
                    <select
                      value={attendance[student._id]}
                      onChange={(e) => handleChange(student._id, e.target.value)}
                      className="border p-1"
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {students.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            Student list is empty for this year.
          </div>
        )}
      </div>
    </div>
  );
}