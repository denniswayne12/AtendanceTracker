import React, { useState } from 'react';
import axios from 'axios';

export default function QRCodeGenerator({ courseId }) {
  const [qrData, setQrData] = useState(null);

  const generateQR = async () => {
    try {
      const res = await axios.post('/attendance/session', { courseId });
      const sessionData = {
        sessionId: res.data.sessionId,
        courseId,
        timestamp: Date.now()
      };
      setQrData(JSON.stringify(sessionData));
    } catch (err) {
      alert('Failed to generate QR code');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={generateQR}
        className="px-3 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
      >
        Generate QR Code
      </button>

      {qrData && (
        <div className="mt-2">
          <img
            src={`https://quickchart.io/qr?text=${encodeURIComponent(qrData)}&size=120`}
            alt="QR Code"
          />
        </div>
      )}
    </div>
  );
}