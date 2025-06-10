import React, { useState, useEffect } from 'react';
import axios from '../../services/apiClient.js';

export default function ManualAttendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [courseId, setCourseId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    // Example course ID - replace with real selection or dropdown
    const exampleCourseId = 'example-course-id'; // Replace with dynamic selection later
    setCourseId(exampleCourseId);

    // Fetch students in course
    axios.get(`/courses/${exampleCourseId}`)
      .then(res => {
        setStudents(res.data.students);
        const initial = {};
        res.data.students.forEach(s => initial[s._id] = 'Present');
        setAttendance(initial);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const handleSubmit = async () => {
    const records = Object.entries(attendance).map(([student, status]) => ({ student, status }));

    try {
      await axios.post('/attendance/manual', {
        courseId,
        date,
        records
      });
      alert('Attendance saved!');
    } catch (err) {
      alert('Failed to save attendance');
    }
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="date" className="block mb-2">Select Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {students.map(student => (
        <div key={student._id} className="flex justify-between items-center mb-2">
          <span>{student.name}</span>
          <select
            value={attendance[student._id]}
            onChange={(e) => handleChange(student._id, e.target.value)}
            className="border p-1 rounded"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Attendance
      </button>
    </div>
  );
}