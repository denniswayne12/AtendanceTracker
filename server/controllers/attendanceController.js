import Attendance from '../models/Attendance.js';


export const markAttendance = async (req, res) => {
  const { course, records } = req.body;
  try {
    const attendance = await Attendance.create({ course, records });
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const markManualAttendance = async (req, res) => {
  const { courseId, date, records } = req.body;
  
  try {
    // Check if attendance already exists for this date
    const existing = await Attendance.findOne({ course: courseId, date });
    
    if (existing) {
      // Update existing attendance
      existing.records = records;
      await existing.save();
      return res.json(existing);
    }
    
    // Create new attendance
    const attendance = await Attendance.create({ course: courseId, date, records });
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAttendanceByCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const attendances = await Attendance.find({ course: courseId }).populate('records.student');
    res.json(attendances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};