import { useState, useEffect } from 'react';
import axios from '../../services/apiClient.js';

export default function AttendanceForm({ courseId }) {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get(`/courses/${courseId}`);
      setStudents(res.data.students);
      const initial = {};
      res.data.students.forEach(s => initial[s._id] = 'Present');
      setAttendance(initial);
    };
    fetchStudents();
  }, [courseId]);

  const handleChange = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const handleSubmit = async () => {
    const records = Object.entries(attendance).map(([student, status]) => ({ student, status }));
    await axios.post('/attendance', { course: courseId, records });
    alert('Attendance saved!');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>
      {students.map(student => (
        <div key={student._id} className="mb-3 flex justify-between items-center">
          <span>{student.name}</span>
          <select
            value={attendance[student._id]}
            onChange={(e) => handleChange(student._id, e.target.value)}
            className="border p-1"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      ))}
      <button onClick={handleSubmit} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Save Attendance</button>
    </div>
  );
}