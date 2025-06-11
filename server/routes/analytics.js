import express from 'express';
import { getStudentAnalytics, checkGraduationEligibility } from '../controllers/analyticsController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/student', protect, authorize('student'), getStudentAnalytics);
router.get('/graduation', protect, authorize('student'), checkGraduationEligibility);

export default router;