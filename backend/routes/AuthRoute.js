import express from 'express';
import { registerUser, loginUser, getUserProfile , logoutUser  } from '../controllers/userController.js';
import authMiddleware from '../middlewares/Auth.js';

const router = express.Router();

// Auth routes
router.post('/register', registerUser);
router.post('/login', loginUser);


router.get('/profile', authMiddleware, getUserProfile);
router.post('/logout', logoutUser);

export default router;
