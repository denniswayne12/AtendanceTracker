import express from 'express';
import { getStudentAnalytics } from '../controllers/analyticsController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/student/analytics', protect, authorize('student'), getStudentAnalytics);

export default router;