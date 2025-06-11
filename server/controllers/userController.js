import User from '../models/User.js';
import Student from '../models/Student.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const students = await Student.find().populate('user', 'name email role');

    const merged = users.map(user => {
      const student = students.find(s => s.user && s.user._id && s.user._id.equals(user._id));
      return {
        ...user.toObject(),
        rollNumber: student?.rollNumber,
        department: student?.department,
        level: student?.level
      };
    });

    res.json(merged);
  } catch (err) {
    console.error('Error in getAllUsers:', err); // Add logging for debugging
    res.status(500).json({ error: 'Failed to load users' });
  }
};


// GET /api/courses?department=Computer+Engineering&level=Level+200
export const getCoursesByDeptAndLevel = async (req, res) => {
  const { department, level } = req.query;

  try {
    const courses = await Course.find({
      department,
      level
    }).sort({ code: 1 });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load courses' });
  }
};