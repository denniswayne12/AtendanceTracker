
import express from 'express';
import { createCourse, getLecturerCourses, generateInviteCode, enrollWithInviteCode ,createPredefinedCourse, getAllCourses} from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('lecturer'), createCourse)
  .get(protect, authorize('lecturer'), getLecturerCourses);

// Admin-only routes

router.post('/predefined', protect, authorize('admin'), createPredefinedCourse);
// Get all courses (for admin list)
router.get('/all', protect, authorize('admin'), getAllCourses);
// Invite Code Routes
router.post('/generate-code', protect, authorize('lecturer'), generateInviteCode);
router.post('/enroll-code', protect, authorize('student'), enrollWithInviteCode);

export default router;