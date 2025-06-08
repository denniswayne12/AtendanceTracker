import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rollNumber: {
      type: String,
      required: [true, 'Roll number is required'],
      unique: true
     },
  courses: [{ 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Course'
     }],
  level: {
    type: String,
    enum: ['Level 200', 'Level 300', 'Level 400'],
    required: true
  },
  department: {
    type: String,
    required: true
  },
  option: {
    type: String
  }

}, { timestamps: true });

export default mongoose.model('Student', studentSchema);