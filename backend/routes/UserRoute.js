import express from 'express';
import { getAllUsers, getUserProfile, updateUser  } from '../controllers/userController.js';
import authMiddleware from '../middlewares/Auth.js';

const router = express.Router();


router.get('/me', authMiddleware, getUserProfile);
router.put('/me', authMiddleware , updateUser);
router.get('/', getAllUsers);
export default router;