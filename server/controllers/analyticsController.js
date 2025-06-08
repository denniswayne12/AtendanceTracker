import Attendance from '../models/Attendance.js';
import Course from '../models/Course.js';

export const getStudentAnalytics = async (req, res) => {
  const studentId = req.user.id;
  
  try {
    const student = await Student.findById(studentId).populate('courses');
    const courseIds = student.courses.map(c => c._id);
    
    const analytics = {};
    
    for (const courseId of courseIds) {
      const course = await Course.findById(courseId);
      const attendances = await Attendance.find({
        course: courseId,
        records: { $elemMatch: { student: studentId } }
      }).populate('records.student');
      
      let totalDays = 0;
      let presentCount = 0;
      
      attendances.forEach(attendance => {
        totalDays++;
        const record = attendance.records.find(r => r.student.toString() === studentId);
        if (record?.status === 'Present') presentCount++;
      });
      
      analytics[course.name] = {
        totalDays,
        present: presentCount,
        absent: totalDays - presentCount,
        percentage: totalDays ? Math.round((presentCount / totalDays) * 100) : 0
      };
    }
    
    res.json(analytics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};