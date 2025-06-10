import Course from '../models/Course.js';
import Student from '../models/Student.js';

// Create course
export const createCourse = async (req, res) => {
  try {
    const { name, code } = req.body;
    const lecturerId = req.user.id;

    const course = await Course.create({
      name,
      code,
      lecturer: lecturerId
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get lecturer's courses
export const getLecturerCourses = async (req, res) => {
  try {
    const courses = await Course.find({ lecturer: req.user.id }).populate('students', 'name');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate invite code
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

// Enroll student via invite code
export const enrollWithInviteCode = async (req, res) => {
  const { code } = req.body;
  const studentId = req.user.id;

  try {
    const course = await Course.findOne({
      'inviteCodes.code': code,
      'inviteCodes.expiresAt': { $gt: Date.now() }
    });

    if (!course) return res.status(400).json({ error: 'Invalid or expired code' });

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



export const getCourseStudentsByLevel = async (req, res) => {
  const { courseId } = req.params;
  const { level } = req.query;

  try {
    const course = await Course.findById(courseId).populate({
      path: 'students',
      match: level ? { level } : {}
    });

    res.json(course.students.filter(Boolean));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Get all courses (admin only)

// @access  Private/Admin

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ department: 1, level: 1, code: 1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load courses' });
  }
};

// Only admin can access this route
export const createPredefinedCourse = async (req, res) => {
  const { name, code, department, level, semester } = req.body;

  if (!/^[A-Z]{3}\d{3}$/.test(code)) {
    return res.status(400).json({ error: 'Invalid course code format' });
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