import React, { useState } from 'react';
import axios from '../../services/apiClient.js';

export default function InviteCodeGenerator({ courseId }) {
  const [code, setCode] = useState('');
  
  const generateCode = async () => {
    const res = await axios.post('/courses/generate-code', { courseId });
    setCode(res.data.code);
  };

  return (
    <div className="p-4 border rounded shadow">
      <h3 className="font-bold mb-2">Course Invite Code</h3>
      <button 
        onClick={generateCode}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate Code
      </button>
      {code && (
        <div className="mt-2 p-2 bg-gray-100 text-center">
          <p className="font-mono text-lg">{code}</p>
          <small>Valid for 24 hours</small>
        </div>
      )}
    </div>
  );
}