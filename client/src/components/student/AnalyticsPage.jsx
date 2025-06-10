import React, { useEffect, useState } from 'react';
import axios from '../../services/apiClient.js';
import { AnalyticsCard } from '../../shared/index.js';

export default function StudentAnalytics() {
  const [analytics, setAnalytics] = useState({});
  
  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await axios.get('/analytics/student/analytics');
      setAnalytics(res.data);
    };
    fetchAnalytics();
  }, []);

  const prepareChartData = (courseName) => {
    const data = [];
    const courseData = analytics[courseName];
    
    data.push({ name: 'Present', value: courseData.present });
    data.push({ name: 'Absent', value: courseData.absent });
    
    return data;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Attendance Analytics</h1>
      
      {Object.keys(analytics).map(courseName => (
        <div key={courseName} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{courseName}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <p className="text-lg mb-2">Attendance Summary</p>
              <p>Present: {analytics[courseName].present}</p>
              <p>Absent: {analytics[courseName].absent}</p>
              <p className="font-bold mt-2">
                Percentage: {analytics[courseName].percentage}%
              </p>
            </div>
            
            <AnalyticsCard
              title={`Attendance Distribution - ${courseName}`}
              data={prepareChartData(courseName)}
              dataKey="value"
              xAxisKey="name"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
