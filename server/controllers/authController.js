import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Student from '../models/Student.js';


export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user;
    // Simple check: if input contains '@', treat as email
    if (email.includes('@')) {
      user = await User.findOne({ email });
    } else {
         // Student login by roll number
      const student = await Student.findOne({ rollNumber: email }).populate('user');
      if (student) {
        user = await User.findById(student.user);
      }
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};







export const registerStudent = async (req, res) => {
  const { name, email, password } = req.body; // email will be used as roll number
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User with role 'student'
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'student'
    });

    // Optionally create Student document if needed
    const student = await Student.create({
      user: user._id,
      rollNumber: email // treat email as roll number
    });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};