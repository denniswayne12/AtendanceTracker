import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  date: { type: Date, default: Date.now },
  records: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    status: {
       type: String, enum: ['Present', 'Absent'],
      default: 'Present'
     }
  }]
},{ timestamps: true });

export default mongoose.model('Attendance', attendanceSchema);