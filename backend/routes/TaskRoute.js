import express from 'express';
import checkRole from '../middlewares/role.js';
import { deleteTask,  getTaskById, updateTask } from '../controllers/taskController.js';
import {assignToIntern, verifyCompletion} from '../controllers/taskAssignmentController.js';
import { createUpdate, listUpdates } from '../controllers/taskUpdateController.js';


const router = express.Router();

router.route('/:id').get(getTaskById).put(checkRole("tl"),updateTask).delete(checkRole(['admin',"tl"]),deleteTask);

router.post('/:id/assign',checkRole("tl"),assignToIntern)
router.patch('/:id/assign/:assignment_id/verify',checkRole("tl"),verifyCompletion)
router.route('/:id/update').post(checkRole("intern"),createUpdate).get(listUpdates)



export default router;