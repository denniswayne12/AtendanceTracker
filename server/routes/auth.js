import express from 'express';
import { register, login,  registerStudent} from '../controllers/authController.js';
/* import { } from '../controllers/studentController.js';  */



const router = express.Router();

router.post('/register', register);
router.post('/register/student', registerStudent); 
router.post('/login', login);

export default router;