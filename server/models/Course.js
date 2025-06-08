import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: String,
  code: String,
  lecturer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  inviteCodes: [{ 
    code: String,
    expiresAt: Date,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
   }]
});

export default mongoose.model('Course', courseSchema);