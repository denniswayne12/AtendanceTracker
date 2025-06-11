import Course from '../models/Course.js';
import Student from '../models/Student.js';


// ____________Create course (lecturer) ____________
export const createCourse = async (req, res) => {
  const { name, code } = req.body;
  try {
    const course = await Course.create({
      name,
      code,
      lecturer: req.user.id
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ____________Get all courses for lecturer (only their own)____________
export const getLecturerCourses = async (req, res) => {
  try {
    const courses = await Course.find({ lecturer: req.user.id }).populate('students', 'name rollNumber');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load your courses' });
  }
};

// ____________Generate invite code for attendance____________
export const generateInviteCode = async (req, res) => {
  const { courseId } = req.body;
  const code = Math.random().toString(36).substring(2, 8).toUpperCase(); // 6-digit code

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    course.inviteCodes.push({
      code,
      expiresAt: Date.now() + 86400000, // 24 hours
      createdBy: req.user.id
    });

    await course.save();
    res.json({ code });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ____________Enroll student via invite code____________
export const enrollWithInviteCode = async (req, res) => {
  const { code } = req.body;
  const studentId = req.user.id;

  try {
    const course = await Course.findOne({
      'inviteCodes.code': code,
      'inviteCodes.expiresAt': { $gt: Date.now() }
    });

    if (!course) return res.status(400).json({ error: 'Invalid or expired code' });

    // No level restriction: student can enroll in any course
    await Course.findByIdAndUpdate(course._id, {
      $push: { students: studentId }
    });

    await Student.findByIdAndUpdate(studentId, {
      $push: { courses: course._id }
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ____________Admin-only: Create predefined course (structured format)____________
export const createPredefinedCourse = async (req, res) => {
  const { name, code, department, level, semester } = req.body;

  if (!/^[A-Z]{3}\d{3}$/.test(code)) {
    return res.status(400).json({ error: 'Invalid course code format. Use 3 uppercase letters + 3 digits (e.g., CEC200)' });
  }

  try {
    const course = await Course.create({
      name,
      code,
      department,
      level,
      semester
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ____________Admin: Get all courses____________
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ department: 1, level: 1, code: 1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load courses' });
  }
};

// controllers/courseController.js
export const getCoursesByDeptAndLevel = async (req, res) => {
  // Use req.query for department and level
  const { department, level } = req.query;

  if (!department || !level) {
    return res.status(400).json({ error: 'Department and level are required' });
  }

  try {
    const courses = await Course.find({
      department,
      level
    });

    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load courses' });
  }
};
// ____________Get single course by ID (for lecturer or student)____________
export const getCourseById = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId).populate('students');
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // Ensure user has access
    if (req.user.role === 'student') {
      const student = await Student.findById(req.user.id);
      if (!course.students.some(s => s._id.toString() === student._id.toString())) {
        return res.status(403).json({ error: 'Access denied' });
      }
    } else if (req.user.role === 'lecturer' && !course.lecturer.equals(req.user.id)) {
      return res.status(403).json({ error: 'You do not own this course' });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};