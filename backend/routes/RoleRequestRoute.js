import express from 'express';
import { createRequest, listRequests, approveRequest } from '../controllers/roleRequestController.js';
import  checkRole from '../middlewares/role.js';

const router = express.Router();

// Create a new role request
router.post('/', checkRole(["pending","intern","tl","cos"]), createRequest);

// Get list of role requests (admin only)
router.get('/',checkRole("admin") , listRequests);

// Approve/reject a role request (admin only)
router.patch('/:request_id', checkRole("admin"), approveRequest);

export default router;