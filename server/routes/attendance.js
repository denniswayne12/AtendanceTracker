import express from 'express';
import { markAttendance, getAttendanceByCourse } from '../controllers/attendanceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { markManualAttendance } from '../controllers/attendanceController.js';
const router = express.Router();

router.route('/')
  .post(protect, authorize('lecturer'), markAttendance);
  
router.post('/manual', protect, authorize('lecturer'), markManualAttendance);

router.get('/:courseId', protect, authorize('lecturer'), getAttendanceByCourse);
router.post('/manual', protect, authorize('lecturer'), markManualAttendance);
export default router;