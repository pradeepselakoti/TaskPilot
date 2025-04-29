import express from 'express';
import { getUserProfile, updateUser } from '../controllers/userController.js';

const router = express.Router();


router.get('/me', getUserProfile);
router.put('/me', updateUser);

export default router;