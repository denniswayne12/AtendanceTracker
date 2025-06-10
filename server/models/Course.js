import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[A-Z]{3}\d{3}$/.test(v); // E.g., CEC200
      },
      message: props => `${props.value} is not valid. Use format: 3 uppercase letters + 3 digits (e.g., CEC200)`
    }
  },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  department: {
    type: String,
    enum: ['Computer Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering'],
    required: true
  },
  level: {
    type: String,
    enum: ['Level 200', 'Level 300', 'Level 400'],
    required: true
  },
  semester: {
    type: String,
    enum: ['First Semester', 'Second Semester'],
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  createdAt: Date,
  updatedAt: Date
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);