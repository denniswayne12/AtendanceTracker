import User from '../models/User.js';
import Student from '../models/Student.js';
import Course from '../models/Course.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const registerStudent = async (req, res) => {
  const { name, email, password, rollNumber,level, department, option } = req.body;

  try {
    // Create User
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'student'
    });

    // Create Student
    const student = await Student.create({
      user: user._id,
      rollNumber,
      level,
      department,
      option
    });

    // Generate JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Add student to course
export const addStudent = async (req, res) => {
  const { name, rollNumber, courseId } = req.body;

  try {
    const student = await Student.create({ name, rollNumber });

    // Add student to course
    if (courseId) {
      await Course.findByIdAndUpdate(courseId, {
        $push: { students: student._id }
      });
    }

    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};