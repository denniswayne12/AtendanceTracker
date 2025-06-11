import Attendance from '../models/Attendance.js';
import Student from '../models/Student.js';
import mongoose from 'mongoose';

export const markAttendance = async (req, res) => {
  const { course, records } = req.body;
  try {
    const attendance = await Attendance.create({ course, records });
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAttendanceByCourse = async (req, res) => {
  const { courseId } = req.params;
  const { date = new Date().toISOString().split('T')[0] } = req.query;

  try {
    // Get all students enrolled in the course
    const studentsInCourse = await Student.find({ courses: courseId }).select('_id name rollNumber');

    if (!studentsInCourse.length) {
      return res.json([]);
    }

    // Find existing attendance record for selected date
    let attendanceRecord = await Attendance.findOne({ course: courseId, date });

    // If none exists, create with default "Present" status
    if (!attendanceRecord) {
      attendanceRecord = await Attendance.create({
        course: courseId,
        date,
        records: studentsInCourse.map(s => ({
          student: s._id,
          status: 'Present'
        }))
      });
    }

    // Format response data
    const result = studentsInCourse.map(student => {
      const record = attendanceRecord.records.find(r => r.student.toString() === student._id.toString());
      return {
        studentId: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        status: record ? record.status : 'Present'
      };
    });

    res.json(result);
  } catch (err) {
    console.error(' Failed to fetch attendance:', err.message);
    res.status(500).json({ error: 'Failed to load attendance' });
  }
};

export const markManualAttendance = async (req, res) => {
  const { courseId, date, records } = req.body;

  if (!courseId || !date || !records || !Array.isArray(records)) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  try {
    // Try to find existing attendance record
    let attendanceDoc = await Attendance.findOne({ course: courseId, date });

    if (attendanceDoc) {
      // Update existing attendance
      attendanceDoc.records = records;
      await attendanceDoc.save();
      res.json(attendanceDoc);
    } else {
      // Create new attendance record
      attendanceDoc = await Attendance.create({
        course: courseId,
        date,
        records
      });

      res.status(201).json(attendanceDoc);
    }
  } catch (err) {
    console.error(' Failed to save attendance:', err.message);
    res.status(500).json({ error: 'Failed to save attendance' });
  }
};
