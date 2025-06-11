import React, { useEffect, useState } from 'react';
import axios from '../../services/apiClient.js';

export default function AttendanceSummary() {
  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    absent: 0,
    percentage: 0
  });
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkGraduation = async () => {
      try {
        const res = await axios.get('/analytics/graduation');
        setEligible(res.data.eligibleForGraduation);
      } catch (err) {
        console.error('Failed to check graduation status');
      }
    };

    const fetchStats = async () => {
      try {
        const res = await axios.get('/analytics/student');
        const data = res.data;

        let totalDays = 0;
        let presentCount = 0;

        Object.values(data).forEach(course => {
          totalDays += course.totalDays;
          presentCount += course.present;
        });

        const percentage = totalDays ? Math.round((presentCount / totalDays) * 100) : 0;

        setStats({ total: totalDays, present: presentCount, absent: totalDays - presentCount, percentage });
      } catch (err) {
        console.error('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    checkGraduation();
    fetchStats();
  }, []);

  if (loading) return <p>Loading attendance summary...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <section className="bg-white shadow rounded-lg p-6 text-center">
        <h3 className="text-sm uppercase text-gray-500">Total Days</h3>
        <p className="text-2xl font-bold">{stats.total}</p>
      </section>
      
      <section className="bg-white shadow rounded-lg p-6 text-center">
        <h3 className="text-sm uppercase text-gray-500">Present</h3>
        <p className="text-2xl font-bold text-green-500">{stats.present}</p>
      </section>

      <section className="bg-white shadow rounded-lg p-6 text-center">
        <h3 className="text-sm uppercase text-gray-500">Absent</h3>
        <p className="text-2xl font-bold text-red-500">{stats.absent}</p>
        <p className="mt-2 font-semibold">{stats.percentage}% Attendance</p>
      </section>

      <section className="bg-white p-6 rounded shadow mb-6 col-span-1 md:col-span-3">
        <h2 className="text-xl font-bold mb-4">Graduation Status</h2>
        {eligible ? (
          <p className="text-green-600">✅ You are eligible to graduate!</p>
        ) : (
          <p className="text-red-600">❌ You must pass all required courses to graduate.</p>
        )}
      </section>
    </div>
  );
}