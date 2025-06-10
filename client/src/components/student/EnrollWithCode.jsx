import React, { useState } from 'react';
import axios from '../../services/apiClient.js';

export default function EnrollWithCode() {
  const [code, setCode] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/courses/enroll-code', { code });
      alert('Successfully enrolled!');
    } catch (err) {
      alert('Enrollment failed');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Enroll in Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter invite code"
          required
          className="border p-2 w-full mb-4"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Enroll
        </button>
      </form>
    </div>
  );
}