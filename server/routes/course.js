
import express from 'express';
import { createCourse, getLecturerCourses, generateInviteCode, enrollWithInviteCode } from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('lecturer'), createCourse)
  .get(protect, authorize('lecturer'), getLecturerCourses);

// Invite Code Routes
router.post('/generate-code', protect, authorize('lecturer'), generateInviteCode);
router.post('/enroll-code', protect, authorize('student'), enrollWithInviteCode);

export default router;