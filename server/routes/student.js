import express from 'express';
import { addStudent, enrollInCourses, getMyCourses } from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('lecturer'), addStudent);
router.post('/enroll', protect, authorize('student'), enrollInCourses);
router.get('/me/courses', protect, authorize('student'), getMyCourses);

// Mark course as failed (admin/lecturer)
/* router.post('/mark-failed', protect, authorize('admin', 'lecturer'), markCourseAsFailed); */
export default router;