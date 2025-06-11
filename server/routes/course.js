import express from 'express';
import { 
  createCourse,
  getLecturerCourses,
  generateInviteCode,
  enrollWithInviteCode,
  createPredefinedCourse,
  assignCourseToLecturer,
  getPredefinedCourses,
   getCourseById,
  getCoursesByDeptAndLevel,
  getAllCourses /*, getCourseById*/ } from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorize('lecturer'), createCourse)
  .get(protect, authorize('lecturer'), getLecturerCourses); 
  router.get('/:courseId', protect, authorize('lecturer'), getCourseById);

router.post('/assign', protect, authorize('lecturer'), assignCourseToLecturer);

router.get('/predefined', protect, authorize('lecturer'), getPredefinedCourses);
// Admin-only routes

router.post('/predefined', protect, authorize('admin'), createPredefinedCourse);
router.get('/all', protect, authorize('admin'), getAllCourses);

router.get('/department-level', protect, authorize('student'), getCoursesByDeptAndLevel);
router.post('/enroll-code', protect, authorize('student'), enrollWithInviteCode);
router.post('/generate-code', protect, authorize('lecturer'), generateInviteCode);
router.get('/:courseId', protect, authorize('lecturer', 'student'), getCourseById);


/* router.get('/', protect, authorize('admin', 'lecturer', 'student'), getAllCourses); */
// Commented out until getCourseById is implemented
// router.get('/:courseId', protect, authorize('lecturer', 'student'), getCourseById);
// Invite Code Routes
// Admin & Student: Get all courses
/* router.get('/', protect, authorize('admin', 'student'), getAllCourses); */

// Get single course by ID (for student or lecturer)

/* // Create new course (lecturer)
router.post('/', protect, authorize('lecturer'), createCourse); */

export default router;