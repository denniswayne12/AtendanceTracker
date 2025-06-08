import express from 'express';
import { addStudent } from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('lecturer'), addStudent);

export default router;